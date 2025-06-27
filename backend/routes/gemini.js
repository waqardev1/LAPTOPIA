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
You are a smart laptop recommendation assistant  with deep knowledge of user psychology and computing needs. When a user gives you a query, extract these structured features in a JSON object. And also try to fill the values as much can to fill data based on your search maturity and need:
- purpose: (string, e.g. 'gaming', 'office', etc.)
- budgetMin: (number, USD, or null)
- budgetMax: (number, USD, or null)
- brandPreference: (string or null)
- portability: (string or null)
- performanceLevel: (string or null)
- extraNeeds: (string or null)
Respond ONLY with a JSON object.

ANALYSIS RULES:
1. Always provide intelligent estimates for missing fields - never leave them null/empty
2. Use context clues from language, tone, and implied needs
3. Consider typical user profiles and budget ranges
4. Make reasonable assumptions based on stated purpose

Extract and intelligently complete this JSON structure:

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



// import express from 'express';
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import dotenv from 'dotenv';
// dotenv.config();

// const router = express.Router();

// // Initialize GoogleGenerativeAI with your API key
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AIzaSyD1iMLnm9nSeu_hFXO1cVmLChvdbCX_HFw');

// router.post('/analyze', async (req, res) => {
//   console.log('🔍 Gemini analyze route hit');
//   console.log('Request body:', req.body);
  
//   try {
//     const { userQuery } = req.body;
    
//     if (!userQuery || userQuery.trim() === '') {
//       console.log('❌ Empty user query');
//       return res.status(400).json({ error: 'User query is required' });
//     }

//     console.log('📝 User query:', userQuery);

//     // Test if genAI is properly initialized
//     console.log('🤖 GenAI instance:', !!genAI);
    
//     const prompt = `
// You are an expert laptop recommendation assistant with deep knowledge of user psychology and computing needs. Analyze the user's query and intelligently infer ALL missing information based on context clues, user behavior patterns, and typical needs.

// ANALYSIS RULES:
// 1. Always provide intelligent estimates for missing fields - never leave them null/empty
// 2. Use context clues from language, tone, and implied needs
// 3. Consider typical user profiles and budget ranges
// 4. Make reasonable assumptions based on stated purpose

// Extract and intelligently complete this JSON structure:

// {
//   "purpose": "primary use case (gaming, office, creative, student, programming, etc.)",
//   "budgetMin": 50000,
//   "budgetMax": 1500000,
//   "brandPreference": "inferred brand preference (Apple, Dell, HP, Lenovo, ASUS, etc. or flexible)",
//   "portability": "portability need (ultraportable, portable, desktop-replacement, or flexible)",
//   "performanceLevel": "performance requirement (basic, mid-range, high-performance, premium)",
//   "extraNeeds": "additional inferred requirements (long battery, good display, gaming graphics, etc.)"
// }

// CRITICAL REQUIREMENTS:
// 1. Return ONLY valid JSON - no markdown, no explanation, no code blocks
// 2. budgetMin and budgetMax must be numbers (not strings)
// 3. All fields must be filled with intelligent estimates
// 4. Budget amounts should be realistic for Pakistani market

// USER QUERY: "${userQuery}"
// `;

//     console.log('🚀 Calling Gemini API...');
//     const model = genAI.getGenerativeModel({ 
//       model: "gemini-1.5-flash",
//       generationConfig: {
//         temperature: 0.3, // Lower temperature for more consistent JSON output
//         topP: 0.8,
//         topK: 40,
//       }
//     });
    
//     const result = await model.generateContent(prompt);
//     console.log('✅ Gemini API response received');
    
//     const responseText = await result.response.text();
//     console.log('📄 Raw response:', responseText);
    
//     // Enhanced JSON parsing with multiple fallback strategies
//     let structured;
//     try {
//       structured = JSON.parse(responseText);
//       console.log('✅ Successfully parsed JSON:', structured);
//     } catch (parseError) {
//       console.log('⚠️ First JSON parse failed, trying cleanup strategies...');
      
//       // Strategy 1: Remove markdown code blocks
//       let cleanedText = responseText.replace(/```json|```/g, '').trim();
      
//       // Strategy 2: Extract JSON from text (look for first { to last })
//       const jsonStart = cleanedText.indexOf('{');
//       const jsonEnd = cleanedText.lastIndexOf('}');
      
//       if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
//         cleanedText = cleanedText.substring(jsonStart, jsonEnd + 1);
//       }
      
//       console.log('🧹 Cleaned text:', cleanedText);
      
//       try {
//         structured = JSON.parse(cleanedText);
//         console.log('✅ Successfully parsed cleaned JSON:', structured);
//       } catch (secondParseError) {
//         console.error('❌ All JSON parsing strategies failed');
//         console.error('Original response:', responseText);
        
//         // Fallback: Create a structured response based on query analysis
//         structured = createFallbackResponse(userQuery);
//         console.log('🔄 Using fallback structured response:', structured);
//       }
//     }

//     // Validate and ensure all fields are properly filled
//     structured = validateAndComplete(structured, userQuery);

//     console.log('🎉 Sending successful response:', structured);
//     res.json(structured);
//   } catch (err) {
//     console.error('💥 Gemini API error:', err);
//     console.error('Error stack:', err.stack);
//     res.status(500).json({ 
//       error: err.message || 'Gemini API error',
//       type: err.constructor.name,
//       details: err.stack
//     });
//   }
// });

// // Helper function to create fallback response when JSON parsing fails
// function createFallbackResponse(userQuery) {
//   const query = userQuery.toLowerCase();
  
//   let purpose = 'general';
//   let budgetMin = 60000;
//   let budgetMax = 150000;
//   let performanceLevel = 'mid-range';
//   let extraNeeds = 'reliable performance';
  
//   // Analyze query for purpose
//   if (query.includes('gaming') || query.includes('game')) {
//     purpose = 'gaming';
//     budgetMin = 100000;
//     budgetMax = 400000;
//     performanceLevel = 'high-performance';
//     extraNeeds = 'dedicated graphics, good cooling';
//   } else if (query.includes('office') || query.includes('work') || query.includes('business')) {
//     purpose = 'office';
//     budgetMin = 50000;
//     budgetMax = 120000;
//     extraNeeds = 'long battery life, good keyboard';
//   } else if (query.includes('student') || query.includes('school') || query.includes('college')) {
//     purpose = 'student';
//     budgetMin = 40000;
//     budgetMax = 80000;
//     performanceLevel = 'basic';
//     extraNeeds = 'lightweight, affordable';
//   } else if (query.includes('programming') || query.includes('coding') || query.includes('development')) {
//     purpose = 'programming';
//     budgetMin = 60000;
//     budgetMax = 180000;
//     extraNeeds = 'good keyboard, multiple monitors support';
//   }
  
//   // Budget adjustments
//   if (query.includes('cheap') || query.includes('budget') || query.includes('affordable') || query.includes('sasta')) {
//     budgetMax = Math.min(budgetMax * 0.7, 80000);
//     budgetMin = Math.min(budgetMin * 0.8, 40000);
//   }
  
//   if (query.includes('premium') || query.includes('expensive') || query.includes('high-end') || query.includes('mahnga')) {
//     budgetMin = Math.max(budgetMin * 1.5, 150000);
//     budgetMax = Math.max(budgetMax * 1.8, 400000);
//   }
  
//   return {
//     purpose,
//     budgetMin: Math.round(budgetMin),
//     budgetMax: Math.round(budgetMax),
//     brandPreference: 'flexible',
//     portability: 'portable',
//     performanceLevel,
//     extraNeeds
//   };
// }

// // Helper function to validate and complete the response
// function validateAndComplete(structured, userQuery) {
//   // Ensure all required fields exist
//   const defaults = {
//     purpose: 'general',
//     budgetMin: 60000,
//     budgetMax: 150000,
//     brandPreference: 'flexible',
//     portability: 'portable',
//     performanceLevel: 'mid-range',
//     extraNeeds: 'reliable performance'
//   };
  
//   // Fill missing fields
//   Object.keys(defaults).forEach(key => {
//     if (!structured[key] || structured[key] === null || structured[key] === '' || structured[key] === 'null') {
//       structured[key] = defaults[key];
//     }
//   });
  
//   // Ensure budget values are numbers
//   if (typeof structured.budgetMin === 'string') {
//     structured.budgetMin = parseInt(structured.budgetMin.replace(/[^\d]/g, '')) || defaults.budgetMin;
//   }
//   if (typeof structured.budgetMax === 'string') {
//     structured.budgetMax = parseInt(structured.budgetMax.replace(/[^\d]/g, '')) || defaults.budgetMax;
//   }
  
//   // Ensure budgetMin < budgetMax
//   if (structured.budgetMin >= structured.budgetMax) {
//     structured.budgetMax = structured.budgetMin + 50000;
//   }
  
//   return structured;
// }

// export default router;