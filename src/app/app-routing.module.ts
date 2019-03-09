import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'guitarmanager', loadChildren: './guitar-manager/guitar-manager.module#GuitarManagerModule'},
  {path: 'demo', loadChildren: './demo/demo.module#DemoModule'},
  {path: '**', redirectTo: 'guitarmanager'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

