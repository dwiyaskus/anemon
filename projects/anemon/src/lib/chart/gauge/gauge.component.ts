import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

interface ColorLevel {
  threshold: number;
  color: string;
}

@Component({
  selector: 'app-gauge',
   imports:[CommonModule],
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.css']
})
export class GaugeComponent implements OnChanges {
 @Input() value = 0;
  @Input() max = 100;
  @Input() label = '';
  @Input() colorLevels: { threshold: number; color: string }[] = [];

  rotation = -90;
  arcPaths: { d: string; color: string }[] = [];
  needleColor = '#0288d1';

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
    // fallback color
    this.needleColor = this.colorLevels[this.colorLevels.length - 1]?.color || '#0288d1';
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
}


  // polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  //   const rad = (angleDeg * Math.PI) / 180;
  //   return {
  //     x: cx + r * Math.cos(rad),
  //     y: cy + r * Math.sin(rad),
  //   };
  // }

  // describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number): string {
  //   const start = this.polarToCartesian(x, y, radius, endAngle);
  //   const end = this.polarToCartesian(x, y, radius, startAngle);
  //   const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  //   return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
  // }
  polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg - 90) * Math.PI / 180; // subtract 90 to start from left
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number): string {
  const start = this.polarToCartesian(x, y, radius, endAngle);
  const end = this.polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}

}
