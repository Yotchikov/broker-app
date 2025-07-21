import { useState, type FC } from 'react';
import type { Owner } from '../../../../data';
import { useLoaderData } from 'react-router';
import { Cell, Section, Text } from '../../../../../packages/ui-kit';
import ProfileColoredSquare32 from 'ui-kit/icons/svgs/profile-colored-square-32.svg?react';
import AddCircle28 from 'ui-kit/icons/svgs/add-circle-28.svg?react';
import ChevronDown16 from 'ui-kit/icons/svgs/chevron-down-16.svg?react';
import styles from './property-owner.module.css';

export const PropertyOwner: FC = () => {
  const { owner } = useLoaderData<{ owner?: Owner }>();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Section>
      {owner ? (
        <>
          <Cell
            before={<ProfileColoredSquare32 />}
            after={<ChevronDown16 style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />}
            subtitle='Собственник'
            onClick={() => setIsOpen(!isOpen)}
          >
            {owner.name}
          </Cell>
          {isOpen && (
            <Cell className={styles.info}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
              of
            </Cell>
          )}
        </>
      ) : (
        <Cell
          before={
            <AddCircle28
              width={28}
              height={28}
              color='var(--color-blue-500)'
            />
          }
          onClick={() => {}}
        >
          <Text color='info'>Добавить собственника</Text>
        </Cell>
      )}
    </Section>
  );
};
