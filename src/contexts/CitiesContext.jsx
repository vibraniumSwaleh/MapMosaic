import { createContext, useContext, useEffect, useState } from 'react';

const URL = 'http://localhost:9000/';
const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${URL}cities`);
        const data = await res.json();

        setCities(data);
      } catch (error) {
        alert('There was an error loading data');
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${URL}cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (error) {
      alert('There was an error loading data');
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${URL}cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      console.log('createCity: ', data);
      setCities((cities) => [...cities, data]);
    } catch (error) {
      alert('There was an error loading data');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        getCity,
        currentCity,
        createCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (!context)
    throw new Error('CitiesContext must be used within a CitiesProvider');
  return context;
}

export { CitiesProvider, useCities };
