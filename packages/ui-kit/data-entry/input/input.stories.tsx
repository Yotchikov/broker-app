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

export const Default: Story = {
  render: () => {
    return (
      <div
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          gap: '10px',
          padding: '10px',
          background: 'var(--color-black-50)',
        }}
      >
        <Input
          placeholder='I am regular'
          size='m'
        />
        <Input
          placeholder='I am disabled'
          isDisabled
          size='m'
        />
        <Input
          placeholder='I am readonly'
          isReadonly
          size='m'
        />
        <Input
          placeholder='I am required'
          isRequired
          size='m'
        />
        <Input
          placeholder='I am clearable'
          isClearable
          size='m'
        />
        <Input
          placeholder='I am with error'
          error={{ message: 'Here is an error' }}
          size='m'
        />
      </div>
    );
  },
};
