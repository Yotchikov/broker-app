import type { Owner, Property, Prospect } from 'data';

export type PropertyFormData = {
  property: Omit<Property, 'prospectIds' | 'ownerId'>;
  owner: Owner;
  prospects: Prospect[];
};

export type PropertyFormContextValue = {
  // State
  formData: PropertyFormData;
  currentStep: number;
  isLoading: boolean;
  error: string | null;
  isEditMode: boolean;

  // Actions
  updatePropertyInfo: (data: Partial<PropertyFormData['property']>) => void;
  updateOwnerInfo: (data: Partial<PropertyFormData['owner']>) => void;
  addProspect: (prospect: PropertyFormData['prospects'][0]) => void;
  removeProspect: (index: number) => void;
  updateProspect: (index: number, prospect: Partial<PropertyFormData['prospects'][0]>) => void;

  // Navigation
  setCurrentStep: (step: number) => void;
  nextStep: (() => void) | null;
  prevStep: (() => void) | null;

  // Form submission
  submitForm: () => Promise<void>;
  clearForm: () => void;
  setError: (error: string | null) => void;
};
