import React, { createContext, useState, useMemo } from 'react';

export const BackgroundContext = createContext({
 backgroundImage: null,
 setBackgroundImage: () => {},
});

export const BackgroundProvider = ({ children }) => {
 const [backgroundImage, setBackgroundImage] = useState(null);

 const value = useMemo(
  () => ({ backgroundImage, setBackgroundImage }),
  [backgroundImage],
 );

 return (
  <BackgroundContext.Provider value={value}>
   {children}
  </BackgroundContext.Provider>
 );
};
