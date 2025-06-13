import type { Meta, StoryObj } from '@storybook/angular';
import { BarCanvasComponent } from './bar-canvas.component';
// import { BarCanvasComponent } from './bar.component';

const meta: Meta<BarCanvasComponent> = {
  title: 'Bar Canvas Chart',
  component: BarCanvasComponent,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  args: {},
  argTypes: {
    stacked: {
      control: { type: 'boolean' },
    },
    orientation: {
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
    tooltipType: {
      options: ['single', 'full'],
      control: { type: 'radio' },
      table: {
        defaultValue: { summary: 'single' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<BarCanvasComponent>;

export const Default: Story = {
  name: 'Vertical',
  args: {
    stacked: false,
    orientation: 'vertical',
    legendPosition: 'bottom',
    labels: ['Porsche', 'Mercedes-Benz', 'Dodge', 'Audi', 'Jaguar'],
    datasets: [
      {
        label: 'Horsepower (Avg)',
        data: [
          321.14285714285717, 278.6923076923077, 209.69230769230768,
          250.78947368421052, 307,
        ],
        color: '#3498db',
        type: 'bar',
      },
      {
        label: 'EngineSize (Max)',
        data: [4.5, 5.5, 8.3, 4.2, 4.2],
        color: '#2ecc71',
        type: 'bar',
      },
      {
        label: 'Horsepower (Max)',
        data: [477, 493, 500, 450, 390],
        color: '#e74c3c',
        type: 'line',
      },
    ],
    withLine: true,
    tooltipType: 'full'
  },
};

export const Vertical: Story = {
  name: 'Vertical Custom',
  args: {
    stacked: false,
    orientation: 'vertical',
    legendPosition: "bottom",
    labels: ['Porsche', 'Mercedes-Benz', 'Dodge', 'Audi', 'Jaguar'],
    datasets: [
      {
        label: 'Horsepower (Avg)',
        data: [
          321.14285714285717, 278.6923076923077, 209.69230769230768,
          250.78947368421052, 307,
        ],
        color: '#3498db',
        type: 'bar',
      },
      // {
      //   label: 'EngineSize (Max)',
      //   data: [4.5, 5.5, 8.3, 4.2, 4.2],
      //   color: '#2ecc71',
      //   type: 'bar',
      // },
      // {
      //   label: 'Horsepower (Max)',
      //   data: [477, 493, 500, 450, 390],
      //   color: '#e74c3c',
      //   type: 'line',
      // },
    ],
    withLine: true,
    tooltipType: 'single'
  },
};

export const Horizontal: Story = {
  name: 'Horizontal',
  args: {
    stacked: false,
    orientation: 'horizontal',
    legendPosition: 'bottom',
      labels: ['Porsche', 'Mercedes-Benz', 'Dodge', 'Audi', 'Jaguar'],
    datasets: [
      {
        label: 'Horsepower (Avg)',
        data: [
          321.14285714285717, 278.6923076923077, 209.69230769230768,
          250.78947368421052, 307,
        ],
        color: '#3498db',
        type: 'bar',
      },
      {
        label: 'EngineSize (Max)',
        data: [4.5, 5.5, 8.3, 4.2, 4.2],
        color: '#2ecc71',
        type: 'bar',
      },
      {
        label: 'Horsepower (Max)',
        data: [477, 493, 500, 450, 390],
        color: '#e74c3c',
        type: 'line',
      },
    ],
    tooltipType: 'single'
  },
};

export const StackedVertical: Story = {
  name: 'Stacked Vertical',
  args: {
    stacked: true,
    orientation: 'vertical',
    legendPosition: 'bottom',
      labels: ['Porsche', 'Mercedes-Benz', 'Dodge', 'Audi', 'Jaguar'],
    datasets: [
      {
        label: 'Horsepower (Avg)',
        data: [
          321.14285714285717, 278.6923076923077, 209.69230769230768,
          250.78947368421052, 307,
        ],
        color: '#3498db',
        type: 'bar',
      },
      {
        label: 'EngineSize (Max)',
        data: [4.5, 5.5, 8.3, 4.2, 4.2],
        color: '#2ecc71',
        type: 'bar',
      },
      {
        label: 'Horsepower (Max)',
        data: [477, 493, 500, 450, 390],
        color: '#e74c3c',
        type: 'line',
      },
    ],
    tooltipType: 'single'
  },
};

export const StackedHorizontal: Story = {
  name: 'Stacked Horizontal',
  args: {
    stacked: true,
    orientation: 'horizontal',
    legendPosition: 'bottom',
      labels: ['Porsche', 'Mercedes-Benz', 'Dodge', 'Audi', 'Jaguar'],
    datasets: [
      {
        label: 'Horsepower (Avg)',
        data: [
          321.14285714285717, 278.6923076923077, 209.69230769230768,
          250.78947368421052, 307,
        ],
        color: '#3498db',
        type: 'bar',
      },
      {
        label: 'EngineSize (Max)',
        data: [4.5, 5.5, 8.3, 4.2, 4.2],
        color: '#2ecc71',
        type: 'bar',
      },
      {
        label: 'Horsepower (Max)',
        data: [477, 493, 500, 450, 390],
        color: '#e74c3c',
        type: 'line',
      },
    ],
    tooltipType: 'full'
  },
};