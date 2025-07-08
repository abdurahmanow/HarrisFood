import React, { createContext, useContext, useRef } from 'react';
import type { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

type BottomSheetRef = React.RefObject<BottomSheetMethods | null>;

const BottomSheetContext = createContext<{ ref: BottomSheetRef }>({
  ref: { current: null },
});

export const useLocationBottomSheet = () => useContext(BottomSheetContext);

export default function LocationBottomSheetProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<BottomSheetMethods | null>(null);

  return (
    <BottomSheetContext.Provider value={{ ref }}>
      {children}
    </BottomSheetContext.Provider>
  );
}
