import React, {
  createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import regionsJson from '../data/regions.json';
import locationsJson from '../data/locations.json';
import pickupJson from '../data/pickup_locations.json';

type Region = { id: string; name: string };
type Location = { id: string; name: string; region_id: string; price: number; free_from: number };
type Pickup = { id: string; city: string; region: string; street: string };
type DeliveryMode = 'delivery' | 'pickup';

type CityContextType = {
  regionId: string;
  setRegionId: (regionId: string) => void;
  locationId: string;
  setLocationId: (locationId: string) => void;
  address: string;
  setAddress: (address: string) => void;
  pickupId: string;
  setPickupId: (pickupId: string) => void;
  mode: DeliveryMode;
  setMode: (mode: DeliveryMode) => void;
  region: Region | null;
  location: Location | null;
  pickup: Pickup | null;
  filteredLocations: Location[];
};

const regions: Region[] = regionsJson;
const locations: Location[] = locationsJson;
const pickups: Pickup[] = pickupJson;

const CityContext = createContext<CityContextType | undefined>(undefined);

export const CityProvider = ({ children }: { children: ReactNode }) => {
  const [regionId, setRegionIdRaw] = useState<string>('');
  const [locationId, setLocationIdRaw] = useState<string>('');
  const [pickupId, setPickupIdRaw] = useState<string>('');
  const [address, setAddressRaw] = useState<string>('');
  const [mode, setModeRaw] = useState<DeliveryMode>('delivery');

  // При запуске приложения или смене режима подхватываем всё из памяти
  useEffect(() => {
    (async () => {
      // mode
      const savedMode = await AsyncStorage.getItem('selected_mode');
      if (savedMode === 'delivery' || savedMode === 'pickup') {
        setModeRaw(savedMode as DeliveryMode);
      }
    })();
  }, []);

  // Если включён самовывоз, подхватываем/устанавливаем pickupId
useEffect(() => {
  if (mode === 'pickup') {
    (async () => {
      const savedPickupId = await AsyncStorage.getItem('selected_pickup_id');
      const valid = pickups.find(p => p.id === savedPickupId);
      if (savedPickupId && valid) {
        setPickupIdRaw(savedPickupId);
      } else if (pickups.length > 0) {
        setPickupIdRaw(pickups[0].id);
        await AsyncStorage.setItem('selected_pickup_id', pickups[0].id);
      }
    })();
  }
}, [mode]);

const setMode = useCallback(async (newMode: DeliveryMode) => {
  setModeRaw(newMode);
  await AsyncStorage.setItem('selected_mode', newMode);

  setRegionIdRaw('');
  setLocationIdRaw('');
  setAddressRaw('');
  setPickupIdRaw('');

  if (newMode === 'pickup' && pickups.length > 0) {
    setPickupIdRaw(pickups[0].id);
    await AsyncStorage.setItem('selected_pickup_id', pickups[0].id);
  }
}, []);

  const setPickupId = useCallback(async (id: string) => {
    setPickupIdRaw(id);
    await AsyncStorage.setItem('selected_pickup_id', id);
  }, []);

  const setRegionId = useCallback((newRegionId: string) => {
    setRegionIdRaw(newRegionId);
    setLocationIdRaw('');
    setAddressRaw('');
  }, []);

  const setLocationId = useCallback((newLocationId: string) => {
    setLocationIdRaw(newLocationId);
    setAddressRaw('');
  }, []);

  const filteredLocations = useMemo(() => {
    if (!regionId) {return [];}
    return locations.filter(loc => loc.region_id === regionId);
  }, [regionId]);

  const region = useMemo(() => regions.find(r => r.id === regionId) || null, [regionId]);
  const location = useMemo(() => locations.find(l => l.id === locationId) || null, [locationId]);
  const pickup = useMemo(() => pickups.find(p => p.id === pickupId) || null, [pickupId]);

  return (
    <CityContext.Provider
      value={{
        regionId,
        setRegionId,
        locationId,
        setLocationId,
        address,
        setAddress: setAddressRaw,
        pickupId,
        setPickupId,
        mode,
        setMode,
        region,
        location,
        pickup,
        filteredLocations,
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
