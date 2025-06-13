import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  AfterViewInit,
  Input,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Slice {
  label: string;
  value: number;
  color: string;
  startAngle?: number;
  endAngle?: number;
  offsetX?: number;
  offsetY?: number;
  hidden?: boolean;
  selected?: boolean;
}

@Component({
  selector: 'anemon-pie',
  imports: [CommonModule, FormsModule],
  templateUrl: './pie-donut.component.html',
  styleUrls: ['./pie-donut.component.css'],
})
export class PieComponent implements AfterViewInit, OnInit {
  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('tooltip', { static: true })
  tooltipRef!: ElementRef<HTMLDivElement>;

  @Input() width?: number;
  @Input() height?: number;
  @Input() donut?: boolean;
  @Input() radius: number = 150;
  @Input() innerRadius: number = 120;
  @Input() innerText: string = '';
  @Input() fontInnerText: number = 18; // selalu dalam px
  @Input() data: Slice[] = [];
  @Input() legendPosition:
    | 'left'
    | 'right'
    | 'top left'
    | 'top right'
    | 'top'
    | 'bottom left'
    | 'bottom right'
    | 'bottom' = 'left';
  @Input() legendOrientation: 'vertical' | 'horizontal' = 'vertical';
  private slices: Slice[] = [];
  private selectedSliceIndex: number | null = null;
  private ctx!: CanvasRenderingContext2D;
  private centerX = 250;
  private centerY = 250;
  private total = 0;
  public containerCanvas: any;
  private hoveredSliceIndex: number | null = null;

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    const container = canvas.parentElement!;
    this.containerCanvas = container;
    // Jika tidak disetel manual, ambil ukuran dari container
    const computedWidth = this.width ?? container.clientWidth;
    const computedHeight = this.height ?? container.clientHeight;
    // Set canvas element's width and height attributes
    canvas.width = computedWidth;
    canvas.height = computedHeight;
    this.ctx = canvas.getContext('2d')!;
    this.centerX = canvas.width / 2;
    this.centerY = canvas.height / 2;
    this.drawChart();
  }
  ngOnInit() {
    let obj = [];
    for (let index = 0; index < this.data.length; index++) {
      const element = this.data[index];
      obj.push({ ...element, hidden: false });
    }

    this.data = obj;
  }

  drawChart() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, Number(this.width), Number(this.height));
    let startAngle = 0;
    this.slices = [];
    this.total = this.data
      .filter((d) => d.hidden === false)
      .reduce((sum, d) => sum + d.value, 0);

    this.data.forEach((d, i) => {
      if (d.hidden) return;
      const sliceAngle = (d.value / this.total) * 2 * Math.PI;
      const endAngle = startAngle + sliceAngle;
      const midAngle = (startAngle + endAngle) / 2;
      const offset = this.selectedSliceIndex === i ? 10 : 0;
      const offsetX = Math.cos(midAngle) * offset;
      const offsetY = Math.sin(midAngle) * offset;

      // Apply opacity to other slices if a slice is selected
      const selected =
        this.selectedSliceIndex !== null && this.selectedSliceIndex !== i;

      const isHovered = this.hoveredSliceIndex === i;

      // Tambahkan efek highlight jika sedang di-hover
      if (isHovered) {
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      }

      // Draw slice
      ctx.beginPath();
      ctx.moveTo(this.centerX + offsetX, this.centerY + offsetY);
      ctx.arc(
        this.centerX + offsetX,
        this.centerY + offsetY,
        this.radius,
        startAngle,
        endAngle
      );
      ctx.lineTo(this.centerX + offsetX, this.centerY + offsetY);
      ctx.fillStyle = d.color;
      ctx.globalAlpha = selected ? 0.2 : 1;
      ctx.fill();

      this.slices.push({
        ...d,
        startAngle,
        endAngle,
        offsetX,
        offsetY,
        selected,
      });
      startAngle = endAngle;
      if (isHovered) {
        ctx.restore(); // remove shadow after drawing slice
      }
    });

    // Donut hole
    if (this.donut) {
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(this.centerX, this.centerY, this.innerRadius, 0, 2 * Math.PI);
      ctx.fillStyle = '#fff';
      ctx.fill();

      // 🧠 Draw center text
      ctx.globalAlpha = 1; // pastikan tidak transparan
      ctx.fillStyle = '#000';
      ctx.font = `bold ${this.fontInnerText}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        this.innerText ? this.innerText : `${this.total}`,
        this.centerX,
        this.centerY
      );
    }

    ctx.globalAlpha = 1; // pastikan tidak transparan
    this.slices.forEach((slice) => {
      const midAngle = (slice.startAngle! + slice.endAngle!) / 2;

      const fromX =
        this.centerX + slice.offsetX! + this.radius * Math.cos(midAngle);
      const fromY =
        this.centerY + slice.offsetY! + this.radius * Math.sin(midAngle);

      // Tentukan arah label: kiri (-1) atau kanan (1)
      const direction =
        midAngle > Math.PI / 2 && midAngle < (3 * Math.PI) / 2 ? -1 : 1;

      // Diagonal keluar dari slice
      const diagLength = 35;
      const diagX = fromX + diagLength * Math.cos(midAngle);
      const diagY = fromY + diagLength * Math.sin(midAngle);

      // Horizontal siku ke kanan atau kiri
      const horizX = diagX + direction * 25;
      const horizY = diagY;

      // Posisi label
      const labelX = horizX + (direction === -1 ? -20 : 10);
      const labelY = horizY;

      // Draw leader line (2 segmen: diagonal + horizontal)
      ctx.strokeStyle = slice.selected ? '#3333' : slice.color;
      ctx.beginPath();
      ctx.moveTo(fromX, fromY); // titik dari pie
      ctx.lineTo(diagX, diagY); // diagonal keluar
      ctx.lineTo(horizX, horizY); // siku horizontal
      ctx.stroke();

      // Draw label
      ctx.fillStyle = slice.selected ? '#3333' : '#333';
      ctx.font = '14px sans-serif';
      ctx.fillText(slice.label, labelX, labelY);
    });
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const dx = x - this.centerX;
    const dy = y - this.centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);
    const normAngle = angle >= 0 ? angle : 2 * Math.PI + angle;

    const tooltip = this.tooltipRef.nativeElement;
    let found = false;
    let hoveredIndex: number | null = null;

    this.slices.forEach((slice, index) => {
      if (
        dist >= this.innerRadius &&
        dist <= this.radius &&
        normAngle >= slice.startAngle! &&
        normAngle <= slice.endAngle!
      ) {
        tooltip.style.display = 'block';
        tooltip.style.left = `${event.clientX + 10}px`;
        tooltip.style.top = `${event.clientY + 10}px`;
        tooltip.textContent = `${slice.label}: ${slice.value}`;
        hoveredIndex = index;
        found = true;
      }
    });

    // Show/hide tooltip
    if (!found) {
      tooltip.style.display = 'none';
    }

    // Change cursor style
    this.canvasRef.nativeElement.style.cursor = found ? 'pointer' : 'default';

    // Update hovered slice
    if (this.hoveredSliceIndex !== hoveredIndex) {
      this.hoveredSliceIndex = hoveredIndex;
      this.drawChart(); // Redraw to show highlight
    }
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const dx = x - this.centerX;
    const dy = y - this.centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);
    const normAngle = angle >= 0 ? angle : 2 * Math.PI + angle;

    this.slices.forEach((slice, i) => {
      if (
        dist >= this.innerRadius &&
        dist <= this.radius &&
        normAngle >= slice.startAngle! &&
        normAngle <= slice.endAngle!
      ) {
        this.selectedSliceIndex = this.selectedSliceIndex === i ? null : i;
        this.drawChart();
      }
    });
  }

  // Event handling when a legend item is clicked
  toggleSliceVisibility(index: number) {
    this.data[index].hidden = !this.data[index].hidden;
    this.drawChart();
  }
}
