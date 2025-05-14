import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'anemon-button',
  imports:[CommonModule],
  templateUrl: './button.component.html',
})
export class ButtonComponent implements OnInit {
  @Input() classname = '';
  @Input() label: string = '';
  @Input() disabled = false;
  @Output() click = new EventEmitter<MouseEvent>();
  @Output() dblclick = new EventEmitter<MouseEvent>();
  @Output() focus = new EventEmitter<FocusEvent>();
  @Output() blur = new EventEmitter<FocusEvent>();
  @Output() mouseover = new EventEmitter<MouseEvent>();
  @Output() mouseout = new EventEmitter<MouseEvent>();
  @Output() keydown = new EventEmitter<KeyboardEvent>();
  @Output() keyup = new EventEmitter<KeyboardEvent>();

  handleClick(event: MouseEvent) {
    this.click.emit(event);
  }
  constructor() {}

  ngOnInit() {}
}
