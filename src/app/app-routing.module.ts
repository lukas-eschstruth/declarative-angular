import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MemoryLeakComponent} from './components/memory-leak/memory-leak.component';
import {HomeComponent} from './pages/home/home.component';

const routes: Routes = [
  {
  path: '',
  component: HomeComponent
},{
  path: 'leak',
  component: MemoryLeakComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
