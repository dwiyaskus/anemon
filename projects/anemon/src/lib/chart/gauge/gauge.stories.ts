import type { Meta, StoryObj } from '@storybook/angular';
import { GaugeComponent } from './gauge.component';

const meta: Meta<GaugeComponent> = {
  title: 'Gauge',
  component: GaugeComponent,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  args: {},
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 200, step: 1 } },
    max: { control: 'number' },
    label: { control: 'text' },
    colorLevels: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<GaugeComponent>;

export const Default: Story = {
  args: {
    value: 85,
    max: 200,
    label: 'Engine RPM',
    colorLevels: [
      { threshold: 60, color: '#4caf50' },
      { threshold: 100, color: '#ffeb3b' },
      { threshold: 150, color: '#f44336' },
      { threshold: 200, color: '#Ffc0cb' },
    ],
  },
};
