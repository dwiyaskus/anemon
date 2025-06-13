import type { Meta, StoryObj } from '@storybook/angular';
import { PieComponent } from './pie-donut.component';

const meta: Meta<PieComponent> = {
  title: 'Pie',
  component: PieComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  args: {},
  argTypes: {
    legendOrientation: {
      options: ['vertical', 'horizontal'],
      control: { type: 'radio' },
      table: {
        defaultValue: { summary: 'vertical' },
      },
    },

    legendPosition: {
      options: ['bottom', 'top', 'left', 'right'],
      control: { type: 'radio' },
      table: {
        defaultValue: { summary: 'bottom' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<PieComponent>;

export const Default: Story = {
  args: {
    legendPosition: 'top left',
    legendOrientation: 'vertical',
    data: [
      { label: 'A', value: 40, color: '#FF6384' },
      { label: 'B', value: 25, color: '#36A2EB' },
      { label: 'C', value: 20, color: '#FFCE56' },
      { label: 'D', value: 15, color: '#4BC0C0' },
    ],
    width: 600,
    height: 600,
    donut: false,
    fontInnerText: 18,
    innerText: '',
    innerRadius: 0,
    radius: 150,
  },
};
