import { useEffect, useState } from 'react';
import { Keyboard, Platform } from 'react-native';

export function useKeyboard() {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const show = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hide = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showListener = Keyboard.addListener(show, (e: any) => {
      setKeyboardVisible(true);
      setKeyboardHeight(e.endCoordinates ? e.endCoordinates.height : 0);
    });
    const hideListener = Keyboard.addListener(hide, () => {
      setKeyboardVisible(false);
      setKeyboardHeight(0);
    });

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  return { keyboardHeight, isKeyboardVisible };
}
