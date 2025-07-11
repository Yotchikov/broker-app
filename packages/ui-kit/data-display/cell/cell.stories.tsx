import type { Meta, StoryObj } from '@storybook/react-vite';

import { Cell } from './cell';
import CircleInfoIcon from '../../icons/svgs/circle-info.svg';
import { Divider } from '../divider';
import CirclePlusIcon from '../../icons/svgs/circle-plus.svg';
import { Text } from '../text';

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
            <CircleInfoIcon
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
          before={<></>}
          subtitle='Этаж'
        >
          5 из 7
        </Cell>
        <Divider />
        <Cell
          before={
            <CirclePlusIcon
              width={28}
              height={28}
              color='var(--color-blue-500)'
            />
          }
          onClick={() => {
            console.log('clicked');
          }}
        >
          <Text color='info'>Добавить собственника</Text>
        </Cell>
      </div>
    );
  },
};
