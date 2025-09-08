import { ButtonCell, Section } from '../../../../../packages/ui-kit';
import AddCircle28 from 'ui-kit/icons/svgs/add-circle-28.svg?react';

export const ProspectsBlock = () => {
  return (
    <Section title='Клиенты'>
      <ButtonCell
        before={<AddCircle28 />}
        onClick={() => {
          console.log('clicked');
        }}
      >
        Добавить
      </ButtonCell>
    </Section>
  );
};
