import { circle } from 'leaflet';
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';

const URL = 'http://localhost:9000/';
const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
};
function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };
    case 'cities/loaded':
      return { ...state, cities: action.payload, isLoading: false };
    case 'city/loaded':
      return { ...state, currentCity: action.payload, isLoading: false };
    case 'city/created':
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
      };
    case 'cities/deleted':
      return { ...state, cities: [...state.payload], isLoading: false };
    case 'rejected':
      return { ...state, error: action.payload };

    default:
      break;
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  useEffect(function () {
    async function fetchCities() {
      try {
        dispatch({ type: 'loading' });

        const res = await fetch(`${URL}cities`);
        const data = await res.json();

        dispatch({ type: 'cities/loaded', payload: data });
      } catch (error) {
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading cities...',
        });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      dispatch({ type: 'loading' });
      const res = await fetch(`${URL}cities/${id}`);
      const data = await res.json();
      dispatch({ type: 'city/loaded', payload: data });
    } catch (error) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error loading city...',
      });
    }
  }

  async function createCity(newCity) {
    try {
      dispatch({ type: 'loading' });
      const res = await fetch(`${URL}cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      dispatch({ type: 'city/created', payload: data });
    } catch (error) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error creating city...',
      });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: 'loading' });
      await fetch(`${URL}cities/${id}`, {
        method: 'DELETE',
      });

      const cities = (cities) => cities.filter((city) => city.id !== id);
      dispatch({ type: 'city/deleted', payload: cities });
    } catch (error) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error deleting city',
      });
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
        deleteCity,
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
