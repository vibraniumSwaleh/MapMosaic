import { createContext, useContext, useEffect, useState } from 'react';

const URL = 'http://localhost:9000/';
const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${URL}cities`);
        const data = await res.json();

        setCities(data);
        console.log(data);
      } catch (error) {
        alert('There was an error loading data');
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  return <CitiesContext.Provider value={{}}>{children}</CitiesContext.Provider>;
}

function useContextCities() {
  const context = useContext(CitiesContext);
  if (!context)
    throw new Error('useContextCities must be used within a CitiesProvider');
  return context;
}

export { useContextCities, CitiesProvider };
