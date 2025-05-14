import type { Meta, StoryObj } from '@storybook/angular';
import { BigNumberComponent } from './big-number.component';

const meta: Meta<BigNumberComponent> = {
  title: 'Big Number',
  component: BigNumberComponent,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  args: {},
  argTypes: {
    position: {
      options: ['top', 'right', 'bottom', 'left'],
      control: { type: 'radio' },
      table: {
        defaultValue: { summary: 'top' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<BigNumberComponent>;

export const Default: Story = {
  args: {
    number: 400,
    label: 'Text',
    size_label: 2,
    size_number: 5,
    position: 'top',
    label_color: '#000',
    number_color: '#000',
  },
};
