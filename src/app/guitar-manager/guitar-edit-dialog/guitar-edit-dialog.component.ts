import {Component, Inject, OnInit} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {MAT_BOTTOM_SHEET_DATA, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {IGuitar} from '../guitar-info/guitar';

@Component({
  selector: 'app-guitar-edit-dialog',
  templateUrl: './guitar-edit-dialog.component.html',
  styleUrls: ['./guitar-edit-dialog.component.scss']
})
export class GuitarEditDialogComponent implements OnInit {

  minNum = 0;
  maxNum = 5;

  price = new FormControl('0', [Validators.required]);
  description = new FormControl('', [Validators.required]);
  rating = new FormControl('',
    [Validators.required, Validators.min(this.minNum), Validators.max(this.maxNum)]);

  constructor(private dialogRef: MatDialogRef<GuitarEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IGuitar) { }

  ngOnInit() {

  }

}
