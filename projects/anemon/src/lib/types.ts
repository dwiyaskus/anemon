export interface Basic {
    label: string;
    values: number[];
  }
  export interface Group {
    label: string;
    values: { value: number; color: string }[];
  }
  
  export interface BarConfig {
    data: Basic[];
    rightAxis: boolean;
    rotateXAxis: number;
    valueLabelPosition: 'inside' | 'outside';
    type: 'standard' | 'stacked';
    legendPosition: 'top' | 'bottom' | 'left' | 'right'; // Legend position
    color: string[];
    legend: { label: string; color: string }[];
    direction: 'vertical' | 'horizontal';
    fontSize: number;
    fontFamilly: string;
    styleTooltip: 'full' | 'single';
    legend_width?: number;
  }
  