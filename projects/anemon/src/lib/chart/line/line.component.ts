import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'anemon-line',
    imports:[CommonModule],
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css'],
})
export class LineComponent implements OnInit {
  @Input() data: {
    name: string;
    points: { x: number | null; y: number | null }[];
    color: string;
  }[] = [];
  @Input() width = 500;
  @Input() height = 300;
  @Input() margin = { top: 20, right: 50, bottom: 50, left: 50 };

  // scaledData: {
  //   name: string;
  //   points: { x: number; y: number }[];
  //   pointsString: string;
  //   color: string;
  // }[] = [];
  maxX = 0;
  maxY = 0;
  xTicks: number[] = [];
  xLabel: any[] = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
  ];
  yTicks: number[] = [];

  ngOnInit() {
    this.findWContainerSize();
    // Filter out null points and determine the maximum X and Y values
    const validPoints = this.data.flatMap((dataset) =>
      dataset.points.filter((p) => p.x !== null && p.y !== null)
    );
    this.maxX = Math.max(...validPoints.map((p) => p.x as number));
    this.maxY = Math.max(...validPoints.map((p) => p.y as number));

    this.scaleData();
    this.generateTicks();
  }

  scaledData: {
    name: string;
    segments: { pointsString: string; color: string }[];
  }[] = [];

  private scaleData() {
    const innerWidth = this.width - this.margin.left - this.margin.right;
    const innerHeight = this.height - this.margin.top - this.margin.bottom;

    this.scaledData = this.data.map((dataset) => {
      const segments: { pointsString: string; color: string }[] = [];
      let currentSegment: { x: number; y: number }[] = [];

      dataset.points.forEach((point) => {
        if (point.x === null || point.y === null) {
          // End the current segment when encountering a null point
          if (currentSegment.length) {
            const pointsString = currentSegment
              .map((p) => `${p.x},${p.y}`)
              .join(' ');
            segments.push({ pointsString, color: dataset.color });
            currentSegment = [];
          }
        } else {
          // Scale the point and add it to the current segment
          const scaledPoint = {
            x:
              this.margin.left + ((point.x as number) / this.maxX) * innerWidth,
            y:
              this.margin.top +
              innerHeight -
              ((point.y as number) / this.maxY) * innerHeight, // Flip Y-axis
          };
          currentSegment.push(scaledPoint);
        }
      });

      // Add the last segment if it has points
      if (currentSegment.length) {
        const pointsString = currentSegment
          .map((p) => `${p.x},${p.y}`)
          .join(' ');
        segments.push({ pointsString, color: dataset.color });
      }

      return { name: dataset.name, segments };
    });
  }

  // private scaleData() {
  //   const innerWidth = this.width - this.margin.left - this.margin.right;
  //   const innerHeight = this.height - this.margin.top - this.margin.bottom;

  //   this.scaledData = this.data.map((dataset) => {
  //     const scaledPoints = dataset.points
  //       // .filter((point) => point.x !== null && point.y !== null)
  //       .map((point) => ({
  //         x: this.margin.left + ((point.x as number) / this.maxX) * innerWidth,
  //         y:
  //           this.margin.top +
  //           innerHeight -
  //           ((point.y as number) / this.maxY) * innerHeight, // Flip Y-axis
  //       }));
  //     return {
  //       name: dataset.name,
  //       points: scaledPoints,
  //       pointsString: scaledPoints.map((p) => `${p.x},${p.y}`).join(' '),
  //       color: dataset.color,
  //     };
  //     // const hasNull = dataset.points.some(point => point.x === null || point.y === null);

  //     // const scaledPoints = dataset.points
  //     //   .filter(point => point.x !== null && point.y !== null)
  //     //   .map(point => ({
  //     //     x: this.margin.left + ((point.x as number) / this.maxX) * innerWidth,
  //     //     y: this.margin.top + innerHeight - ((point.y as number) / this.maxY) * innerHeight // Flip Y-axis
  //     //   }));

  //     // return {
  //     //   name: dataset.name,
  //     //   points: scaledPoints,
  //     //   pointsString: scaledPoints.map(p => `${p.x},${p.y}`).join(' '),
  //     //   hasNull
  //     // };
  //   });
  // }

  private generateTicks() {
    const numTicks = 5; // Number of ticks for each axis
    this.xTicks = Array.from(
      { length: numTicks + 1 },
      (_, i) => (i * this.maxX) / numTicks
    );
    this.yTicks = Array.from(
      { length: numTicks + 1 },
      (_, i) => (i * this.maxY) / numTicks
    );
    // Use dataset names as X-axis labels
    // this.xLabel = this.data.map((dataset) => dataset.name);
  }

  private findWContainerSize = () => {
    const elements = document.getElementsByClassName('chart-container');
    if (elements.length > 0) {
      const container = elements[0] as HTMLElement;
      this.width = container.clientWidth;
      // this.height = container.clientHeight;
      this.height = 300;
    }
  };
}
