import { Meta, StoryObj } from '@storybook/angular';
import { LabelComponent } from './label.component';

export default {
  title: 'Core/Text',
  component: LabelComponent,
  tags: ['autodocs'],
  args: {
    classname: '', // Default arguments
    title: '',
  },
  argTypes: {},
} as Meta<LabelComponent>;

export const Default: StoryObj<LabelComponent> = {
  args: {
    classname: 'text-red-500',
    title: 'Text',
  },
};
