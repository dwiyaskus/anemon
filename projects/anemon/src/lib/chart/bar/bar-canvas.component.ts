import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Input,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'anemon-bar',
  templateUrl: './bar-canvas.component.html',
  styleUrls: ['./bar-canvas.component.css'],
})
export class BarCanvasComponent implements AfterViewInit {
  @ViewChild('barCanvas', { static: true })
  barCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('tooltip', { static: true })
  tooltipRef!: ElementRef<HTMLDivElement>;
  @Input() labels: string[] = [];
  @Input() datasets: {
    label: string;
    data: number[];
    color: string;
    type: 'bar' | 'line';
  }[] = [];
  @Input() orientation: 'vertical' | 'horizontal' = 'vertical';
  @Input() stacked: boolean = false;
  @Input() legendPosition: 'bottom' | 'top' | 'left' | 'right' = 'bottom';
  @Input() tooltipType: 'single' | 'full' = 'full';
  @Input() withLine: boolean = false;

  private ctx!: CanvasRenderingContext2D;
  private bars: {
    x: number;
    y: number;
    width: number;
    height: number;
    tooltip: string;
    index: number;
    label: string;
    value: number;
    dataset_label: string;
    color: string;
  }[] = [];
  private visible: boolean[] = [];
  private legendBoxes: {
    x: number;
    y: number;
    width: number;
    height: number;
  }[] = [];
  private labelPositions: {
    label: string;
    x: number;
    y: number;
    index: number;
  }[] = [];
  private selectedBar: { index: number; dataset: string } | null = null;

  ngAfterViewInit() {
    this.ctx = this.barCanvas.nativeElement.getContext('2d')!;
    this.visible = this.datasets.map(() => true);
    this.resizeCanvas();
    this.animateBars();
    this.addMouseListeners();
  }

  ngOnDestroy() {
    const canvas = this.barCanvas.nativeElement;
    canvas.removeEventListener('click', this.onClick.bind(this));
    canvas.removeEventListener('mousemove', this.onMouseMove.bind(this));
  }

  @HostListener('window:resize')
   onResize() {
    this.resizeCanvas();
    this.drawBars(this.datasets.map((d) => d.data));
  }

  private resizeCanvas() {
    const canvas = this.barCanvas.nativeElement;
    canvas.width = canvas.clientWidth;
    canvas.height = 420;
  }

 private  addMouseListeners() {
    const canvas = this.barCanvas.nativeElement;
    canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    canvas.addEventListener('mouseleave', () => {
      this.tooltipRef.nativeElement.style.display = 'none';
      this.drawBars(this.datasets.map((d) => d.data));
    });

    canvas.addEventListener('click', this.onClick.bind(this));
  }

  private onMouseMove(event: MouseEvent) {
    const canvas = this.barCanvas.nativeElement;
    const tooltip = this.tooltipRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if (this.tooltipType === 'single') {
      const hovered = this.bars.find((bar) => {
        return (
          mouseX >= bar.x &&
          mouseX <= bar.x + bar.width &&
          mouseY >= bar.y &&
          mouseY <= bar.y + bar.height
        );
      });
      if (hovered) {
        tooltip.style.display = 'block';
        tooltip.style.left = `${event.clientX + 10}px`;
        tooltip.style.top = `${event.clientY + 10}px`;
        tooltip.innerHTML = `<strong>${hovered.dataset_label}</strong><br>
        <div style="display: flex; align-items: center; gap: 10px">
            <div style="width: 10px; height: 10px; background-color: ${hovered.color}; border-radius: 10px"></div>
            <div>${hovered.label}: ${hovered.value}</div>
        </div>`;
        this.barCanvas.nativeElement.style.cursor = 'pointer';
      } else {
        tooltip.style.display = 'none';
        this.barCanvas.nativeElement.style.cursor = 'default';
      }
    }

    if (this.tooltipType === 'full') {
      const groupSize = (canvas.width - 100) / this.labels.length;
      const visibleBarCount = this.datasets.filter(
        (ds, i) => ds.type !== 'line' && this.visible[i]
      ).length;

      const barWidth = this.stacked
        ? groupSize * 0.6
        : (groupSize * 0.6) / visibleBarCount;

      const group = this.labelPositions.find((pos) => {
        return (
          mouseX >= pos.x - (barWidth * visibleBarCount) / 2 &&
          mouseX <= pos.x + (barWidth * visibleBarCount) / 2
        );
      });
      if (group) {
        const index = group.index;

        // Tampilkan tooltip full
        const tooltipLines = this.datasets
          .map((ds, i) =>
            this.visible[i]
              ? ` <div style="display: flex; align-items: center; gap: 10px">
            <div style="width: 10px; height: 10px; background-color: ${ds.color}; border-radius: 10px"></div>
            <div>${ds.label}: ${ds.data[index]}</div>
        </div>
       `
              : null
          )
          .filter(Boolean)
          .join('');

        tooltip.style.display = 'block';
        tooltip.style.left = `${event.clientX + 10}px`;
        tooltip.style.top = `${event.clientY + 10}px`;
        tooltip.innerHTML = `<strong>${this.labels[index]}</strong><br>${tooltipLines}`;
        this.barCanvas.nativeElement.style.cursor = 'pointer';
      } else {
        tooltip.style.display = 'none';
        this.barCanvas.nativeElement.style.cursor = 'default';
      }
    }

    this.drawBars(this.datasets.map((d) => d.data));
  }

  private animateBars() {
    let progress = 0;
    const steps = 30;
    const originalData = this.datasets.map((d) => d.data);

    const animate = () => {
      progress++;
      const currentData = originalData.map((series) =>
        series.map((val) => val * (progress / steps))
      );
      this.drawBars(currentData);
      if (progress < steps) requestAnimationFrame(animate);
    };
    animate();
  }

  private drawBars(currentValues: number[][]) {
    const leftAxisData: number[][] = [];
    const rightAxisData: number[][] = [];

    this.datasets.forEach((ds, i) => {
      if (!this.visible[i]) return;
      if (ds.type === 'line') {
        rightAxisData.push(ds.data);
      } else {
        leftAxisData.push(ds.data);
      }
    });

    const ctx = this.ctx;
    const canvas = this.barCanvas.nativeElement;
    const width = canvas.width;
    const height = canvas.height;
    const padding = this.orientation === 'vertical' ? 70 : 100;

    // const gap = 20;

    ctx.clearRect(0, 0, width, height);
    this.bars = [];
    this.legendBoxes = [];
    const numLabels = this.labels.length;
    const numSeries = currentValues.length;

    const maxVal = this.stacked
      ? Math.max(
          ...this.labels.map((_, i) =>
            leftAxisData.reduce((sum, series) => sum + (series[i] || 0), 0)
          )
        )
      : Math.max(...leftAxisData.flat(), 1); // avoid 0

    const maxValRight = Math.max(...rightAxisData.flat(), 1);
    const tickCount = 5;
    const tickStep = Math.ceil(maxVal / tickCount);
    const ticks = Array.from({ length: tickCount + 1 }, (_, i) => i * tickStep);

    const groupSize =
      this.orientation === 'vertical'
        ? (width - padding * 2) / numLabels
        : (height - padding * 2) / numLabels;

    const linePoints: {
      color: string;
      points: { x: number; y: number }[];
      label: string;
    }[] = [];

    this.datasets.forEach((ds, sIndex) => {
      if (!this.visible[sIndex]) return;

      if (!this.withLine && ds.type === 'line') return;
      const values = currentValues[sIndex];
      const isLine = ds.type === 'line';

      values.forEach((val, i) => {
        const label = this.labels[i];
        const groupBase = padding + i * groupSize;

        const barThickness =
          this.stacked || isLine
            ? groupSize * 0.6
            : (groupSize * 0.6) / numSeries;

        const barOffset =
          this.stacked || isLine
            ? 0
            : this.datasets
                .slice(0, sIndex)
                .filter((d, j) => d.type !== 'line' && this.visible[j]).length *
              barThickness;

        if (this.orientation === 'vertical') {
          const baseX =
            groupBase +
            (groupSize -
              barThickness *
                (this.stacked || isLine ? 1 : this.datasets.length)) /
              2;
          const barHeight =
            (val / (ds.type === 'line' ? maxValRight : maxVal)) *
            (height - padding * 2);

          const prevHeight =
            this.stacked && !isLine
              ? this.datasets
                  .slice(0, sIndex)
                  .filter((d, j) => d.type !== 'line' && this.visible[j])
                  .reduce(
                    (sum, d, j) =>
                      sum +
                      ((currentValues[j][i] || 0) / maxVal) *
                        (height - padding * 2),
                    0
                  )
              : 0;

          const x = baseX + barOffset;
          const y = height - padding - barHeight - prevHeight;

          if (isLine) {
            const cx = groupBase + groupSize / 2 - 20;
            const cy = height - padding - barHeight;
            if (!linePoints[sIndex]) {
              linePoints[sIndex] = {
                color: ds.color,
                points: [],
                label: ds.label,
              };
            }
            linePoints[sIndex].points.push({ x: cx, y: cy });
            // Draw lines
            this.drawLine(ctx, linePoints);
          } else {
            const isSelected =
              this.selectedBar &&
              this.selectedBar.index === i &&
              this.selectedBar.dataset === ds.label;

            ctx.fillStyle = this.selectedBar
              ? isSelected
                ? ds.color
                : `${ds.color}26`
              : ds.color;

            // ctx.fillStyle = ds.color;
            // ctx.fillStyle = (this.highlightIndex === i) ? `${ds.color}26` : ds.color;
            // ctx.fillRect(x, y, barThickness, barHeight);
            ctx.fillRect(x, y, barThickness, barHeight);
            this.bars.push({
              x,
              y,
              width: barThickness,
              height: barHeight,
              index: i,
              label: label,
              value: val,
              dataset_label: ds.label,
              tooltip: `${label} (${ds.label}): ${val}`,
              color: ds.color,
            });
          }
        } else {
          const baseY =
            groupBase +
            (groupSize -
              barThickness *
                (this.stacked || isLine ? 1 : this.datasets.length)) /
              2;
          //   const barWidth = (val / maxVal) * (width - padding * 2);
          const barWidth =
            (val / (ds.type === 'line' ? maxValRight : maxVal)) *
            (width - padding * 2);
          const prevWidth =
            this.stacked && !isLine
              ? this.datasets
                  .slice(0, sIndex)
                  .filter((d, j) => d.type !== 'line' && this.visible[j])
                  .reduce(
                    (sum, d, j) =>
                      sum +
                      ((currentValues[j][i] || 0) / maxVal) *
                        (width - padding * 2),
                    0
                  )
              : 0;

          const y = baseY + barOffset;
          const x = padding + prevWidth;

          /**
           *
           * HORIZONTAL BAR TIDAK ADA LINE
           */

          if (!isLine) {
            const isSelected =
              this.selectedBar &&
              this.selectedBar.index === i &&
              this.selectedBar.dataset === ds.label;

            ctx.fillStyle = this.selectedBar
              ? isSelected
                ? ds.color
                : `${ds.color}26`
              : ds.color;
            // ctx.fillStyle = ds.color;
            //   ctx.fillStyle = (this.highlightIndex === sIndex) ? `${ds.color}26` : ds.color;
            ctx.fillRect(x, y, barWidth, barThickness);
            this.bars.push({
              x,
              y,
              width: barWidth,
              height: barThickness,
              index: i,
              label: label,
              value: val,
              dataset_label: ds.label,
              tooltip: `${label} (${ds.label}): ${val}`,
              color: ds.color,
            });
          }
        }
      });
    });

    // Draw labels
    this.drawLabel(ctx, height, padding, groupSize);

    // Axis ticks
    this.axisTick(ctx, ticks, height, padding, maxVal, width);

    // Label for tooltips
    this.labelPositions = this.labels.map((label, i) => {
      const groupSize = (width - padding * 2) / this.labels.length;
      const x = padding + i * groupSize + groupSize / 2;
      return { label, x, y: 0, index: i };
    });

    // Draw legend
    this.drawLegend();

    // Draw axes
    this.drawAxes(ctx, ticks, height, padding, width, maxVal);

    // right axis for vertical and line
    this.rightYAxis(ctx, maxValRight, tickCount, height, padding, width);
  }

  private drawLegend() {
    const ctx = this.ctx;
    const canvas = this.barCanvas.nativeElement;
    // Layout logic
    let startX = 0,
      startY = 0;
    let vertical = false;

    switch (this.legendPosition) {
      case 'top':
        startY = 10;
        startX = canvas.width / 2.5;
        break;
      case 'bottom':
        startY = canvas.height - 30;
        startX = canvas.width / 2.5;
        break;
      case 'right':
        startX = canvas.width - 100;
        startY = 50;
        vertical = true;
        break;
      case 'left':
        startX = 10;
        startY = 50;
        vertical = true;
        break;
    }

    let currentX = startX;
    let currentY = startY;

    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    this.datasets.forEach((ds, i) => {
      const colorBoxSize = 12;

      // Color box
      ctx.fillStyle = this.visible[i] ? ds.color : '#ccc';
      ctx.fillRect(currentX, currentY, colorBoxSize, colorBoxSize);

      // Text
      ctx.fillStyle = '#000';
      ctx.fillText(ds.label, currentX + 16, currentY + 6);

      // Store area for clicks
      this.legendBoxes[i] = {
        x: currentX,
        y: currentY,
        width: 16 + ctx.measureText(ds.label).width,
        height: colorBoxSize + 4,
      };

      if (vertical) {
        currentY += 20;
      } else {
        currentX += 16 + ctx.measureText(ds.label).width + 20;
      }
    });
  }

  private drawLabel(
    ctx: CanvasRenderingContext2D,
    height: number,
    padding: number,
    groupSize: number
  ) {
    ctx.fillStyle = '#000';
    ctx.font = '12px Arial';
    this.labels.forEach((label, i) => {
      if (this.orientation === 'vertical') {
        const x = padding + i * groupSize + groupSize / 2 - 50;
        ctx.fillText(label, x, height - padding + 20);
      } else {
        const y = padding + i * groupSize + groupSize / 2 + 5;
        ctx.fillText(label, 50, y);
      }
    });
  }

  private drawLine(
    ctx: CanvasRenderingContext2D,
    linePoints: {
      color: string;
      points: { x: number; y: number }[];
      label: string;
    }[]
  ) {
    linePoints.forEach((line, i) => {
      if (!line || !line.points.length) return;
      ctx.strokeStyle = line.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(line.points[0].x, line.points[0].y);
      for (let i = 1; i < line.points.length; i++) {
        ctx.lineTo(line.points[i].x, line.points[i].y);
      }
      ctx.stroke();
      line.points.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = line.color;
        // ctx.fillStyle = (this.highlightIndex === i) ? `${line.color}26` : line.color;
        ctx.fill();
        let lineval =
          this.datasets.find((d) => d.label === line.label)?.data[
            line.points.indexOf(p)
          ] || 0;
        // Add tooltip entry
        this.bars.push({
          x: p.x - 5,
          y: p.y - 5,
          width: 10,
          height: 10,
          index: i,
          label: line.label,
          value: lineval,
          dataset_label: this.labels[i],
          tooltip: `${line.label}: ${lineval ?? ''}`,
          color: line.color,
        });
      });
    });
  }

  private axisTick(
    ctx: CanvasRenderingContext2D,
    ticks: any[],
    height: number,
    padding: number,
    maxVal: number,
    width: number
  ) {
    ctx.fillStyle = '#000';
    ctx.font = '12px Arial';
    if (this.orientation === 'vertical') {
      ctx.textAlign = 'right';
      ticks.forEach((tick: number) => {
        const y = height - padding - (tick / maxVal) * (height - padding * 2);
        ctx.beginPath();
        ctx.moveTo(padding - 5, y);
        ctx.lineTo(padding, y);
        ctx.stroke();
        ctx.fillText(tick.toString(), padding - 10, y + 4);
      });
    } else {
      ctx.textAlign = 'center';
      ticks.forEach((tick: number) => {
        const x = padding + (tick / maxVal) * (width - padding * 2);
        ctx.beginPath();
        ctx.moveTo(x, height - padding);
        ctx.lineTo(x, height - padding + 5);
        ctx.stroke();
        ctx.fillText(tick.toString(), x, height - padding + 20);
      });
    }
  }

  private drawAxes(
    ctx: CanvasRenderingContext2D,
    ticks: any[],
    height: number,
    padding: number,
    width: number,
    maxVal: number
  ) {
    const axisGap = 5;
    ctx.strokeStyle = '#000';
    ctx.beginPath();
    if (this.orientation === 'vertical') {
      ctx.moveTo(padding - axisGap, padding);
      ctx.lineTo(padding - axisGap, height - padding);
      ctx.lineTo(width - padding + axisGap, height - padding);
    } else {
      ctx.moveTo(padding, padding - axisGap);
      ctx.lineTo(padding, height - padding + axisGap);
      ctx.lineTo(width - padding, height - padding + axisGap);
    }
    ctx.stroke();

    if (this.orientation === 'vertical') {
      ctx.fillStyle = '#000';
      ctx.textAlign = 'right';
      ctx.font = '12px Arial';

      ticks.forEach((tick) => {
        const y = height - padding - (tick / maxVal) * (height - padding * 2);
        ctx.beginPath();
        ctx.moveTo(padding - 5, y);
        ctx.lineTo(padding, y);
        ctx.stroke();

        ctx.fillText(tick.toString(), padding - 10, y + 4);
      });
    }
    if (this.orientation === 'horizontal') {
      ctx.fillStyle = '#000';
      ctx.textAlign = 'center';
      ctx.font = '12px Arial';

      ticks.forEach((tick) => {
        const x = padding + (tick / maxVal) * (width - padding * 2);
        ctx.beginPath();
        ctx.moveTo(x, height - padding);
        ctx.lineTo(x, height - padding + 5);
        ctx.stroke();

        ctx.fillText(tick.toString(), x, height - padding + 20);
      });
    }
  }

  private rightYAxis(
    ctx: CanvasRenderingContext2D,
    maxValRight: number,
    tickCount: number,
    height: number,
    padding: number,
    width: number
  ) {
    if (this.orientation === 'vertical' && this.withLine) {
      // RIGHT Y-AXIS
      ctx.textAlign = 'left';
      // setup the tick only for line(Y Axis Right)
      const tickStep = Math.ceil(maxValRight / tickCount);
      const ticks = Array.from(
        { length: tickCount + 1 },
        (_, i) => i * tickStep
      );

      ticks.forEach((tick) => {
        const y =
          height - padding - (tick / maxValRight) * (height - padding * 2);
        ctx.beginPath();
        ctx.moveTo(width - padding, y);
        ctx.lineTo(width - padding + 5, y);
        ctx.stroke();
        ctx.fillText(tick.toString(), width - padding + 10, y + 4);
      });
    }
  }

  private onClick(event: MouseEvent) {
    const rect = this.barCanvas.nativeElement.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Legend toggle
    for (let i = 0; i < this.legendBoxes.length; i++) {
      const box = this.legendBoxes[i];
      if (
        mouseX >= box.x &&
        mouseX <= box.x + box.width &&
        mouseY >= box.y &&
        mouseY <= box.y + box.height
      ) {
        this.visible[i] = !this.visible[i];
        this.drawBars(this.datasets.map((ds) => ds.data));
        return;
      }
    }

    // Bar selection
    const clickedBar = this.bars.find(
      (bar) =>
        mouseX >= bar.x &&
        mouseX <= bar.x + bar.width &&
        mouseY >= bar.y &&
        mouseY <= bar.y + bar.height
    );

    if (clickedBar) {
      const isSame =
        this.selectedBar?.index === clickedBar.index &&
        this.selectedBar?.dataset === clickedBar.dataset_label;

      this.selectedBar = isSame
        ? null
        : { index: clickedBar.index, dataset: clickedBar.dataset_label };

      this.drawBars(this.datasets.map((ds) => ds.data));
    } else {
      this.selectedBar = null;
      this.drawBars(this.datasets.map((ds) => ds.data));
    }
  }
}
