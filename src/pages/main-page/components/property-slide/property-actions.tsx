import { Group } from '@mantine/core';
import { IconDots, IconPencil, IconShare3 } from '@tabler/icons-react';
import { VerticalButton } from '../../../../app/components';
import { useRef } from 'react';
import { PropertyMenu } from './property-menu';
import type { Property } from '../../../../data';
import { getShareMessage } from '../../../../app/utils';

type PropertyActionsProps = {
  property: Property;
};

export const PropertyActions = (props: PropertyActionsProps) => {
  const { property } = props;

  const propertyMenuRef = useRef<{
    openMore: () => void;
    openEdit: () => void;
  }>(null);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          url: getShareMessage(property),
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Group gap='xs'>
        <VerticalButton
          leftSection={
            <IconPencil
              stroke={1.8}
              size={24}
            />
          }
          variant='light'
          size='xs'
          radius='lg'
          flex={1}
          onClick={() => propertyMenuRef.current?.openEdit()}
        >
          Изменить
        </VerticalButton>
        <VerticalButton
          leftSection={
            <IconShare3
              stroke={1.8}
              size={24}
            />
          }
          variant='light'
          size='xs'
          radius='lg'
          flex={1}
          onClick={handleShare}
        >
          Поделиться
        </VerticalButton>
        <VerticalButton
          leftSection={
            <IconDots
              stroke={1.8}
              size={24}
            />
          }
          variant='light'
          size='xs'
          radius='lg'
          flex={1}
          onClick={() => propertyMenuRef.current?.openMore()}
        >
          Ещё
        </VerticalButton>
      </Group>
      <PropertyMenu
        ref={propertyMenuRef}
        propertyId={property.id}
      />
    </>
  );
};
