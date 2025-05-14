import type { Meta, StoryObj } from '@storybook/angular';
import { LineComponent } from './line.component';

const meta: Meta<LineComponent> = {
  title: 'Line',
  component: LineComponent,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  args: {},
  argTypes: {
    // position: {
    //   options: ['top', 'right', 'bottom', 'left'],
    //   control: { type: 'radio' },
    //   table: {
    //     defaultValue: { summary: 'top' },
    //   },
    // },
  },
};

export default meta;
type Story = StoryObj<LineComponent>;

export const Default: Story = {
  args: {
    data: [
      {
        name: 'Series A',
        points: [
          { x: 0, y: 1 },
          { x: 1, y: 3 },
          { x: 2, y: 4 },
          { x: 3, y: 1 },
          { x: 4, y: 6 },
          { x: 5, y: 5 },
          { x: 6, y: 2 },
          { x: 7, y: 1 },
          { x: 8, y: 7 },
          { x: 9, y: 9 },
          { x: 10, y: 13 },
          { x: 11, y: 3 },
          { x: 12, y: 1 },
          { x: 13, y: 4 },
          { x: 14, y: 0 },
          { x: 15, y: 3 },
          { x: 16, y: 9 },
        ],
        color: '#007bff',
      },
      {
        name: 'Series B',
        points: [
          { x: 0, y: 2 },
          { x: 1, y: 4 },
          { x: 2, y: 7 },
          { x: null, y: null },
          { x: 4, y: 7 },
          { x: 5, y: 4 },
          { x: 6, y: 2 },
          { x: 7, y: 8 },
          { x: 8, y: 10 },
          { x: 9, y: 11 },
          { x: 10, y: 1 },
          { x: 11, y: 6 },
          { x: 12, y: 5 },
          { x: 13, y: 2 },
          { x: 14, y: 1 },
          { x: 15, y: 7 },
          { x: 16, y: 5 },
        ],
        color: '#28a745',
      },
      {
        name: 'Series C',
        points: [
          { x: 0, y: 3 },
          { x: 1, y: 5 },
          { x: 2, y: 3 },
          { x: 3, y: 6 },
          { x: 4, y: 8 },
          { x: 5, y: 3 },
          { x: 6, y: 1 },
          { x: 7, y: 4 },
          { x: 8, y: 0 },
          { x: 9, y: 3 },
          { x: 10, y: 9 },
          { x: 11, y: 2 },
          { x: 12, y: 8 },
          { x: 13, y: 10 },
          { x: 14, y: 11 },
          { x: 15, y: 1 },
          { x: 16, y: 10 },
        ],
        color: '#dc3545',
      },
    ],
  },
};
