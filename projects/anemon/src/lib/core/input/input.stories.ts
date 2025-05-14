import { Meta, StoryObj } from '@storybook/angular';
import { InputComponent } from './input.component';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Core/Input',
  component: InputComponent,
  tags: ['autodocs'],
  args: {
    type: 'text', // Default arguments
  },
  argTypes: {
    type: {
      control: 'text',
      description: 'The type of the input element (e.g., text, password, etc.)',
    },
    eventTriggered: {
      action: 'eventTriggered',
      description: 'Emitted event name and details',
    },
  },
} as Meta<InputComponent>;

export const Default: StoryObj<InputComponent> = {
  args: {
    type: 'text',
    title: 'Username',
    id: 'Username',
    name: 'Username',
    placeholder: 'Username',
    classname: '',
  },
};

export const Secondary: StoryObj<InputComponent> = {
  name: 'Add ClassName',
  args: {
    type: 'text',
    title: 'Text',
    id: 'text',
    name: 'text',
    placeholder: 'text',
    classname: 'w-full rounded-full',
  },
};

export const Password: StoryObj<InputComponent> = {
  args: {
    type: 'password',
    title: 'Password',
    id: 'password',
    name: 'password',
    placeholder: 'password',
  },
};

export const Error: StoryObj<InputComponent> = {
  name: 'Error Display',
  args: {
    type: 'text',
    title: 'Error',
    id: 'error',
    name: 'error',
    placeholder: '',
    isError: true,
    message: 'Please fill',
    classname: 'border-3 border-red-500 rounded-full ',
    required: false,
  },
};
