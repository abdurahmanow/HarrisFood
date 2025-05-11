import React, { createContext, useContext, useState, ReactNode } from 'react';
import citiesJson from '../data/cities.json';

type City = {
  id: string;
  name: string;
};

const cities: City[] = citiesJson;

type CityContextType = {
  city: string;
  setCity: (city: string) => void;
};

const CityContext = createContext<CityContextType | undefined>(undefined);

export const CityProvider = ({ children }: { children: ReactNode }) => {
  // Дефолтный город (если нет сохранённого)
  const defaultCityId = cities[0]?.id ?? 'unknown';
  const [city, setCity] = useState<string>(defaultCityId);

  return (
    <CityContext.Provider value={{ city, setCity }}>
      {children}
    </CityContext.Provider>
  );
};

export const useCity = () => {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error('useCity must be used within a CityProvider');
  }
  return context;
};
