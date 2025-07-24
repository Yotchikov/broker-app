import type { Meta, StoryObj } from '@storybook/react-vite';

import { Cell } from './cell';
import InfoCircle28 from '../../icons/svgs/info-circle-28.svg?react';
import AddCircle28 from '../../icons/svgs/add-circle-28.svg?react';
import Bin28 from '../../icons/svgs/bin-28.svg?react';
import { Divider } from '../divider';
import { ButtonCell } from '../../data-entry';

const meta: Meta<typeof Cell> = {
  title: 'Data Display/Cell',
  component: Cell,
  args: {},
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <div
        style={{
          display: 'inline-block',
          padding: '10px',
          background: 'var(--color-black-50)',
        }}
      >
        <Cell
          before={
            <InfoCircle28
              width={28}
              height={28}
              color='var(--color-blue-500)'
            />
          }
          subtitle='Площадь'
        >
          44.4 м²
        </Cell>
        <Cell
          subhead='Этаж'
          subtitle='Это очень высоко!'
        >
          5 из 7
        </Cell>
        <Divider />
        <ButtonCell
          before={
            <AddCircle28
              width={28}
              height={28}
            />
          }
          onClick={() => {
            console.log('clicked');
          }}
        >
          Добавить собственника
        </ButtonCell>
        <ButtonCell
          before={
            <Bin28
              width={28}
              height={28}
            />
          }
          variant='danger'
          onClick={() => {
            console.log('clicked');
          }}
        >
          Удалить
        </ButtonCell>
      </div>
    );
  },
};
