import React, { createContext, useContext, useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';

// ✅ Объявляем правильный тип (допускаем null)
type BottomSheetRef = React.RefObject<BottomSheet | null>;

const BottomSheetContext = createContext<{ ref: BottomSheetRef }>({
  ref: { current: null },
});

export const useLocationBottomSheet = () => useContext(BottomSheetContext);

export default function LocationBottomSheetProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<BottomSheet | null>(null);

  return (
    <BottomSheetContext.Provider value={{ ref }}>
      {children}
    </BottomSheetContext.Provider>
  );
}
