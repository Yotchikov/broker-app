import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from './button';
import LinkIcon from '../../icons/svgs/link.svg';
import type { ButtonProps } from './button.types';

const meta: Meta<typeof Button> = {
  title: 'Data Entry/Button',
  component: Button,
  args: {
    children: 'Button',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const States: Story = {
  render: () => {
    const props: Record<string, ButtonProps[]> = {
      Default: [
        {
          variant: 'primary',
        },
        {
          variant: 'secondary',
        },
        {
          variant: 'outline',
        },
        {
          variant: 'ghost',
        },
      ],
      Disabled: [
        {
          variant: 'primary',
          isDisabled: true,
        },
        {
          variant: 'secondary',
          isDisabled: true,
        },
        {
          variant: 'outline',
          isDisabled: true,
        },
        {
          variant: 'ghost',
          isDisabled: true,
        },
      ],
      Loading: [
        {
          variant: 'primary',
          isLoading: true,
        },
        {
          variant: 'secondary',
          isLoading: true,
        },
        {
          variant: 'outline',
          isLoading: true,
        },
        {
          variant: 'ghost',
          isLoading: true,
        },
      ],
    };

    return (
      <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'auto repeat(4, 1fr)', alignItems: 'center' }}>
        <div />
        <div>Primary</div>
        <div>Secondary</div>
        <div>Outline</div>
        <div>Ghost</div>
        {Object.entries(props).map(([key, items]) => (
          <>
            {key}
            {items.map((it, index) => (
              <Button
                key={index}
                {...it}
              >
                Button
              </Button>
            ))}
          </>
        ))}
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Button size='xs'>Button</Button>
        <Button size='s'>Button</Button>
        <Button size='m'>Button</Button>
        <Button size='l'>Button</Button>
      </div>
    );
  },
};

export const Icons: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Button
          size='xs'
          icon={<LinkIcon />}
        >
          Button
        </Button>
        <Button
          size='s'
          icon={<LinkIcon />}
        >
          Button
        </Button>
        <Button
          size='m'
          icon={<LinkIcon />}
        >
          Button
        </Button>
        <Button
          size='l'
          icon={<LinkIcon />}
        >
          Button
        </Button>
        <Button
          size='xs'
          icon={<LinkIcon />}
        ></Button>
        <Button
          size='s'
          icon={<LinkIcon />}
        ></Button>
        <Button
          size='m'
          icon={<LinkIcon />}
        ></Button>
        <Button
          size='l'
          icon={<LinkIcon />}
        ></Button>
      </div>
    );
  },
};
