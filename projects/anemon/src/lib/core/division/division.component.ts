import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'anemon-div',
  imports:[CommonModule],
  templateUrl: './division.component.html',
})
export class DivisionComponent implements OnInit {
 @Input() classname : string = '';
 @Input() id :string = ''
  constructor() { }

  ngOnInit() {
  }

}
