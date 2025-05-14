import { Meta, StoryObj } from '@storybook/angular';
import { SelectComponent } from './select.component';

export default {
  title: 'Core/Select',
  component: SelectComponent,
  tags: ['autodocs'],
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    value: 'option1',
    title: 'Select',
    classname:
      'block w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight',
  },
  argTypes: {
    eventTriggered: { action: 'eventTriggered' },
  },
} as Meta<SelectComponent>;

export const Default: StoryObj<SelectComponent> = {
  play: async ({ canvasElement }) => {
    const selectElement: HTMLSelectElement | null =
      canvasElement.querySelector('select');
    if (selectElement) {
      selectElement.dispatchEvent(new Event('focus'));
      selectElement.dispatchEvent(new Event('blur'));
      selectElement.dispatchEvent(new Event('change'));
    }
  },
};

export const Secondary: StoryObj<SelectComponent> = {
  name: 'Add ClassName',
  args: {
    title: 'Select',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    value: 'option1',
    classname:
      'block w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-full leading-tight',
  },
};
