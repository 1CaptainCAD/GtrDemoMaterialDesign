import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGuitarBrand } from '../../guitar-info/guitar-brand';
import { GuitarBrandService } from '../../guitar-services/guitar-brand.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  guitarBrand: IGuitarBrand;

  constructor(private route: ActivatedRoute,
              private guitarBrandService: GuitarBrandService) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        const id = +params.id;
        this.guitarBrandService.getGuitarBrand(id).subscribe((data: IGuitarBrand) => {
          this.guitarBrand = data;
        });
      }
    );
  }

}
