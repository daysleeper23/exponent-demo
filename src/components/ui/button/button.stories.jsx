// Button.stories.jsx
import React from 'react';
import Button from './button';
import { ChevronRight } from 'lucide-react';

export default {
  title: 'Components/Button',
  component: Button,
  // Setup default “props” or controls
  args: {
    label: 'Button',
  },
  argTypes: {
    onClick: { action: 'clicked' },
    size: {
      control: 'radio',
      options: ['default', 'sm', 'lg'],
      description: 'Size variant for the Button',
    },
    variant: {
      control: 'radio',
      options: [
        'default',
        'secondary',
        'outline',
        'ghost',
        'link',
        'destructive',
      ],
      description: 'Usage variant for the Button',
    },
  },
};

export const Default = (args) => <Button {...args}>{args.label}</Button>;
Default.args = {
  size: 'default',
  variant: 'default',
};
export const Secondary = (args) => (
  <Button variant="secondary" {...args}>
    {args.label}
  </Button>
);
export const Outline = (args) => (
  <Button variant="outline" {...args}>
    {args.label}
  </Button>
);
export const Ghost = (args) => (
  <Button variant="ghost" {...args}>
    {args.label}
  </Button>
);
export const Link = (args) => (
  <Button variant="link" {...args}>
    {args.label}
  </Button>
);
export const Destructive = (args) => (
  <Button variant="destructive" {...args}>
    {args.label}
  </Button>
);
export const Disabled = (args) => (
  <Button {...args} disabled>
    {' '}
    {args.label}{' '}
  </Button>
);

export const IconOnly = (args) => (
  <Button variant="default" size="icon" {...args}>
    <ChevronRight />
  </Button>
);
