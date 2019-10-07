import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AlunosComponent } from './pages/alunos/alunos.component';
import { ProfessoresComponent } from './pages/professores/professores.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'alunos', component: AlunosComponent, pathMatch: 'full' },
  { path: 'professores', component: ProfessoresComponent, pathMatch: 'full' },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
