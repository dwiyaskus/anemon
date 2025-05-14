import type { Meta, StoryObj } from '@storybook/angular';
import { DivisionComponent } from './division.component';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<DivisionComponent> = {
  title: 'Core/Division',
  component: DivisionComponent,
  tags: ['autodocs'],
  argTypes: {
    classname: {
      control: 'text',
    },
    id: {
      control: 'text',
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
};

export default meta;
type Story = StoryObj<DivisionComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    classname:
      'border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal',
    id: 'ids',
  },
};
