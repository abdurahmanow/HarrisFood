// src/context/LocationBottomSheetProvider.tsx
import React, { createContext, useRef, useContext } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import LocationBottomSheet from '../components/LocationModal/indexmodal';

type BottomSheetContextType = {
  openLocationBottomSheet: () => void;
};

const BottomSheetContext = createContext<BottomSheetContextType>({
  openLocationBottomSheet: () => {},
});

export const useLocationBottomSheet = () => useContext(BottomSheetContext);

export default function LocationBottomSheetProvider({ children }: { children: React.ReactNode }) {
  const ref = useRef<BottomSheet>(null);

  const openLocationBottomSheet = () => {
    ref.current?.expand();
  };

  return (
    <BottomSheetContext.Provider value={{ openLocationBottomSheet }}>
      {children}
      {/* Только один BottomSheet! */}
      <LocationBottomSheet ref={ref} />
    </BottomSheetContext.Provider>
  );
}
