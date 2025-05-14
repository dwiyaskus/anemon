import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'anemon-text',
  imports:[CommonModule],
  templateUrl: './label.component.html',
})
export class LabelComponent implements OnInit {
  @Input() classname = '';
  @Input() title = '';
  constructor() {}

  ngOnInit() {}
}
