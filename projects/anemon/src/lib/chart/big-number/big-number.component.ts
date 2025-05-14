import { CommonModule } from '@angular/common';
import { Component, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'anemon-big-number',
  imports:[CommonModule],
  templateUrl: 'big-number.component.html',
  styleUrls: ['big-number.component.css'],
})
export class BigNumberComponent implements AfterViewInit {
  @Input() number: number = 0;
  @Input() label: string = '';
  @Input() size_number: number = 0;
  @Input() size_label: number = 0;
  @Input() position: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @Input() label_color: string = '';
  @Input() number_color: string = '';

  ngAfterViewInit() {}
}
