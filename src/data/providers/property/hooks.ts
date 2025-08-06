import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { propertyMockProvider } from './property-mock-provider';
import type { Property } from '../../entities';

export const useGetPropertiesQuery = (provider = propertyMockProvider) => {
  return useQuery({
    queryKey: ['properties'],
    queryFn: () => provider.getProperties(),
  });
};

export const useGetPropertyByIdQuery = (id: string, provider = propertyMockProvider) => {
  return useQuery({
    queryKey: ['property', id],
    queryFn: () => provider.getPropertyById(id),
  });
};

export const useCreatePropertyMutation = (provider = propertyMockProvider) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (property: Property) => provider.createProperty(property),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
};
