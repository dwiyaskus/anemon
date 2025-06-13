import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarChartComponent } from './chart/bar/bar.component';
import { BarCanvasComponent } from './chart/bar/bar-canvas.component';
import { ButtonComponent } from '../lib/core/button/button.component';
import { CheckboxComponent } from './core/checkbox/checkbox.component';
import { DivisionComponent } from './core/division/division.component';
import { InputComponent } from './core/input/input.component';
import { LabelComponent } from './core/label/label.component';
import { SelectComponent } from './core/select/select.component';
import { PieComponent } from './chart/pie-donut/pie-donut.component';
import { BigNumberComponent } from './chart/big-number/big-number.component';
import { LineComponent } from './chart/line/line.component';

@NgModule({
  imports: [
    CommonModule,
    BarChartComponent,
    ButtonComponent,
    CheckboxComponent,
    DivisionComponent,
    InputComponent,
    LabelComponent,
    SelectComponent,
    BigNumberComponent,
    PieComponent,
    LineComponent,
    BarCanvasComponent
  ],
  exports: [
    BarChartComponent,
    ButtonComponent,
    CheckboxComponent,
    DivisionComponent,
    InputComponent,
    LabelComponent,
    SelectComponent,
    BigNumberComponent,
    PieComponent,
    LineComponent,
    BarCanvasComponent
  ]
})
export class AnemonModule {}
