import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VideoSelectComponent} from './video-select/video-select.component';
import {VideoComponent} from './video/video.component';


const routes: Routes = [
  {path: '', redirectTo: 'videos', pathMatch: 'full'},
  {path: 'videos', component: VideoSelectComponent},
  {path: 'video', component: VideoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
