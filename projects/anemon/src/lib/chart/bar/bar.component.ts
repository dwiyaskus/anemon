import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { BarConfig, Basic } from '../../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'anemon-bar',
  imports:[CommonModule],
  templateUrl: 'bar.component.html',
  styleUrls: ['bar.component.css'],
})
export class BarChartComponent implements AfterViewInit, OnInit, OnChanges {
  @ViewChild('legendContainer', { static: true })
  legendContainer!: ElementRef<HTMLCanvasElement>;
  // @Input() config: BarConfig = {
  //   data: [],
  //   rightAxis: false,
  //   rotateXAxis: 0,
  //   valueLabelPosition: 'outside',
  //   type: 'standard',
  //   legendPosition: 'bottom', // Legend position
  //   color: [],
  //   legend: [],
  //   direction: 'vertical',
  //   fontSize: 12,
  //   fontFamilly: 'normal',
  //   styleTooltip: 'single',
  //   legend_width: 350
  // };

  @Input() data: Basic[] = [];
  @Input() rightAxis: boolean = false;
  @Input() rotateXAxis: number = 0;
  @Input() valueLabelPosition: 'inside' | 'outside' = 'outside';
  @Input() type: 'standard' | 'stacked' = 'standard';
  @Input() legendPosition: 'top' | 'bottom' | 'left' | 'right' = 'bottom'; // Legend position
  @Input() color: string[] = [];
  @Input() legend: { label: string; color: string; }[] = [];
  @Input() direction: 'vertical' | 'horizontal' = 'vertical';
  @Input() fontSize: number = 12;
  @Input() fontFamilly: string = 'normal';
  @Input() styleTooltip: 'full' | 'single' = 'single';
  @Input() legend_width: number = 350;

  
  public xAxisTicks: number[] = [];

  private maxValue: number = 0; // Adjust this based on your data
  public yAxisTicks: number[] = [];
  public width: number = 0;
  public height: number = 0;

  // legend_width = 350;

  ngAfterViewInit() {
    let collection = null;
    if (this.direction === 'vertical') {
      collection = document.getElementsByClassName('chart-wrapper');
    } else {
      collection = document.getElementsByClassName('chart');
    }

    this.width = collection?.[0].clientWidth;
    this.height = collection?.[0].clientHeight;
  }
  constructor() {}

  ngOnInit() {
    this.generateStackedYAxisTicks();
    this.totP = Math.ceil(this.legend.length / 5);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['type'].currentValue) {
      this.generateStackedYAxisTicks();
    }
    if (changes['direction'].currentValue) {
      let collection = null;
      if (this.direction === 'vertical') {
        collection = document.getElementsByClassName('chart-wrapper');
      } else {
        collection = document.getElementsByClassName('chart');
      }
      if (collection.length > 0) {
        const container = collection[0] as HTMLElement;
        this.width = container.clientWidth;
      }

      this.generateStackedYAxisTicks();
    }
  }

  generateStackedYAxisTicks() {
    let maxValue = 0;

    if (this.type === 'stacked') {
      let maxStacked = this.data.map((item) => {
        let x = this.getTotalStacked(item.values);
        return x;
      });
      maxValue = Math.max(...maxStacked);
    } else {
      maxValue = Math.max(
        ...this.data.flatMap((group) => group.values.map((bar) => bar))
      );
    }
    this.maxValue = maxValue;
    const step = Math.ceil(maxValue / 5);
    if (this.direction === 'horizontal') {
      this.xAxisTicks = Array.from({ length: 6 }, (_, i) => i * step);
    } else {
      this.yAxisTicks = Array.from({ length: 6 }, (_, i) => i * step);
    }
  }
  getTotalStacked = (group: number[]) => {
    return group.map((item) => item).reduce((prev, curr) => prev + curr, 0);
  };

  getMaxHeight = (data: number[], value: number) => {
    const maxValue = Math.max(...data);
    if (maxValue === value) {
      return 0;
    } else {
      return maxValue - value;
    }
  };

  getBarWidth(value: number): string {
    return ((value / this.maxValue) * 100).toFixed(2) + '%';
  }

  curP: number = 1;
  totP: number = 0; // for example, 5 items per page
  itp: number = 5;
  // Next page functionality
  nextScroll() {
    if (this.curP < this.totP) {
      this.curP++;
      this.scrollToPage(this.curP);
    }
  }

  // Previous page functionality
  previousScroll() {
    if (this.curP > 1) {
      this.curP--;
      this.scrollToPage(this.curP);
    }
  }

  // Method to calculate the scroll position and scroll the container
  private scrollToPage(page: number) {
    const elements = document.getElementsByClassName('legend-container');
    let offset: number;
    if (elements.length > 0) {
      const container = elements[0] as HTMLElement;
      offset = (page - 1) * (container.scrollWidth / this.totP);
      container.scrollTo({
        left: offset,
        behavior: 'smooth',
      });
    }
  }

  hoveredBar: any = null;
hoveredGroup: string = '';
tooltipX: number = 0;
tooltipY: number = 0;

onBarHover(barValue: any, groupLabel: string, event: MouseEvent): void {
  this.hoveredBar = barValue;
  this.hoveredGroup = groupLabel;
  this.updateTooltipPosition(event);
}

onGroupHover(groupLabel: string, event: MouseEvent): void {
  this.hoveredGroup = groupLabel;
  this.updateTooltipPosition(event);
}

onMouseMove(event: MouseEvent): void {
  this.updateTooltipPosition(event);
}

onBarLeave(): void {
  this.hoveredBar = null;
}

onGroupLeave(): void {
  this.hoveredGroup = '';
}

private updateTooltipPosition(event: MouseEvent): void {
  this.tooltipX = event.clientX;
  this.tooltipY = event.clientY;
}
}
