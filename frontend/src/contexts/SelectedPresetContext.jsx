// SelectedPresetContext.jsx
import React, { createContext, useState, useContext } from 'react';

const SelectedPresetContext = createContext();

export const SelectedPresetProvider = ({ children }) => {
  const [selectedPreset, setSelectedPreset] = useState(null);
  return (
    <SelectedPresetContext.Provider value={{ selectedPreset, setSelectedPreset }}>
      {children}
    </SelectedPresetContext.Provider>
  );
};

export const useSelectedPreset = () => useContext(SelectedPresetContext);
