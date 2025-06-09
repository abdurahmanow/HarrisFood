import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SavedAddress = {
  id: string;
  regionId: string;
  regionName: string;
  cityId: string;
  cityName: string;
  address: string;
};

type SavedAddressesContextType = {
  addresses: SavedAddress[];
  addAddress: (address: SavedAddress) => void;
  removeAddress: (id: string) => void;
  selectAddress: (id: string) => void;
  selectedId: string | null;
  selectedAddress: SavedAddress | null;
};

const SavedAddressesContext = createContext<SavedAddressesContextType>({} as any);

export const SavedAddressesProvider = ({ children }: { children: React.ReactNode }) => {
  const [addresses, setAddresses] = useState<SavedAddress[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Асинхронная инициализация
  useEffect(() => {
    const init = async () => {
      try {
        const raw = await AsyncStorage.getItem('saved_addresses');
        const id = await AsyncStorage.getItem('selected_address_id');
        const data = raw ? JSON.parse(raw) : [];
        setAddresses(Array.isArray(data) ? data : []);
        if (id && data.find((a: SavedAddress) => a.id === id)) {
          setSelectedId(id);
        } else if (data.length > 0) {
          setSelectedId(data[0].id);
          await AsyncStorage.setItem('selected_address_id', data[0].id);
        } else {
          setSelectedId(null);
          await AsyncStorage.removeItem('selected_address_id');
        }
      } catch (err) {
        setAddresses([]);
        setSelectedId(null);
        await AsyncStorage.removeItem('selected_address_id');
      }
    };
    init();
  }, []);

  // Объект выбранного адреса
  const selectedAddress = addresses.find(a => a.id === selectedId) || null;

  const addAddress = async (address: SavedAddress) => {
    const updated = [...addresses, address];
    setAddresses(updated);
    setSelectedId(address.id);
    await AsyncStorage.setItem('saved_addresses', JSON.stringify(updated));
    await AsyncStorage.setItem('selected_address_id', address.id);
  };

  const removeAddress = async (id: string) => {
    const updated = addresses.filter(a => a.id !== id);
    setAddresses(updated);
    let nextId: string | null = selectedId;
    if (selectedId === id) {
      nextId = updated[0]?.id ?? null;
      setSelectedId(nextId);
      if (nextId) {
        await AsyncStorage.setItem('selected_address_id', nextId);
      } else {
        await AsyncStorage.removeItem('selected_address_id');
      }
    }
    await AsyncStorage.setItem('saved_addresses', JSON.stringify(updated));
  };

  const selectAddress = async (id: string) => {
    setSelectedId(id);
    await AsyncStorage.setItem('selected_address_id', id);
  };

  return (
    <SavedAddressesContext.Provider value={{
      addresses, addAddress, removeAddress, selectAddress, selectedId, selectedAddress,
    }}>
      {children}
    </SavedAddressesContext.Provider>
  );
};

export const useSavedAddresses = () => useContext(SavedAddressesContext);
