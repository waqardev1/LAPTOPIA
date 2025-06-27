import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// Initialize GoogleGenerativeAI with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AIzaSyD1iMLnm9nSeu_hFXO1cVmLChvdbCX_HFw');

router.post('/analyze', async (req, res) => {
  console.log('🔍 Gemini analyze route hit');
  console.log('Request body:', req.body);
  
  try {
    const { userQuery } = req.body;
    
    if (!userQuery || userQuery.trim() === '') {
      console.log('❌ Empty user query');
      return res.status(400).json({ error: 'User query is required' });
    }

    console.log('📝 User query:', userQuery);

    // Test if genAI is properly initialized
    console.log('🤖 GenAI instance:', !!genAI);
    
    const prompt = `
You are a smart laptop recommendation assistant. When a user gives you a query, extract these structured features in a JSON object. And also try to fill the values as much can to fill data based on your search maturity and need:
- purpose: (string, e.g. 'gaming', 'office', etc.)
- budgetMin: (number, USD, or null)
- budgetMax: (number, USD, or null)
- brandPreference: (string or null)
- portability: (string or null)
- performanceLevel: (string or null)
- extraNeeds: (string or null)
Respond ONLY with a JSON object.
USER QUERY: "${userQuery}"
`;

    console.log('🚀 Calling Gemini API...');
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    console.log('✅ Gemini API response received');
    
    const responseText = await result.response.text();
    console.log('📄 Raw response:', responseText);
    
    // Try parsing as JSON
    let structured;
    try {
      structured = JSON.parse(responseText);
      console.log('✅ Successfully parsed JSON:', structured);
    } catch (parseError) {
      console.log('⚠️ First JSON parse failed, trying to clean response...');
      // Sometimes Gemini returns code block markdown
      const cleanedText = responseText.replace(/```json|```/g, '').trim();
      console.log('🧹 Cleaned text:', cleanedText);
      
      try {
        structured = JSON.parse(cleanedText);
        console.log('✅ Successfully parsed cleaned JSON:', structured);
      } catch (secondParseError) {
        console.error('❌ Failed to parse Gemini response:', responseText);
        console.error('Parse errors:', parseError.message, secondParseError.message);
        return res.status(500).json({ 
          error: 'Failed to parse AI response',
          rawResponse: responseText,
          parseErrors: [parseError.message, secondParseError.message]
        });
      }
    }

    console.log('🎉 Sending successful response');
    res.json(structured);
  } catch (err) {
    console.error('💥 Gemini API error:', err);
    console.error('Error stack:', err.stack);
    res.status(500).json({ 
      error: err.message || 'Gemini API error',
      type: err.constructor.name,
      details: err.stack
    });
  }
});

export default router;