import { createContext, useContext } from 'react';
import type { PropertyFormContextValue } from './types';

export const PropertyFormContext = createContext<PropertyFormContextValue | null>(null);

export const usePropertyForm = (): PropertyFormContextValue => {
  const context = useContext(PropertyFormContext);
  if (!context) {
    throw new Error('usePropertyForm must be used within a PropertyFormProvider');
  }

  return context;
};
