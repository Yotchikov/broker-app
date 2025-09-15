import React, { useCallback, useMemo, useState, type FC, type ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router';
import type { Property, Owner, Prospect } from 'data';
import { propertyDataProvider, ownerDataProvider, prospectDataProvider } from 'data';
import type { PropertyFormData, PropertyFormContextValue } from './types';
import { PropertyFormContext } from './hooks';

type PropertyFormProviderProps = {
  children: ReactNode;
};

export const PropertyFormProvider: FC<PropertyFormProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const params = useParams();
  const isEditMode = Boolean(params?.id);

  const [formData, setFormData] = useState<PropertyFormData>({
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
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load existing data in edit mode
  React.useEffect(() => {
    if (!isEditMode || !params?.id) return;

    const loadExistingData = async () => {
      try {
        setIsLoading(true);
        const property = await propertyDataProvider.getPropertyById(params.id as string);

        setFormData((prev) => ({
          ...prev,
          name: property.name ?? '',
          dealType: property.dealType,
          amount: property.price?.amount ? property.price.amount / 100 : '',
          floorNumber: property.floor?.number ?? '',
          floorTotal: property.floor?.total ?? '',
          area: property.area ?? '',
        }));
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Не удалось загрузить объект');
      } finally {
        setIsLoading(false);
      }
    };

    loadExistingData();
  }, [isEditMode, params?.id]);

  const updatePropertyInfo = useCallback(
    (data: Partial<Pick<PropertyFormData, 'name' | 'dealType' | 'amount' | 'floorNumber' | 'floorTotal' | 'area'>>) => {
      setFormData((prev) => ({ ...prev, ...data }));
    },
    [],
  );

  const updateOwnerInfo = useCallback(
    (
      data: Partial<
        Pick<
          PropertyFormData,
          'ownerName' | 'ownerEmoji' | 'ownerPhone' | 'ownerEmail' | 'ownerTelegram' | 'ownerWhatsapp'
        >
      >,
    ) => {
      setFormData((prev) => ({ ...prev, ...data }));
    },
    [],
  );

  const updateProspects = useCallback((prospects: PropertyFormData['prospects']) => {
    setFormData((prev) => ({ ...prev, prospects }));
  }, []);

  const addProspect = useCallback((prospect: PropertyFormData['prospects'][0]) => {
    setFormData((prev) => ({
      ...prev,
      prospects: [...prev.prospects, { ...prospect, id: crypto.randomUUID() }],
    }));
  }, []);

  const removeProspect = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      prospects: prev.prospects.filter((_, i) => i !== index),
    }));
  }, []);

  const updateProspect = useCallback((index: number, prospect: Partial<PropertyFormData['prospects'][0]>) => {
    setFormData((prev) => ({
      ...prev,
      prospects: prev.prospects.map((p, i) => (i === index ? { ...p, ...prospect } : p)),
    }));
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, 2));
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      name: '',
      dealType: 'sale',
      amount: '',
      floorNumber: '',
      floorTotal: '',
      area: '',
      ownerName: '',
      ownerEmoji: '👤',
      ownerPhone: '',
      ownerEmail: '',
      ownerTelegram: '',
      ownerWhatsapp: '',
      prospects: [],
    });
    setCurrentStep(0);
    setError(null);
  }, []);

  const submitForm = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Create owner first
      const owner: Owner = {
        id: crypto.randomUUID(),
        name: formData.ownerName.trim(),
        emoji: formData.ownerEmoji,
        contacts: {
          phone: formData.ownerPhone || undefined,
          email: formData.ownerEmail || undefined,
          telegram: formData.ownerTelegram || undefined,
          whatsapp: formData.ownerWhatsapp || undefined,
        },
      };

      // Create prospects
      const prospects: Prospect[] = formData.prospects.map((prospectData) => ({
        id: crypto.randomUUID(),
        name: prospectData.name.trim(),
        contacts: {
          phone: prospectData.phone || undefined,
          email: prospectData.email || undefined,
          telegram: prospectData.telegram || undefined,
          whatsapp: prospectData.whatsapp || undefined,
        },
        photo: prospectData.photo,
        status: prospectData.status,
      }));

      // Create property
      const property: Property = {
        id: isEditMode && params?.id ? params.id : crypto.randomUUID(),
        name: formData.name.trim(),
        dealType: formData.dealType,
        ownerId: owner.id,
        prospectIds: prospects.map((p) => p.id),
        price:
          formData.amount === ''
            ? undefined
            : {
                amount: Number(formData.amount) * 100,
                currency: 'RUB',
              },
        floor:
          formData.floorNumber === '' && formData.floorTotal === ''
            ? undefined
            : {
                number: Number(formData.floorNumber || 0),
                total: Number(formData.floorTotal || 0),
              },
        area: formData.area === '' ? undefined : Number(formData.area),
      };

      // Create owner first
      await ownerDataProvider.createOwner(owner);

      // Create prospects
      for (const prospect of prospects) {
        await prospectDataProvider.createProspect(prospect);
      }

      // Create property with references to owner and prospects
      await propertyDataProvider.createProperty(property);

      navigate('/');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Не удалось сохранить объект');
    } finally {
      setIsLoading(false);
    }
  }, [formData, isEditMode, params?.id, navigate]);

  const contextValue: PropertyFormContextValue = useMemo(
    () => ({
      formData,
      currentStep,
      isLoading,
      error,
      updatePropertyInfo,
      updateOwnerInfo,
      updateProspects,
      addProspect,
      removeProspect,
      updateProspect,
      setCurrentStep,
      nextStep,
      prevStep,
      submitForm,
      resetForm,
    }),
    [
      formData,
      currentStep,
      isLoading,
      error,
      updatePropertyInfo,
      updateOwnerInfo,
      updateProspects,
      addProspect,
      removeProspect,
      updateProspect,
      nextStep,
      prevStep,
      submitForm,
      resetForm,
    ],
  );

  return <PropertyFormContext.Provider value={contextValue}>{children}</PropertyFormContext.Provider>;
};
