import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { IGuitar } from '../guitar-info/guitar';
import { GuitarBrandService } from '../guitar-services/guitar-brand.service';
import { IGuitarBrand } from '../guitar-info/guitar-brand';
import { GuitarService } from '../guitar-services/guitar.service';

@Component({
  selector: 'app-guitar-add-dialog',
  templateUrl: './guitar-add-dialog.component.html',
  styleUrls: ['./guitar-add-dialog.component.scss']
})
export class GuitarAddDialogComponent implements OnInit {

  errorMessage: string;
  guitarBrands: IGuitarBrand[];
  guitarBrand: IGuitarBrand;
  guitar: IGuitar;
  guitars: IGuitar[];
  pageSubTitle = 'Page Sub Title';
  addNewGuitarForm: FormGroup;

  minRatingNum = 0;
  maxRatingNum = 5;
  minStringQty = 4;
  maxStringQty = 12;
  minFretQty = 10;
  maxFretQty = 30;
  minScaleLength = 20;
  maxScaleLength = 30;

  constructor(private guitarBrandService: GuitarBrandService,
              private guitarService: GuitarService,
              private fb: FormBuilder,
              private location: Location) { }

  ngOnInit() {
    this.guitarBrandService.getGuitarBrands().subscribe(
      (data: IGuitarBrand[]) => {
        this.guitarBrands = data;
        if (this.guitarBrands && this.guitarBrands.length) {
          this.guitarBrand = this.guitarBrands[0];
        }
      }
    );

    this.guitarService.getGuitars().subscribe(
      data => {
        this.guitars = data;
      },
      error => this.errorMessage = error as any
    );

    this.guitarService.getGuitar(0).subscribe(
      (data: IGuitar) => {
        this.guitar = data;
        console.log('Initialized guitar = ' + JSON.stringify(data));
      },
      (error: any) => this.errorMessage = error as any
    );

    this.addNewGuitarForm = this.fb.group({
      brandId: this.guitarBrands,
      modelNumber: [this.guitar.modelNumber, Validators.required],
      guitarType: 1,
      price: [this.guitar.price, Validators.required],
      description: [this.guitar.description, Validators.required],
      rating: [this.guitar.rating, [Validators.required,
        Validators.min(this.minRatingNum),
        Validators.max(this.maxRatingNum)]],
      stringType: this.guitar.stringType,
      numberOfStrings: [this.guitar.numberOfStrings, [Validators.required,
        Validators.min(this.minStringQty),
        Validators.max(this.maxStringQty)]],
      numberOfFrets: [this.guitar.numberOfFrets, [Validators.required,
        Validators.min(this.minFretQty),
        Validators.max(this.maxFretQty)]],
      scaleLength: [this.guitar.scaleLength, [Validators.required,
        Validators.min(this.minScaleLength),
        Validators.max(this.maxScaleLength)]]
    });

    this.addNewGuitarForm.get('brandId').setValue(1);

    if (this.errorMessage) {
      console.log(this.errorMessage);
    }

  }

  addGuitar(): void {
    if (this.addNewGuitarForm.valid) {
      if (this.addNewGuitarForm.dirty) {
        this.guitar.brandId = this.guitarBrand.id;
        const g = {...this.guitar, ...this.addNewGuitarForm.value};
        this.guitarService.saveGuitar(g).subscribe(
          () => {
            this.onAddComplete();
          },
          (error: any) => this.errorMessage = error as any
        );
      } else {
        this.onAddComplete();
      }
    } else {
      this.errorMessage = 'Please correct validation errors.';
    }
  }

  onCancel() {
    this.location.back();
  }

  private onAddComplete(): void {
    this.addNewGuitarForm.reset(this.addNewGuitarForm.value);
    this.location.back();
  }

  public hasError(controlName: string, errorName: string) {
    return this.addNewGuitarForm.controls[controlName].hasError(errorName);
  }
}
