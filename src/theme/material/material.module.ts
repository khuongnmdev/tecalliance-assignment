import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

const EXPORT_MODULE = [
  MatToolbarModule
]

@NgModule({
  imports: [
    CommonModule,
    ...EXPORT_MODULE,
  ],
  exports: [
    ...EXPORT_MODULE
  ]
})
export class MaterialModule { }
