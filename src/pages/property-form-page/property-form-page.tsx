import { ButtonCell, InputCell, PageLayout, Section } from '../../../packages/ui-kit';
import AddCircle28 from 'ui-kit/icons/svgs/add-circle-28.svg?react';
import { PageHeader } from '../../app/components';
import { SubmitButton } from './components';

export const PropertyFormPage = () => {
  return (
    <PageLayout
      header={<PageHeader />}
      footer={<SubmitButton />}
    >
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
      <Section title='Собственник'>
        <InputCell
          before='Имя'
          placeholder='Иван'
        />
        <InputCell
          before='Фамилия'
          placeholder='Иванов'
        />
      </Section>
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
    </PageLayout>
  );
};
