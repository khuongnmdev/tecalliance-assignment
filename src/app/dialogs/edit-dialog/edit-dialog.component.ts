import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToDo } from 'src/app/models/todo';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  public titleFormControl = new FormControl('', [Validators.required, Validators.maxLength(250)]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ToDo,
    public dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) { }

  ngOnInit() {
    this.titleFormControl.setValue(this.data.title);
  }

  protected confirm() {
    this.dialogRef.close({
      ...this.data,
      title: this.titleFormControl.getRawValue(),
    });
  }

  protected cancel() {
    this.dialogRef.close();
  }
}
