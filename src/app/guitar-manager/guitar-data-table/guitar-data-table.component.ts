import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatBottomSheet, MatDialog } from '@angular/material';

import { IGuitar } from '../guitar-info/guitar';
import { IGuitarBrand } from '../guitar-info/guitar-brand';
import { GuitarBrandService } from '../guitar-services/guitar-brand.service';
import { GuitarService } from '../guitar-services/guitar.service';
import { GuitarDetailComponent } from '../guitar-detail/guitar-detail.component';
import { GuitarEditDialogComponent } from '../guitar-edit-dialog/guitar-edit-dialog.component';

@Component({
  selector: 'app-guitar-data-table',
  templateUrl: './guitar-data-table.component.html',
  styleUrls: ['./guitar-data-table.component.scss']
})
export class GuitarDataTableComponent implements OnInit, OnDestroy {

  displayedColumns = ['model', 'price', 'type', 'description', 'rating', 'id'];
  errorMessage: string;
  filteredGuitars: IGuitar[] | null;
  guitars: IGuitar[] | null;
  selectedBrand: IGuitarBrand | null;
  sub: Subscription;

  constructor(private guitarService: GuitarService,
              private guitarBrandService: GuitarBrandService,
              private bottomSheet: MatBottomSheet,
              private dialog: MatDialog) { }

  ngOnInit() {

    this.sub = this.guitarBrandService.selectedBrandChanges$.subscribe(
      selectedBrand => {
        this.selectedBrand = selectedBrand;
        this.filterGuitars(selectedBrand);
      }
    );

    this.guitarService.getGuitars().subscribe(
      (data: IGuitar[]) => {
        this.guitars = data;
        // this.filteredGuitars = data;
        console.log(data);
      },
      (error: any) => this.errorMessage = error as any
    );

    if (this.errorMessage) {
      console.log(this.errorMessage);
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private filterGuitars(selectedBrand?: IGuitarBrand): void {
    if (selectedBrand && this.guitars) {
      this.filteredGuitars = this.guitars.filter(guitar => {
        if (guitar.brandId === selectedBrand.id) {
          return true;
        } else {
          return false;
        }
      });
    }
  }

  openBottomSheet(guitar: IGuitar) {
    this.bottomSheet.open(GuitarDetailComponent, {
      data: {guitar}
    });
  }

  openEditGuitarDialog(): void {
    this.dialog.open(GuitarEditDialogComponent, {
      width: '450px'
    });
  }
}
