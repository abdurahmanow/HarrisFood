import React, { createContext, useContext, useMemo, useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TopToast, { TopToastHandle, TopToastType } from '../components/ui/TopToast';

type ToastContextValue = {
  show: (message: string, type?: TopToastType) => void;
  hide: () => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const insets = useSafeAreaInsets();
  const toastRef = useRef<TopToastHandle>(null);

  const value = useMemo<ToastContextValue>(
    () => ({
      show: (msg, type = 'success') => toastRef.current?.show(msg, type),
      hide: () => toastRef.current?.hide(),
    }),
    []
  );

  return (
    <>
      <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
      {/* Тост висит поверх всего UI и переживает навигацию */}
      <TopToast ref={toastRef} topOffset={insets.top + 8} duration={2200} />
    </>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within <ToastProvider>');
  }
  return ctx;
};
