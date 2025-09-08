import { ButtonCell, InputCell, Section } from '../../../../../packages/ui-kit';
import AddCircle28 from 'ui-kit/icons/svgs/add-circle-28.svg?react';

export const OwnerBlock = () => {
  return (
    <Section title='Собственник'>
      <InputCell
        before='Имя'
        placeholder='Иван'
      />
      <InputCell
        before='Фамилия'
        placeholder='Иванов'
      />
      <ButtonCell before={<AddCircle28 />}>Добавить контакт</ButtonCell>
    </Section>
  );
};
