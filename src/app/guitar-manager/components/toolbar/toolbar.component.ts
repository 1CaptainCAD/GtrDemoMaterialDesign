import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';

import { GuitarAddDialogComponent } from '../../guitar-add-dialog/guitar-add-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openAddGuitarDialog() {
    this.dialog.open(GuitarAddDialogComponent, {
      width: '450px'
    });
  }
}
