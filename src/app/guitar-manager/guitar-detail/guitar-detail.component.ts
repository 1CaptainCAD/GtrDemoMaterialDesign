import {Component, Inject, OnInit} from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import {IGuitar} from '../guitar-info/guitar';

@Component({
  selector: 'app-guitar-detail',
  templateUrl: './guitar-detail.component.html',
  styleUrls: ['./guitar-detail.component.scss']
})
export class GuitarDetailComponent implements OnInit {

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: IGuitar) { }

  ngOnInit() {
  }

}
