import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'anemon-select',
  imports:[CommonModule],
  templateUrl: './select.component.html',
})
export class SelectComponent implements OnInit {
  @Input() options: Array<any> = [];
  @Input() value: string = '';
  @Input() title: string = '';
  @Input() classname: string = '';
  @Input() id: string = '';
  @Input() name: string = '';

  @Output() eventTriggered = new EventEmitter<{
    event: string;
    originalEvent: Event;
  }>();

  constructor() {}

  ngOnInit() {}
  handleEvent(event: Event, eventName: string): void {
    this.eventTriggered.emit({ event: eventName, originalEvent: event });
  }
}
