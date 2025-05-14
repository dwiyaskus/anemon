import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'anemon-checkbox',
  imports:[CommonModule],
  templateUrl: './checkbox.component.html',
})
export class CheckboxComponent implements OnInit {
  @Input() title: string = '';
  @Input() classname: string = '';
  @Input() id: string = '';
  @Input() name: string = '';
  @Output() click = new EventEmitter<Event>();
  @Output() change = new EventEmitter<Event>();
  @Output() focus = new EventEmitter<Event>();
  @Output() blur = new EventEmitter<Event>();
  constructor() {}

  ngOnInit() {}
}
