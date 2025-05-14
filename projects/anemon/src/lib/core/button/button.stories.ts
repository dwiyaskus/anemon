import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';

import { ButtonComponent } from './button.component';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ButtonComponent> = {
  title: 'Core/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    click: { action: 'clicked' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
};

export default meta;
type Story = StoryObj<ButtonComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    classname: 'bg-blue-500 text-white ',
    label: 'Button',
  },
};

export const FullRounded: Story = {
  name: 'Full Rounded',
  args: {
    label: 'Click Me',
    classname: 'rounded-full text-white bg-red-800',
  },
};
