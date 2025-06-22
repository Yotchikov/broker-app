import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from './text';

const meta: Meta<typeof Text> = {
  title: 'Data Display/Text',
  component: Text,
  args: {
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
