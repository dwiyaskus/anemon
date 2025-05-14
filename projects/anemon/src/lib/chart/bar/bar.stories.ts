import type { Meta, StoryObj } from '@storybook/angular';
import { BarChartComponent } from './bar.component';

const meta: Meta<BarChartComponent> = {
  title: 'Bar Chart',
  component: BarChartComponent,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  args: {},
  argTypes: {
    legend: {
      // control: { type: '' },
      table: {
        defaultValue: { summary: '0' },
      },
    },
    rightAxis: {
      control: { type: 'boolean' },
    },
    rotateXAxis: {
      control: { type: 'number' },
      table: {
        defaultValue: { summary: '0' },
      },
    },
    valueLabelPosition: {
      control: { type: 'radio' },
      options: ['inside', 'outside'],
      table: {
        defaultValue: { summary: 'outside' },
      },
    },
    type: {
      control: { type: 'radio' },
      options: ['standard', 'stacked'],
      table: {
        defaultValue: { summary: 'standard' },
      },
    },
    legendPosition: {
      options: ['top', 'right', 'bottom', 'left'],
      control: { type: 'radio' },
      table: {
        defaultValue: { summary: 'bottom' },
      },
    },
    direction: {
      options: ['vertical', 'horizontal'],
      control: { type: 'radio' },
      table: {
        defaultValue: { summary: 'vertical' },
      },
    },
    styleTooltip: {
      options: ['single', 'full'],
      control: { type: 'select' },
      table: {
        defaultValue: { summary: 'single' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<BarChartComponent>;

export const Default: Story = {
  name: 'Vertical',
  args: {
    data: [
      { label: 'Mon', values: [100] },
      { label: 'Tue', values: [300] },
      { label: 'Wed', values: [150] },
      { label: 'Thu', values: [75] },
      { label: 'Fri', values: [50] },
      { label: 'Sat', values: [120] },
      { label: 'Sun', values: [180] },
    ],
    legend: [{ label: 'Total', color: '#4A90E2' }],
    color: ['#4A90E2'],
    rightAxis: false,
    rotateXAxis: 0,
    valueLabelPosition: 'outside',
    type: 'standard',
    legendPosition: 'bottom',
    direction: 'vertical',
    fontSize: 12,
    fontFamilly: 'normal',
    styleTooltip: 'single',
  },
};

export const Horizontal: Story = {
  name: 'Horizontal',
  args: {
    data: [
      { label: 'Mon', values: [100] },
      { label: 'Tue', values: [300] },
      { label: 'Wed', values: [150] },
      { label: 'Thu', values: [75] },
      { label: 'Fri', values: [50] },
      { label: 'Sat', values: [120] },
      { label: 'Sun', values: [180] },
    ],
    legend: [{ label: 'Total', color: '#4A90E2' }],
    color: ['#4A90E2'],
    rightAxis: false,
    rotateXAxis: 0,
    valueLabelPosition: 'outside',
    type: 'standard',
    legendPosition: 'bottom',
    direction: 'horizontal',
    fontSize: 12,
    fontFamilly: 'normal',
    styleTooltip: 'single',
  },
};

export const Vertical: Story = {
  name: 'Vertical Group',
  args: {
    data: [
      { label: 'Mon', values: [100, 40] },
      { label: 'Tue', values: [300, 150] },
      { label: 'Wed', values: [150, 120] },
      { label: 'Thu', values: [75, 125] },
      { label: 'Fri', values: [50, 100] },
      { label: 'Sat', values: [120, 60] },
      { label: 'Sun', values: [180, 90] },
    ],
    legend: [
      { label: 'Total A', color: '#4A90E2' },
      { label: 'Total B', color: '#50E3C2' },
    ],
    color: ['#4A90E2', '#50E3C2'],
    rightAxis: false,
    rotateXAxis: 0,
    valueLabelPosition: 'outside',
    type: 'standard',
    legendPosition: 'bottom',
    direction: 'vertical',
    fontSize: 12,
    fontFamilly: 'normal',
    styleTooltip: 'single',
  },
};

export const HorizontalGroup: Story = {
  name: 'Horizontal Group',
  args: {
    data: [
      { label: 'Mon', values: [100, 40] },
      { label: 'Tue', values: [300, 150] },
      { label: 'Wed', values: [150, 120] },
      { label: 'Thu', values: [75, 125] },
      { label: 'Fri', values: [50, 100] },
      { label: 'Sat', values: [120, 60] },
      { label: 'Sun', values: [180, 90] },
    ],
    legend: [
      { label: 'Total A', color: '#4A90E2' },
      { label: 'Total B', color: '#50E3C2' },
    ],
    color: ['#4A90E2', '#50E3C2'],
    rightAxis: false,
    rotateXAxis: 0,
    valueLabelPosition: 'outside',
    type: 'standard',
    legendPosition: 'bottom',
    direction: 'horizontal',
    fontSize: 12,
    fontFamilly: 'normal',
    styleTooltip: 'single',
  },
};

export const Stacked: Story = {
  name: 'Vertical Stack',
  args: {
    data: [
      {
        label: 'Matcha Latte',
        values: [40, 80, 90],
      },
      {
        label: 'Milk Tea',
        values: [60, 70, 100],
      },
      {
        label: 'Cheese Cocoa',
        values: [80, 60, 90],
      },
      {
        label: 'Walnut Brownie',
        values: [90, 50, 40],
      },
    ],
    legend: [
      { label: '2015', color: '#4A90E2' },
      { label: '2016', color: '#50E3C2' },
      { label: '2017', color: '#F5A623' },
    ],
    color: ['#4A90E2', '#50E3C2', '#F5A623'],
    rightAxis: false,
    rotateXAxis: 0,
    valueLabelPosition: 'outside',
    type: 'stacked',
    legendPosition: 'bottom',
    direction: 'vertical',
    fontSize: 12,
    fontFamilly: 'normal',
    styleTooltip: 'single',
  },
};

export const HorizontalStacked: Story = {
  name: 'Horizontal Stack',
  args: {
    data: [
      {
        label: 'Matcha Latte',
        values: [40, 80, 90],
      },
      {
        label: 'Milk Tea',
        values: [60, 70, 100],
      },
      {
        label: 'Cheese Cocoa',
        values: [80, 60, 90],
      },
      {
        label: 'Walnut Brownie',
        values: [90, 50, 40],
      },
    ],
    legend: [
      { label: '2015', color: '#4A90E2' },
      { label: '2016', color: '#50E3C2' },
      { label: '2017', color: '#F5A623' },
    ],
    color: ['#4A90E2', '#50E3C2', '#F5A623'],
    rightAxis: false,
    rotateXAxis: 0,
    valueLabelPosition: 'outside',
    type: 'stacked',
    legendPosition: 'bottom',
    direction: 'horizontal',
    fontSize: 12,
    fontFamilly: 'normal',
    styleTooltip: 'single',
  },
};
