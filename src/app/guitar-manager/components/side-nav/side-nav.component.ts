import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { GuitarBrandService } from '../../guitar-services/guitar-brand.service';
import { IGuitarBrand } from '../../guitar-info/guitar-brand';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {

  guitarBrands: IGuitarBrand[];
  selectedBrand: IGuitarBrand | null;
  errorMessage: string;
  sub: Subscription;

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  constructor(private guitarBrandService: GuitarBrandService,
              private router: Router) { }

  private mediaMatcher: MediaQueryList =
    matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  ngOnInit() {
    this.sub = this.guitarBrandService.selectedBrandChanges$.subscribe(
      selectedBrand => this.selectedBrand = selectedBrand
    );

    this.guitarBrandService.getGuitarBrands().subscribe(
      (data: IGuitarBrand[]) => {
        this.guitarBrands = data;
        // console.log(data);

        if (data.length > 0) {
          this.router.navigate(['/guitarmanager', data[0].id]);
        }
      },
      (error: any) => this.errorMessage = error as any
    );

    this.router.events.subscribe(() => {
      if ( this.isScreenSmall()) {
        this.sidenav.close();
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }

  onSelected(brand: IGuitarBrand) {
    this.guitarBrandService.changeSelectedBrand(brand);
  }
}
