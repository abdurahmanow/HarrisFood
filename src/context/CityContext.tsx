import React, {
  createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import regionsJson from '../data/regions.json';
import locationsJson from '../data/locations.json';
import placesJson from '../data/places.json';

type DeliveryMode = 'delivery' | 'pickup';

type Region = {
  id: string;
  name: string;
  categoriesOrder?: string[];
  showOnHome?: string[];
};
type Location = { id: string; name: string; region_id: string; price: number; free_from: number };
type Place = {
  id: string;
  name: string;
  region: string;
  city: string;
  street: string;
  phone: string;
  work_time: string;
  categoriesOrder?: string[];
  showOnHome?: string[];
};

type CityContextType = {
  regionId: string;
  setRegionId: (regionId: string) => void;
  locationId: string;
  setLocationId: (locationId: string) => void;
  address: string;
  setAddress: (address: string) => void;
  placeId: string;
  setPlaceId: (placeId: string) => void;
  mode: DeliveryMode;
  setMode: (mode: DeliveryMode) => void;

  region: Region | null;
  location: Location | null;
  place: Place | null;
  filteredLocations: Location[];

  categoriesOrder: string[] | undefined;
  showOnHome: string[] | undefined;
};

const regions: Region[] = regionsJson;
const locations: Location[] = locationsJson;
const places: Place[] = placesJson;

const CityContext = createContext<CityContextType | undefined>(undefined);

export const CityProvider = ({ children }: { children: ReactNode }) => {
  const [regionId, setRegionIdRaw] = useState('');
  const [locationId, setLocationIdRaw] = useState('');
  const [placeId, setPlaceIdRaw] = useState('');
  const [address, setAddressRaw] = useState('');
  const [mode, setModeRaw] = useState<DeliveryMode>('delivery');

  useEffect(() => {
    (async () => {
      const savedMode = await AsyncStorage.getItem('selected_mode');
      if (savedMode === 'delivery' || savedMode === 'pickup') {
        setModeRaw(savedMode);
      }
      if (savedMode === 'pickup') {
        const savedPlaceId = await AsyncStorage.getItem('selected_place_id');
        if (savedPlaceId && places.some(p => p.id === savedPlaceId)) {
          setPlaceIdRaw(savedPlaceId);
        } else if (places.length > 0) {
          setPlaceIdRaw(places[0].id);
        }
      }
      if (savedMode === 'delivery') {
        const savedRegionId = await AsyncStorage.getItem('selected_region_id');
        if (savedRegionId && regions.some(r => r.id === savedRegionId)) {
          setRegionIdRaw(savedRegionId);
        }
        const savedLocationId = await AsyncStorage.getItem('selected_location_id');
        if (savedLocationId && locations.some(l => l.id === savedLocationId)) {
          setLocationIdRaw(savedLocationId);
        }
        const savedAddress = await AsyncStorage.getItem('selected_address');
        if (savedAddress) {setAddressRaw(savedAddress);}
      }
    })();
  }, []);

  const setMode = useCallback(async (newMode: DeliveryMode) => {
    setModeRaw(newMode);
    await AsyncStorage.setItem('selected_mode', newMode);

    if (newMode === 'pickup') {
      setRegionIdRaw('');
      setLocationIdRaw('');
      setAddressRaw('');
      if (places.length > 0) {
        setPlaceIdRaw(places[0].id);
        await AsyncStorage.setItem('selected_place_id', places[0].id);
      }
    } else {
      setPlaceIdRaw('');
    }
  }, []);

  const setRegionId = useCallback(async (id: string) => {
    setRegionIdRaw(id);
    setLocationIdRaw('');
    setAddressRaw('');
    await AsyncStorage.setItem('selected_region_id', id);
    await AsyncStorage.removeItem('selected_location_id');
    await AsyncStorage.removeItem('selected_address');
  }, []);

  const setLocationId = useCallback(async (id: string) => {
    setLocationIdRaw(id);
    setAddressRaw('');
    await AsyncStorage.setItem('selected_location_id', id);
    await AsyncStorage.removeItem('selected_address');
  }, []);

  const setAddress = useCallback(async (val: string) => {
    setAddressRaw(val);
    await AsyncStorage.setItem('selected_address', val);
  }, []);

  const setPlaceId = useCallback(async (id: string) => {
    setPlaceIdRaw(id);
    await AsyncStorage.setItem('selected_place_id', id);
  }, []);

  const filteredLocations = useMemo(
    () => (regionId ? locations.filter(loc => loc.region_id === regionId) : []),
    [regionId]
  );

  const region = useMemo(() => regions.find(r => r.id === regionId) || null, [regionId]);
  const location = useMemo(() => locations.find(l => l.id === locationId) || null, [locationId]);
  const place = useMemo(() => places.find(p => p.id === placeId) || null, [placeId]);

  const categoriesOrder = useMemo(() => {
    if (mode === 'pickup' && place) {return place.categoriesOrder;}
    if (mode === 'delivery' && region) {return region.categoriesOrder;}
    return undefined;
  }, [mode, place, region]);

  const showOnHome = useMemo(() => {
    if (mode === 'pickup' && place) {return place.showOnHome;}
    if (mode === 'delivery' && region) {return region.showOnHome;}
    return undefined;
  }, [mode, place, region]);

  return (
    <CityContext.Provider
      value={{
        regionId,
        setRegionId,
        locationId,
        setLocationId,
        address,
        setAddress,
        placeId,
        setPlaceId,
        mode,
        setMode,
        region,
        location,
        place,
        filteredLocations,
        categoriesOrder,
        showOnHome,
      }}
    >
      {children}
    </CityContext.Provider>
  );
};

export const useCity = () => {
  const ctx = useContext(CityContext);
  if (!ctx) {throw new Error('useCity must be used within a CityProvider');}
  return ctx;
};
