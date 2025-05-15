import React, { createContext, useContext, useState, ReactNode } from 'react';
import regionsJson from '../data/regions.json';
import locationsJson from '../data/locations.json';

type Region = {
  id: string;
  name: string;
};

type Location = {
  id: string;
  name: string;
  region_id: string;
  price: number;
  free_from: number;
};

type DeliveryMode = 'delivery' | 'pickup';

type CityContextType = {
  regionId: string;
  locationId: string;
  address: string;
  location: Location | null;
  mode: DeliveryMode;
  setRegionId: (regionId: string) => void;
  setLocationId: (locationId: string) => void;
  setAddress: (address: string) => void;
  setMode: (mode: DeliveryMode) => void;
};

const regions: Region[] = regionsJson;
const locations: Location[] = locationsJson;

const CityContext = createContext<CityContextType | undefined>(undefined);

export const CityProvider = ({ children }: { children: ReactNode }) => {
  const [regionId, setRegionId] = useState<string>(regions[0]?.id ?? '');
  const [locationId, setLocationId] = useState<string>(locations[0]?.id ?? '');
  const [address, setAddress] = useState<string>('');
  const [mode, setMode] = useState<DeliveryMode>('delivery');

  const location = locations.find(loc => loc.id === locationId) || null;

  return (
    <CityContext.Provider
      value={{
        regionId,
        locationId,
        address,
        location,
        mode,
        setRegionId,
        setLocationId,
        setAddress,
        setMode,
      }}
    >
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
