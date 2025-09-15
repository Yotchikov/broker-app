import type { Prospect } from 'data';

export type PropertyFormData = {
  // Property info
  name: string;
  dealType: 'sale' | 'rent';
  amount: number | '';
  floorNumber: number | '';
  floorTotal: number | '';
  area: number | '';

  // Owner info
  ownerName: string;
  ownerEmoji: string;
  ownerPhone: string;
  ownerEmail: string;
  ownerTelegram: string;
  ownerWhatsapp: string;

  // Prospects info
  prospects: Array<{
    name: string;
    phone: string;
    email: string;
    telegram: string;
    whatsapp: string;
    status: Prospect['status'];
    photo?: string;
  }>;
};

export type PropertyFormContextValue = {
  // State
  formData: PropertyFormData;
  currentStep: number;
  isLoading: boolean;
  error: string | null;

  // Actions
  updatePropertyInfo: (
    data: Partial<Pick<PropertyFormData, 'name' | 'dealType' | 'amount' | 'floorNumber' | 'floorTotal' | 'area'>>,
  ) => void;
  updateOwnerInfo: (
    data: Partial<
      Pick<
        PropertyFormData,
        'ownerName' | 'ownerEmoji' | 'ownerPhone' | 'ownerEmail' | 'ownerTelegram' | 'ownerWhatsapp'
      >
    >,
  ) => void;
  updateProspects: (prospects: PropertyFormData['prospects']) => void;
  addProspect: (prospect: PropertyFormData['prospects'][0]) => void;
  removeProspect: (index: number) => void;
  updateProspect: (index: number, prospect: Partial<PropertyFormData['prospects'][0]>) => void;

  // Navigation
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;

  // Form submission
  submitForm: () => Promise<void>;
  resetForm: () => void;
};

export const defaultFormData: PropertyFormData = {
  // Property info
  name: '',
  dealType: 'sale',
  amount: '',
  floorNumber: '',
  floorTotal: '',
  area: '',

  // Owner info
  ownerName: '',
  ownerEmoji: '👤',
  ownerPhone: '',
  ownerEmail: '',
  ownerTelegram: '',
  ownerWhatsapp: '',

  // Prospects info
  prospects: [],
};
