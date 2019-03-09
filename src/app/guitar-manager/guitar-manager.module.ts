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

const routes: Routes = [
  {path: '', component: GuitarManagerAppComponent,
    children: [
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
    SideNavComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class GuitarManagerModule { }
