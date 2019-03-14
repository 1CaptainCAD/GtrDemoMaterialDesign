import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { IGuitar } from '../guitar-info/guitar';

@Component({
  selector: 'app-guitar-add-dialog',
  templateUrl: './guitar-add-dialog.component.html',
  styleUrls: ['./guitar-add-dialog.component.scss']
})
export class GuitarAddDialogComponent implements OnInit {

  guitar: IGuitar;

  constructor(private dialogRef: MatDialogRef<GuitarAddDialogComponent>) { }

  ngOnInit() {
  }

  save() {
    this.dialogRef.close(this.guitar);
  }

  dismiss() {
    this.dialogRef.close(null);
  }
}
