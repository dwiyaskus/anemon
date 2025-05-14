import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'anemon-input',
  imports:[CommonModule],
  templateUrl: './input.component.html',
})
export class InputComponent implements OnInit {
  @Input() classname: string = '';
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() title: string = '';
  @Input() isError: boolean = false;
  @Input() message: string = '';
  @Input() type: 'text' | 'password' = 'text';
  @Input() required: boolean = false;

  constructor() {}

  ngOnInit() {}
  @Output() eventTriggered = new EventEmitter<{
    eventName: string;
    event: Event;
  }>();

  handleEvent(event: Event, eventName: string) {
    this.eventTriggered.emit({ eventName, event });
  }
}
