import { useCallback, useEffect, useMemo, useState, type FC, type ReactNode } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import type { Property, Owner, Prospect } from 'data';
import { propertyDataProvider, ownerDataProvider, prospectDataProvider } from 'data';
import type { PropertyFormData, PropertyFormContextValue } from './types';
import { PropertyFormContext } from './hooks';

type PropertyFormProviderProps = {
  children: ReactNode;
  propertyId?: string;
};

export const PropertyFormProvider: FC<PropertyFormProviderProps> = (props) => {
  const { children, propertyId } = props;

  const navigate = useNavigate();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const isEditMode = Boolean(propertyId || params?.id);
  const stepsCount = 3;

  // Map tab query parameter to step number
  const getStepFromTab = (tab: string | null): number => {
    switch (tab) {
      case 'property':
        return 0;
      case 'owner':
        return 1;
      case 'prospects':
        return 2;
      default:
        return 0;
    }
  };

  // Get initial step from URL query parameter
  const initialStep = getStepFromTab(searchParams.get('tab'));

  const [formData, setFormData] = useState<PropertyFormData>({
    // Property info
    property: {
      id: crypto.randomUUID(),
      name: '',
      dealType: 'sale',
    },

    // Owner info
    owner: {
      id: crypto.randomUUID(),
      name: '',
      contacts: {},
    },

    // Prospects info
    prospects: [],
  });

  const [currentStep, setCurrentStep] = useState(initialStep);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync step with URL query parameter
  useEffect(() => {
    const tab = searchParams.get('tab');
    const stepFromUrl = getStepFromTab(tab);
    if (stepFromUrl !== currentStep) {
      setCurrentStep(stepFromUrl);
    }
  }, [searchParams, currentStep]);

  // Update URL when step changes
  const updateStep = useCallback(
    (step: number) => {
      const tabMap = ['property', 'owner', 'prospects'];
      const newTab = tabMap[step];
      setSearchParams({ tab: newTab });
      setCurrentStep(step);
    },
    [setSearchParams],
  );

  // Load existing data in edit mode
  useEffect(() => {
    if (!isEditMode) return;

    const loadExistingData = async () => {
      try {
        setIsLoading(true);
        const property = await propertyDataProvider.getPropertyById(propertyId || (params.id as string));
        const owner = await ownerDataProvider.getOwnerById(property.ownerId as string);
        const prospects = await Promise.all(property.prospectIds.map((id) => prospectDataProvider.getProspectById(id)));

        setFormData((prev) => ({
          ...prev,
          property: {
            ...prev.property,
            id: property.id,
            name: property.name ?? '',
            dealType: property.dealType,
            price: {
              ...prev.property.price,
              amount: property.price?.amount ? property.price.amount / 100 : 0,
              currency: property.price?.currency ?? 'RUB',
            },
            floor: {
              ...prev.property.floor,
              number: property.floor?.number ?? 0,
              total: property.floor?.total ?? 0,
            },
            area: property.area ? property.area / 100 : 0,
          },
          owner: {
            ...prev.owner,
            id: owner?.id ?? crypto.randomUUID(),
            name: owner?.name ?? '',
            avatar: owner?.avatar ?? '',
            contacts: owner?.contacts ?? {},
          },
          prospects: prospects.map((prospect) => ({
            ...prospect,
            id: prospect.id ?? crypto.randomUUID(),
            name: prospect.name ?? '',
            contacts: {
              ...prospect.contacts,
              phone: prospect.contacts.phone ?? '',
              email: prospect.contacts.email ?? '',
              telegram: prospect.contacts.telegram ?? '',
              whatsapp: prospect.contacts.whatsapp ?? '',
            },
            avatar: prospect.avatar ?? '',
            status: prospect.status,
          })),
        }));
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Не удалось загрузить объект');
      } finally {
        setIsLoading(false);
      }
    };

    loadExistingData();
  }, [isEditMode, propertyId, params?.id]);

  const updatePropertyInfo = useCallback((data: Partial<PropertyFormData['property']>) => {
    setFormData((prev) => ({ ...prev, property: { ...prev.property, ...data } }));
  }, []);

  const updateOwnerInfo = useCallback((data: Partial<PropertyFormData['owner']>) => {
    setFormData((prev) => ({ ...prev, owner: { ...prev.owner, ...data } }));
  }, []);

  const addProspect = useCallback((prospect: PropertyFormData['prospects'][0]) => {
    setFormData((prev) => ({
      ...prev,
      prospects: [{ ...prospect, id: crypto.randomUUID() }, ...prev.prospects],
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
    () => (currentStep === stepsCount - 1 ? null : () => updateStep(Math.min(currentStep + 1, stepsCount - 1))),
    [currentStep, updateStep],
  );

  const prevStep = useMemo(
    () => (currentStep === 0 ? null : () => updateStep(Math.max(currentStep - 1, 0))),
    [currentStep, updateStep],
  );

  const submitForm = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (formData.property.name.trim() === '') {
        navigate('?tab=property');
        throw new Error('Название объекта не может быть пустым');
      }

      if (formData.owner.name.trim() === '') {
        navigate('?tab=owner');
        throw new Error('Имя собственника не может быть пустым');
      }

      if (formData.prospects.some((prospect) => prospect.name.trim() === '')) {
        navigate('?tab=prospects');
        throw new Error('Имя клиента не может быть пустым');
      }

      // Create owner first
      const owner: Owner = {
        id: formData.owner.id || crypto.randomUUID(),
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
        id: prospectData.id || crypto.randomUUID(),
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
        id: isEditMode && (propertyId || params?.id) ? propertyId || (params.id as string) : crypto.randomUUID(),
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
        floor: formData.property.floor
          ? {
              number: Number(formData.property.floor?.number),
              total: Number(formData.property.floor?.total),
            }
          : undefined,
        area: formData.property.area && formData.property.area > 0 ? Number(formData.property.area) * 100 : undefined,
      };

      if (isEditMode) {
        await ownerDataProvider.updateOwner(owner);

        for (const prospect of prospects) {
          try {
            await prospectDataProvider.getProspectById(prospect.id);
            await prospectDataProvider.updateProspect(prospect);
          } catch {
            await prospectDataProvider.createProspect(prospect);
          }
        }

        await propertyDataProvider.updateProperty(property);
      } else {
        await ownerDataProvider.createOwner(owner);

        for (const prospect of prospects) {
          await prospectDataProvider.createProspect(prospect);
        }

        await propertyDataProvider.createProperty(property);
      }

      navigate('/');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Не удалось сохранить объект');
    } finally {
      setIsLoading(false);
    }
  }, [formData, isEditMode, propertyId, params?.id, navigate]);

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
      setCurrentStep: updateStep,
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
      updateStep,
      nextStep,
      prevStep,
      submitForm,
      setError,
    ],
  );

  return <PropertyFormContext.Provider value={contextValue}>{children}</PropertyFormContext.Provider>;
};
