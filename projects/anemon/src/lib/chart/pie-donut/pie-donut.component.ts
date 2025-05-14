import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'anemon-pie',
  imports:[CommonModule],
  templateUrl: 'pie-donut.component.html',
  styleUrls: ['pie-donut.component.css'],
})
export class PieComponent implements AfterViewInit {
  @Input() data: number[] = [];
  @Input() labels: string[] = [];
  @Input() colors: string[] = [];
  @Input() label: string = ''; // Central label
  @Input() legendPosition: 'top' | 'bottom' | 'left' | 'right' = 'bottom'; // Legend position
  @Input() type: 'pie' | 'donut' = 'pie';
  @Input() radius: number = 100;
  @Input() allowTooltip: boolean = true;
  @Input() chartOnClick: boolean = false;

  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  ngAfterViewInit() {
    if (this.type === 'donut') {
      this.drawDonutChart();
    } else {
      this.drawPieChart();
    }
  }

  private drawDonutChart() {
    const canvas = this.canvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const total = this.data.reduce((sum, value) => sum + value, 0);
    let startAngle = 0;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 200;
    const innerRadius = this.radius; // For the donut effect

    // Draw each segment
    this.data.forEach((value, index) => {
      const sliceAngle = (value / total) * 2 * Math.PI;

      // Draw the outer pie slice
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.arc(
        centerX,
        centerY,
        innerRadius,
        startAngle + sliceAngle,
        startAngle,
        true
      );
      ctx.closePath();

      // Fill with color
      ctx.fillStyle = this.colors[index];
      ctx.fill();

      startAngle += sliceAngle;
    });
  }

  // private drawPieChart() {
  //   const canvas = this.canvas.nativeElement;
  //   const ctx = canvas.getContext('2d');
  //   if (!ctx) return;

  //   const total = this.data.reduce((sum, value) => sum + value, 0);
  //   let startAngle = 0;

  //   this.data.forEach((value, index) => {
  //     const sliceAngle = (value / total) * 2 * Math.PI;

  //     // Draw the slice
  //     ctx.beginPath();
  //     ctx.moveTo(200, 200); // Center of the pie chart
  //     ctx.arc(200, 200, 200, startAngle, startAngle + sliceAngle);
  //     ctx.closePath();

  //     // Fill with color
  //     ctx.fillStyle = this.colors[index];
  //     ctx.fill();

  //     // Update the start angle
  //     startAngle += sliceAngle;
  //   });

  //   // Add labels
  //   startAngle = 0;
  //   this.data.forEach((value, index) => {
  //     const sliceAngle = (value / total) * 2 * Math.PI;
  //     const labelX = 200 + Math.cos(startAngle + sliceAngle / 2) * 120;
  //     const labelY = 200 + Math.sin(startAngle + sliceAngle / 2) * 120;

  //     ctx.fillStyle = '#000';
  //     ctx.font = '14px Arial';
  //     ctx.fillText(this.labels[index], labelX - 20, labelY);

  //     startAngle += sliceAngle;
  //   });
  // }

  private drawPieChart() {
    const canvas = this.canvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const total = this.data.reduce((sum, value) => sum + value, 0);
    let startAngle = 0;
    const centerX = 200,
      centerY = 200,
      radius = 200;
    let selectedSlice: number | null = null;

    const slices: {
      id: number;
      startAngle: number;
      endAngle: number;
      label: string;
      color: string;
      value: number;
    }[] = [];

    const drawSlices = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      startAngle = 0;

      // Assuming canvas dimensions are 400x400, with the center at (centerX, centerY)
      const centerX = 200;
      const centerY = 200;
      const radius = 100; // Set a reasonable radius for your pie chart

      this.data.forEach((value, index) => {
        const sliceAngle = (value / total) * 2 * Math.PI;
        const isSelected = selectedSlice === index;
        const offset = isSelected ? 5 : 0;

        // Calculate position of slice
        const midAngle = startAngle + sliceAngle / 2;
        const offsetX = Math.cos(midAngle) * offset;
        const offsetY = Math.sin(midAngle) * offset;

        let color = this.colors[index];
        slices[index] = {
          id: index,
          startAngle,
          endAngle: startAngle + sliceAngle,
          label: this.labels[index],
          color: selectedSlice === null || isSelected ? color : `${color}26`,
          value,
        };

        // Draw slice
        ctx.beginPath();
        ctx.moveTo(centerX + offsetX, centerY + offsetY);
        ctx.arc(
          centerX + offsetX,
          centerY + offsetY,
          radius,
          startAngle,
          startAngle + sliceAngle
        );
        ctx.closePath();

        ctx.fillStyle =
          selectedSlice === null || isSelected ? color : `${color}26`;
        ctx.fill();

        startAngle += sliceAngle;
      });

      // Add labels with lines
      startAngle = 0;
      this.data.forEach((value, index) => {
        const sliceAngle = (value / total) * 2 * Math.PI;

        // Adjust label position to ensure it's within the canvas boundaries
        const labelDistance = radius + 20; // Distance from the center to the label

        // Calculate the label position
        let labelX =
          centerX + Math.cos(startAngle + sliceAngle / 2) * labelDistance;
        let labelY =
          centerY + Math.sin(startAngle + sliceAngle / 2) * labelDistance;

        // Ensure the label stays within the canvas (optional, but a good safety measure)
        const canvasPadding = 10; // Padding from the edge of the canvas
        const maxX = 400 - canvasPadding;
        const maxY = 400 - canvasPadding;
        const minX = canvasPadding;
        const minY = canvasPadding;

        // Adjust label position if it goes beyond canvas bounds
        if (labelX > maxX) labelX = maxX;
        if (labelX < minX) labelX = minX;
        if (labelY > maxY) labelY = maxY;
        if (labelY < minY) labelY = minY;

        // Draw line from slice to label
        const lineStartX =
          centerX + Math.cos(startAngle + sliceAngle / 2) * radius;
        const lineStartY =
          centerY + Math.sin(startAngle + sliceAngle / 2) * radius;

        ctx.beginPath();
        ctx.moveTo(lineStartX, lineStartY); // Starting point (slice center)
        ctx.lineTo(labelX, labelY); // Ending point (label position)
        ctx.strokeStyle = '#000'; // Line color (black)
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw label
        ctx.fillStyle = '#000';
        ctx.font = '14px Arial';

        // Calculate text width and adjust position for centering the text
        const textWidth = ctx.measureText(this.labels[index]).width;
        ctx.fillText(this.labels[index], labelX - textWidth / 2, labelY); // Adjust text positioning to center it

        startAngle += sliceAngle;
      });

      // this.data.forEach((value, index) => {
      //   const sliceAngle = (value / total) * 2 * Math.PI;
      //   const isSelected = selectedSlice === index;
      //   const offset = isSelected ? 5 : 0;

      //   // Calculate position of slice
      //   const midAngle = startAngle + sliceAngle / 2;
      //   const offsetX = Math.cos(midAngle) * offset;
      //   const offsetY = Math.sin(midAngle) * offset;

      //   let color = this.colors[index];
      //   slices[index] = {
      //     id: index,
      //     startAngle,
      //     endAngle: startAngle + sliceAngle,
      //     label: this.labels[index],
      //     color: selectedSlice === null || isSelected ? color : `${color}26`,
      //     value,
      //   };

      //   // Draw slice
      //   ctx.beginPath();
      //   ctx.moveTo(centerX + offsetX, centerY + offsetY);
      //   ctx.arc(centerX + offsetX, centerY + offsetY, radius, startAngle, startAngle + sliceAngle);
      //   ctx.closePath();

      //   ctx.fillStyle = selectedSlice === null || isSelected ? color : `${color}26`;
      //   ctx.fill();

      //   startAngle += sliceAngle;
      // });

      // // Add labels with lines
      // startAngle = 0;
      // this.data.forEach((value, index) => {
      //   const sliceAngle = (value / total) * 2 * Math.PI;

      //   // Calculate the position for the label outside the chart
      //   const labelX = centerX + Math.cos(startAngle + sliceAngle / 2) * (radius + 20);  // Added 20 for distance
      //   const labelY = centerY + Math.sin(startAngle + sliceAngle / 2) * (radius + 20);  // Added 20 for distance

      //   // Draw line from slice to label
      //   const lineStartX = centerX + Math.cos(startAngle + sliceAngle / 2) * radius;
      //   const lineStartY = centerY + Math.sin(startAngle + sliceAngle / 2) * radius;

      //   ctx.beginPath();
      //   ctx.moveTo(lineStartX, lineStartY);  // Starting point (slice center)
      //   ctx.lineTo(labelX, labelY);  // Ending point (label position)
      //   ctx.strokeStyle = '#000';  // Line color (black)
      //   ctx.lineWidth = 1;
      //   ctx.stroke();

      //   // Draw label
      //   ctx.fillStyle = '#000';
      //   ctx.font = '14px Arial';
      //   ctx.fillText(this.labels[index], labelX - 20, labelY);  // Adjust text positioning if needed

      //   startAngle += sliceAngle;
      // });

      // this.data.forEach((value, index) => {
      //   const sliceAngle = (value / total) * 2 * Math.PI;
      //   const isSelected = selectedSlice === index;
      //   const offset = isSelected ? 5 : 0;

      //   // Hitung posisi tengah slice
      //   const midAngle = startAngle + sliceAngle / 2;
      //   const offsetX = Math.cos(midAngle) * offset;
      //   const offsetY = Math.sin(midAngle) * offset;

      //   let color = this.colors[index];
      //   // Simpan informasi slice
      //   slices[index] = {
      //     id: index,
      //     startAngle,
      //     endAngle: startAngle + sliceAngle,
      //     label: this.labels[index],
      //     color: selectedSlice === null || isSelected ? color : `${color}26`,
      //     value,
      //   };

      //   // Gambar slice
      //   ctx.beginPath();
      //   ctx.moveTo(centerX + offsetX, centerY + offsetY);
      //   ctx.arc(
      //     centerX + offsetX,
      //     centerY + offsetY,
      //     radius,
      //     startAngle,
      //     startAngle + sliceAngle
      //   );
      //   ctx.closePath();

      //   ctx.fillStyle =
      //     selectedSlice === null || isSelected ? color : `${color}26`;
      //   ctx.fill();

      //   startAngle += sliceAngle;
      // });

      // // Add labels
      // startAngle = 0;
      // this.data.forEach((value, index) => {
      //   const sliceAngle = (value / total) * 2 * Math.PI;
      //   const labelX = 200 + Math.cos(startAngle + sliceAngle / 2) * 120;
      //   const labelY = 200 + Math.sin(startAngle + sliceAngle / 2) * 120;
      //   ctx.fillStyle = '#000';
      //   ctx.font = '14px Arial';
      //   ctx.fillText(this.labels[index], labelX - 20, labelY);
      //   startAngle += sliceAngle;
      // });
    };

    // Add tooltip element (initially hidden)
    const tooltip = document.createElement('div');

    if (this.allowTooltip) {
      canvas.addEventListener('mousemove', (event) => {
        // Check if the click is outside the canvas
        if (!canvas.contains(event.target as Node)) {
          tooltip.style.display = 'none'; // Hide the tooltip if clicked outside
          return;
        }
        tooltip.style.position = 'absolute';
        tooltip.style.padding = '5px';
        tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        tooltip.style.color = 'white';
        tooltip.style.borderRadius = '4px';
        tooltip.style.display = 'none'; // Hidden by default
        document.body.appendChild(tooltip);
        const rect = canvas.getBoundingClientRect();
        // const mouseX = event.clientX - rect.left;
        // const mouseY = event.clientY - rect.top;
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        // Check if the click is inside the pie chart
        const dist = Math.sqrt(
          Math.pow(mouseX - 200, 2) + Math.pow(mouseY - 200, 2)
        );
        if (dist > 200 || dist < 0) return; // Click is outside the pie chart

        // Determine which slice was clicked
        const angle = Math.atan2(mouseY - 200, mouseX - 200);
        const normalizedAngle = angle < 0 ? angle + 2 * Math.PI : angle;

        for (const slice of slices) {
          if (
            normalizedAngle >= slice.startAngle &&
            normalizedAngle <= slice.endAngle
          ) {
            // Show tooltip near the clicked slice
            const tooltipX =
              200 +
              Math.cos(
                slice.startAngle + (slice.endAngle - slice.startAngle) / 2
              ) *
                150;
            const tooltipY =
              200 +
              Math.sin(
                slice.startAngle + (slice.endAngle - slice.startAngle) / 2
              ) *
                150;

            tooltip.style.left = `${event.clientX}px`;
            tooltip.style.top = `${event.clientY}px`;
            tooltip.style.display = 'block'; // Show tooltip

            tooltip.textContent = `${slice.label}: ${slice.value}`;
            break;
          }
        }
      });
    }

    if (this.chartOnClick) {
      // Tambahkan event listener untuk klik
      canvas.addEventListener('click', (event: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const dx = mouseX - centerX;
        const dy = mouseY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);
        const normalizedAngle = angle >= 0 ? angle : angle + 2 * Math.PI;

        if (distance <= radius) {
          for (const slice of slices) {
            if (
              normalizedAngle >= slice.startAngle &&
              normalizedAngle < slice.endAngle
            ) {
              selectedSlice = selectedSlice === slice.id ? null : slice.id;
              drawSlices();
              break;
            }
          }
        }
      });
    }

    drawSlices();
  }
}


// other solution

// import { Component, ElementRef, AfterViewInit, ViewChild, HostListener } from '@angular/core';

// @Component({
//   selector: 'app-pie-chart',
//   templateUrl: './pie-chart.component.html',
//   styleUrls: ['./pie-chart.component.css']
// })
// export class PieChartComponent implements AfterViewInit {

//   @ViewChild('pieCanvas', { static: false }) pieCanvas: ElementRef;
//   ctx: CanvasRenderingContext2D;
  
//   data: number[] = [40, 30, 20, 10];  // Pie chart data
//   labels: string[] = ['Label 1', 'Label 2', 'Label 3', 'Label 4'];  // Labels for slices
//   colors: string[] = ['#FF6347', '#3CB371', '#4682B4', '#FFD700'];  // Slice colors
//   total: number = this.data.reduce((sum, value) => sum + value, 0);  // Total sum of values
  
//   constructor() { }

//   ngAfterViewInit() {
//     this.ctx = this.pieCanvas.nativeElement.getContext('2d');
//     this.drawPieChart();
//   }

//   drawPieChart() {
//     // Get the parent container's size
//     const container = this.pieCanvas.nativeElement.parentElement;
//     const width = container.clientWidth;
//     const height = container.clientHeight;
//     this.pieCanvas.nativeElement.width = width;
//     this.pieCanvas.nativeElement.height = height;

//     // Calculate the center and radius of the pie chart
//     const centerX = width / 2;
//     const centerY = height / 2;
//     const radius = Math.min(width, height) / 3;  // Set radius as one-third of the smallest dimension

//     let startAngle = 0;

//     // Clear the canvas before redrawing
//     this.ctx.clearRect(0, 0, width, height);

//     // Draw slices
//     this.data.forEach((value, index) => {
//       const sliceAngle = (value / this.total) * 2 * Math.PI;
//       const isSelected = false;
//       const offset = isSelected ? 5 : 0;

//       const midAngle = startAngle + sliceAngle / 2;
//       const offsetX = Math.cos(midAngle) * offset;
//       const offsetY = Math.sin(midAngle) * offset;

//       // Draw slice
//       this.ctx.beginPath();
//       this.ctx.moveTo(centerX + offsetX, centerY + offsetY);
//       this.ctx.arc(centerX + offsetX, centerY + offsetY, radius, startAngle, startAngle + sliceAngle);
//       this.ctx.closePath();

//       this.ctx.fillStyle = this.colors[index];
//       this.ctx.fill();

//       startAngle += sliceAngle;
//     });

//     // Add labels with lines
//     startAngle = 0;
//     this.data.forEach((value, index) => {
//       const sliceAngle = (value / this.total) * 2 * Math.PI;

//       const labelDistance = radius + 20;
//       const labelX = centerX + Math.cos(startAngle + sliceAngle / 2) * labelDistance;
//       const labelY = centerY + Math.sin(startAngle + sliceAngle / 2) * labelDistance;

//       // Draw line from slice to label
//       const lineStartX = centerX + Math.cos(startAngle + sliceAngle / 2) * radius;
//       const lineStartY = centerY + Math.sin(startAngle + sliceAngle / 2) * radius;

//       this.ctx.beginPath();
//       this.ctx.moveTo(lineStartX, lineStartY);
//       this.ctx.lineTo(labelX, labelY);
//       this.ctx.strokeStyle = '#000';
//       this.ctx.lineWidth = 1;
//       this.ctx.stroke();

//       // Draw label
//       this.ctx.fillStyle = '#000';
//       this.ctx.font = '14px Arial';

//       const textWidth = this.ctx.measureText(this.labels[index]).width;
//       this.ctx.fillText(this.labels[index], labelX - textWidth / 2, labelY);

//       startAngle += sliceAngle;
//     });
//   }

//   // Redraw the pie chart when the window is resized
//   @HostListener('window:resize', ['$event'])
//   onResize(event) {
//     this.drawPieChart();
//   }
// }
