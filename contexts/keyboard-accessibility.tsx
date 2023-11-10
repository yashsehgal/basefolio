import React, { createContext, useContext, useCallback } from 'react';

interface KeyboardAccessibilityContextType {
  handleKeyDown: (event: KeyboardEvent) => void;
}

const KeyboardAccessibilityContext = createContext<KeyboardAccessibilityContextType | undefined>(undefined);

export function useKeyboardAccessibility(): KeyboardAccessibilityContextType {
  const context = useContext(KeyboardAccessibilityContext);
  if (!context) {
    throw new Error('useKeyboardAccessibility must be used within a KeyboardAccessibilityProvider');
  }
  return context;
}

interface KeyboardAccessibilityProviderProps {
  children: React.ReactNode;
}

function KeyboardAccessibilityProvider({ children }: KeyboardAccessibilityProviderProps): JSX.Element {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const SHIFT_KEY = event.shiftKey;
    if ((event.ctrlKey) && SHIFT_KEY && event.key === 'P') {
      // goto /profile page
      window.location.href = '/profile';
    }
  }, []);

  return (
    <KeyboardAccessibilityContext.Provider value={{ handleKeyDown }}>
      {children}
    </KeyboardAccessibilityContext.Provider>
  );
}

export {
  KeyboardAccessibilityProvider
}