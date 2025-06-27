import React, { useState } from 'react';
import { SelectedComponentsContext } from './SelectedComponentsContext';

export const SelectedComponentsProvider = ({ children }) => {
  const [selectedComponents, setSelectedComponents] = useState([]);

  return (
    <SelectedComponentsContext.Provider value={{ selectedComponents, setSelectedComponents }}>
      {children}
    </SelectedComponentsContext.Provider>
  );
};