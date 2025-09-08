import { InputCell, Section } from '../../../../../packages/ui-kit';

export const InformationBlock = () => {
  return (
    <Section title='Информация'>
      <InputCell
        before='Название'
        placeholder='ЖК Lucky'
      />
      <InputCell
        before='Стоимость'
        placeholder='1 000 000, ₽'
        htmlType='number'
      />
    </Section>
  );
};
