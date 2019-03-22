import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { GuitarAddDialogComponent } from './guitar-add-dialog/guitar-add-dialog.component';
import { GuitarEditDialogComponent } from './guitar-edit-dialog/guitar-edit-dialog.component';

const routes: Routes = [
  {path: '', component: GuitarManagerAppComponent,
    children: [
      {path: 'brand/:id', component: GuitarDataTableComponent},
      {path: 'brand/:id/edit/:gid', component: GuitarEditDialogComponent},
      {path: 'guitar/add', component: GuitarAddDialogComponent},
      {path: '', component: MainContentComponent}
      ]
  },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    GuitarManagerAppComponent,
    ToolbarComponent,
    MainContentComponent,
    SideNavComponent,
    GuitarDataTableComponent,
    StarComponent,
    GuitarDetailComponent,
    GuitarAddDialogComponent,
    GuitarEditDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    GuitarBrandService,
    GuitarService
  ]
})
export class GuitarManagerModule { }
