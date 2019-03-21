import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { GuitarService } from '../guitar-services/guitar.service';
import { IGuitar } from '../guitar-info/guitar';
import { IGuitarBrand } from '../guitar-info/guitar-brand';
import { GuitarBrandService } from '../guitar-services/guitar-brand.service';

@Component({
  selector: 'app-guitar-edit-dialog',
  templateUrl: './guitar-edit-dialog.component.html',
  styleUrls: ['./guitar-edit-dialog.component.scss']
})
export class GuitarEditDialogComponent implements OnInit {

  public editGuitarForm: FormGroup;
  errorMessage: string;
  pageSubTitle: string;
  minNum = 0;
  maxNum = 5;
  guitar: IGuitar;
  guitarBrand: IGuitarBrand;

  constructor(private location: Location,
              private guitarService: GuitarService,
              private guitarBrandService: GuitarBrandService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.editGuitarForm = new FormGroup({
      price: new FormControl('0', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      rating: new FormControl('', [Validators.required,
          Validators.min(this.minNum), Validators.max(this.maxNum)])
    });

    const param = this.route.snapshot.paramMap.get('gid');
    if (param) {
      const id = +param;
      this.getGuitar(id);
    }
  }

  onCancel() {
    this.location.back();
  }

  updateGuitar() {
    if (this.editGuitarForm.valid) {
      if (this.editGuitarForm.dirty) {
        const g = {...this.guitar, ...this.editGuitarForm.value};
        this.guitarService.saveGuitar(g)
          .subscribe(() => {
              this.onSaveComplete();
              this.location.back();
            },
            (error: any) => this.errorMessage = error as any
          );
      } else {
        this.onSaveComplete();
        this.location.back();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors';
    }
  }

  public hasError(controlName: string, errorName: string) {
    return this.editGuitarForm.controls[controlName].hasError(errorName);
  }

  private getGuitar(id: number) {
    this.guitarService.getGuitar(id).subscribe(
      guitar => {
        this.displayGuitar(guitar);
        this.pageSubTitle += ' ' + this.guitar.modelNumber;
      },
      error => this.errorMessage = error as any
    );

    if (this.guitar) {
      this.guitarBrandService.getGuitarBrand(this.guitar.brandId).subscribe(
        brand => {
          this.guitarBrand = brand;
          this.pageSubTitle = `Editing ${this.guitarBrand.brandName} Guitar - Model # ${this.guitar.modelNumber}`;
        },
        error => this.errorMessage = error as any
      );
    }
  }

  private displayGuitar(guitar: IGuitar): void {
    if (this.editGuitarForm) {
      this.editGuitarForm.reset();
    }

    this.guitar = guitar;

    this.editGuitarForm.patchValue({
      price: this.guitar.price,
      description: this.guitar.description,
      rating: this.guitar.rating
    });
  }

  private onSaveComplete(): void {
    this.editGuitarForm.reset(this.editGuitarForm.value);
  }

}
