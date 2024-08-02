import React, { createContext, useContext, useState } from 'react';

const SaveChangesContext = createContext();

export const SaveChangesProvider = ({ children }) => {
  const [hasChanges, setHasChanges] = useState(false);

  const value = {
    hasChanges,
    setHasChanges,
  };

  return (
    <SaveChangesContext.Provider value={value}>
      {children}
    </SaveChangesContext.Provider>
  );
};

export const useSaveChangesContext = () => {
  return useContext(SaveChangesContext);
};
