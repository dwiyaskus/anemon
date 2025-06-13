import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

interface ColorLevel {
  threshold: number;
  color: string;
}

@Component({
  selector: 'app-gauge',
  imports: [CommonModule],
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.css'],
})
export class GaugeComponent implements OnChanges {
  @Input() value = 0;
  @Input() max = 100;
  @Input() label = '';
  @Input() colorLevels: ColorLevel[] = [];

  rotation = -90;
  arcPaths: { d: string; color: string }[] = [];
  needleColor = '#0288d1';
  labels: { x: number; y: number; value: number }[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.rotation = (this.value / this.max) * 180 - 90;
    this.updateArcs();
    this.updateNeedleColor();
  }

  updateNeedleColor() {
    for (const level of this.colorLevels) {
      if (this.value <= level.threshold) {
        this.needleColor = level.color;
        return;
      }
    }
    this.needleColor =
      this.colorLevels[this.colorLevels.length - 1]?.color || '#0288d1';
  }

  updateArcs() {
    this.arcPaths = [];

    const startAngle = -90;
    let prevThreshold = 0;

    for (const level of this.colorLevels) {
      if (level.threshold > this.max) continue; // skip out-of-range thresholds

      const start = (prevThreshold / this.max) * 180 + startAngle;
      const end = (level.threshold / this.max) * 180 + startAngle;

      if (end > start) {
        this.arcPaths.push({
          d: this.describeArc(100, 100, 90, start, end),
          color: level.color,
        });
      }

      prevThreshold = level.threshold;
    }

    // Optional: draw final segment to max
    if (prevThreshold < this.max) {
      const start = (prevThreshold / this.max) * 180 + startAngle;
      const end = (this.max / this.max) * 180 + startAngle;

      this.arcPaths.push({
        d: this.describeArc(100, 100, 90, start, end),
        color: this.colorLevels[this.colorLevels.length - 1]?.color || '#ccc',
      });
    }

    this.generateLabels();
  }

  generateLabels() {
    const radius = 90; // same as arc
    const offset = 8; // space between arc and text
    const centerX = 100;
    const centerY = 100;
    const startAngle = -180; // aligns with needle base
    const endAngle = 0;
    const step = 10;

    this.labels = []; // clear existing

    for (let i = 0; i <= this.max; i += step) {
      const ratio = i / this.max;
      const angle = startAngle + ratio * (endAngle - startAngle); // <-- FIXED
      const radians = (angle * Math.PI) / 180;

      const x = centerX + (radius + offset) * Math.cos(radians);
      const y = centerY + (radius + offset) * Math.sin(radians);

      this.labels.push({ x, y, value: i });
    }
  }

  describeArc(
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number
  ): string {
    const start = this.polarToCartesian(x, y, radius, endAngle);
    const end = this.polarToCartesian(x, y, radius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return [
      'M',
      start.x,
      start.y,
      'A',
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
    ].join(' ');
  }

  polarToCartesian(
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
  ) {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  }
}
