import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from './input';

const meta: Meta<typeof Input> = {
  title: 'Data Entry/Input',
  component: Input,
  args: {
    placeholder: 'Placeholder',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
