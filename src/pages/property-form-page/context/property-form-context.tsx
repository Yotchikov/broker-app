import { useCallback, useEffect, useMemo, useState, type FC, type ReactNode } from 'react';
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
  const stepsCount = 3;

  const [formData, setFormData] = useState<PropertyFormData>({
    // Property info
    property: {
      name: '',
      dealType: 'sale',
    },

    // Owner info
    owner: {
      name: '',
      contacts: {},
    },

    // Prospects info
    prospects: [],
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load existing data in edit mode
  useEffect(() => {
    if (!isEditMode) return;

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

  const updatePropertyInfo = useCallback((data: Partial<PropertyFormData['property']>) => {
    console.log('updatePropertyInfo', data);
    setFormData((prev) => ({ ...prev, property: { ...prev.property, ...data } }));
  }, []);

  const updateOwnerInfo = useCallback((data: Partial<PropertyFormData['owner']>) => {
    setFormData((prev) => ({ ...prev, owner: { ...prev.owner, ...data } }));
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

  const nextStep = useMemo(
    () => (currentStep === stepsCount - 1 ? null : () => setCurrentStep((prev) => Math.min(prev + 1, stepsCount - 1))),
    [currentStep],
  );

  const prevStep = useMemo(
    () => (currentStep === 0 ? null : () => setCurrentStep((prev) => Math.max(prev - 1, 0))),
    [currentStep],
  );

  const submitForm = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (formData.property.name.trim() === '') {
        throw new Error('Название объекта не может быть пустым');
      }

      if (formData.owner.name.trim() === '') {
        throw new Error('Имя собственника не может быть пустым');
      }

      if (formData.prospects.some((prospect) => prospect.name.trim() === '')) {
        throw new Error('Имя клиента не может быть пустым');
      }

      // Create owner first
      const owner: Owner = {
        id: crypto.randomUUID(),
        name: formData.owner.name.trim(),
        avatar: formData.owner.avatar,
        contacts: {
          phone: formData.owner.contacts.phone || undefined,
          email: formData.owner.contacts.email || undefined,
          telegram: formData.owner.contacts.telegram || undefined,
          whatsapp: formData.owner.contacts.whatsapp || undefined,
        },
      };

      // Create prospects
      const prospects: Prospect[] = formData.prospects.map((prospectData) => ({
        id: crypto.randomUUID(),
        name: prospectData.name.trim(),
        contacts: {
          phone: prospectData.contacts.phone || undefined,
          email: prospectData.contacts.email || undefined,
          telegram: prospectData.contacts.telegram || undefined,
          whatsapp: prospectData.contacts.whatsapp || undefined,
        },
        avatar: prospectData.avatar,
        status: prospectData.status,
      }));

      // Create property
      const property: Property = {
        id: isEditMode && params?.id ? params.id : crypto.randomUUID(),
        name: formData.property.name.trim(),
        dealType: formData.property.dealType,
        ownerId: owner.id,
        prospectIds: prospects.map((p) => p.id),
        price:
          formData.property.price && formData.property.price.amount > 0
            ? {
                amount: Number(formData.property.price?.amount) * 100,
                currency: 'RUB',
              }
            : undefined,
        floor:
          formData.property.floor && formData.property.floor.number > 0 && formData.property.floor.total > 0
            ? {
                number: Number(formData.property.floor?.number || 0),
                total: Number(formData.property.floor?.total || 0),
              }
            : undefined,
        area: formData.property.area && formData.property.area > 0 ? Number(formData.property.area) * 100 : undefined,
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
      isEditMode,
      updatePropertyInfo,
      updateOwnerInfo,
      addProspect,
      removeProspect,
      updateProspect,
      setCurrentStep,
      nextStep,
      prevStep,
      submitForm,
      setError,
    }),
    [
      formData,
      currentStep,
      isLoading,
      error,
      isEditMode,
      updatePropertyInfo,
      updateOwnerInfo,
      addProspect,
      removeProspect,
      updateProspect,
      nextStep,
      prevStep,
      submitForm,
      setError,
    ],
  );

  return <PropertyFormContext.Provider value={contextValue}>{children}</PropertyFormContext.Provider>;
};
