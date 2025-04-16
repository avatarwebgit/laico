// src/context/ApiContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create context
const ApiContext = createContext();

// Provider component
const ApiProvider = ({ children }) => {
 const [menu, setMenu] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

 // Fetch data from API
 useEffect(() => {
  const fetchMenu = async () => {
   try {
    const response = await fetch('/api/menu');
    const data = await response.json();
    setMenu(data);
   } catch (err) {
    setError('Error fetching menu');
   } finally {
    setLoading(false);
   }
  };

  fetchMenu();
 }, []);

 return (
  <ApiContext.Provider value={{ menu, loading, error }}>
   {children}
  </ApiContext.Provider>
 );
};

export { ApiProvider, ApiContext };
