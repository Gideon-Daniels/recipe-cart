import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//to-do: add lazy loading

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
