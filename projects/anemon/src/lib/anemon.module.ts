// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { AnemonComponent } from './anemon.component';
// import { PlankComponent } from './plank.component';

// @NgModule({
//   declarations: [AnemonComponent, PlankComponent],
//   imports: [BrowserModule],
//   bootstrap: [],
//   exports: [AnemonComponent, PlankComponent],
// })
// export class AnemonModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { AnemonComponent } from './anemon.component';
import { BarChartComponent } from './chart/bar/bar.component';
import { ButtonComponent } from '../lib/core/button/button.component';
import { CheckboxComponent } from './core/checkbox/checkbox.component';
import { DivisionComponent } from './core/division/division.component';
import { InputComponent } from './core/input/input.component';
import { LabelComponent } from './core/label/label.component';
import { SelectComponent } from './core/select/select.component';
import { PieComponent } from './chart/pie-donut/pie-donut.component';
import { BigNumberComponent } from './chart/big-number/big-number.component';

@NgModule({
  imports: [
    CommonModule,
    // AnemonComponent,  
    BarChartComponent,
    ButtonComponent,
    CheckboxComponent,
    DivisionComponent,
    InputComponent,
    LabelComponent,
    SelectComponent,
    BigNumberComponent,
    PieComponent
  ],
  exports: [
    // AnemonComponent,
    BarChartComponent,
    ButtonComponent,
    CheckboxComponent,
    DivisionComponent,
    InputComponent,
    LabelComponent,
    SelectComponent,
    BigNumberComponent,
    PieComponent
  ]
})
export class AnemonModule {}
