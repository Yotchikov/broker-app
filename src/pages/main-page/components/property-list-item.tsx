import { useState, type FC } from 'react';
import type { Property } from '../../../data/entities/property';
import { Accordion, Group, Avatar, Stack, Menu, ActionIcon, Space, Text, Button, Modal } from '@mantine/core';
import { IconDots, IconPencil, IconTrash, IconUser, IconUsers, IconPlus } from '@tabler/icons-react';
import { Price } from '../../../app/components';
import { OwnerInfo } from './owner-info';
import { PropertyInfo } from './property-info';
import { ProspectList } from './prospect-list';
import styles from '../main-page.module.css';
import { useNavigate } from 'react-router';
import { propertyDataProvider } from '../../../data/data-providers';

type PropertyListItemProps = {
  property: Property;
};

export const PropertyListItem: FC<PropertyListItemProps> = (props) => {
  const { property } = props;

  const navigate = useNavigate();

  const [deleteTarget, setDeleteTarget] = useState<Property | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      setIsDeleting(true);
      await propertyDataProvider.deletePropertyById(deleteTarget.id);
      setDeleteTarget(null);
      navigate('/');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Modal
        opened={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title='Удалить объект?'
        centered
      >
        <Stack gap='md'>
          <Text>Это действие нельзя отменить. Подтвердите удаление объекта "{deleteTarget?.name}".</Text>
          <Group justify='flex-end'>
            <Button
              color='gray'
              variant='transparent'
              onClick={() => setDeleteTarget(null)}
              disabled={isDeleting}
            >
              Отмена
            </Button>
            <Button
              variant='light'
              color='red'
              onClick={handleConfirmDelete}
              loading={isDeleting}
            >
              Удалить
            </Button>
          </Group>
        </Stack>
      </Modal>
      <Accordion.Item
        value={property.id}
        key={property.id}
      >
        <Group
          gap={0}
          wrap='nowrap'
          pr={'md'}
        >
          <Accordion.Control>
            <Group
              align='center'
              gap='xs'
            >
              <Avatar
                size={48}
                radius='xl'
                name={property.name}
                color='initials'
              />
              <Stack gap={0}>
                <Text size='lg'>{property.name}</Text>
                {property.price && (
                  <Text
                    size='sm'
                    c='dimmed'
                  >
                    <Price
                      amount={property.price.amount}
                      currency={property.price.currency}
                    />
                  </Text>
                )}
              </Stack>
            </Group>
          </Accordion.Control>
          <Menu position='bottom-end'>
            <Menu.Target>
              <ActionIcon
                variant='transparent'
                color='default'
              >
                <IconDots size={16} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={<IconPencil size={16} />}
                onClick={() => {
                  navigate(`/properties/${property.id}/edit`);
                }}
              >
                Редактировать
              </Menu.Item>
              <Menu.Item
                color='red'
                leftSection={<IconTrash size={16} />}
                onClick={() => setDeleteTarget(property)}
              >
                Удалить
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
        <Accordion.Panel>
          <PropertyInfo
            area={property.area}
            floor={property.floor}
          />
          <Space h='md' />
          <Accordion
            multiple
            chevronPosition='left'
            variant='unstyled'
            classNames={{ chevron: styles.chevron }}
          >
            {property.ownerId && (
              <Accordion.Item value='owner'>
                <Group
                  gap={0}
                  wrap='nowrap'
                >
                  <Accordion.Control>
                    <Group gap='xs'>
                      <IconUser size={16} />
                      Собственник
                    </Group>
                  </Accordion.Control>
                  <Menu position='bottom-end'>
                    <Menu.Target>
                      <ActionIcon
                        variant='transparent'
                        color='default'
                      >
                        <IconDots size={16} />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item
                        leftSection={<IconPencil size={16} />}
                        onClick={() => {
                          navigate(`/properties/${property.id}/edit?tab=owner`);
                        }}
                      >
                        Редактировать
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>
                <Accordion.Panel>
                  <OwnerInfo ownerId={property.ownerId} />
                </Accordion.Panel>
              </Accordion.Item>
            )}
            {property.prospectIds.length > 0 && (
              <Accordion.Item value='prospects'>
                <Group
                  gap={0}
                  wrap='nowrap'
                >
                  <Accordion.Control>
                    <Group
                      gap='xs'
                      wrap='nowrap'
                    >
                      <IconUsers size={16} />
                      Клиенты
                    </Group>
                  </Accordion.Control>
                  <Menu position='bottom-end'>
                    <Menu.Target>
                      <ActionIcon
                        variant='transparent'
                        color='default'
                      >
                        <IconDots size={16} />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item
                        leftSection={<IconPlus size={16} />}
                        onClick={() => {
                          navigate(`/properties/${property.id}/edit?tab=prospects`);
                        }}
                      >
                        Добавить
                      </Menu.Item>
                      <Menu.Item
                        leftSection={<IconPencil size={16} />}
                        onClick={() => {
                          navigate(`/properties/${property.id}/edit?tab=prospects`);
                        }}
                      >
                        Редактировать
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>
                <Accordion.Panel>
                  <ProspectList prospectIds={property.prospectIds} />
                </Accordion.Panel>
              </Accordion.Item>
            )}
          </Accordion>
        </Accordion.Panel>
      </Accordion.Item>
    </>
  );
};
