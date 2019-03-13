import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../shared/material.module';
import { GuitarManagerAppComponent } from './guitar-manager-app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { GuitarBrandService} from './guitar-services/guitar-brand.service';
import { GuitarService } from './guitar-services/guitar.service';
import { GuitarDataTableComponent } from './guitar-data-table/guitar-data-table.component';
import { StarComponent } from '../shared/star.component';
import { GuitarDetailComponent } from './guitar-detail/guitar-detail.component';

const routes: Routes = [
  {path: '', component: GuitarManagerAppComponent,
    children: [
      {path: ':id', component: MainContentComponent},
      {path: '', component: MainContentComponent}
      ]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [
    GuitarManagerAppComponent,
    ToolbarComponent,
    MainContentComponent,
    SideNavComponent,
    GuitarDataTableComponent,
    StarComponent,
    GuitarDetailComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [
    GuitarDetailComponent
  ],
  providers: [
    GuitarBrandService,
    GuitarService
  ]
})
export class GuitarManagerModule { }
