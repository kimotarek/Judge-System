import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { JudgeComponent } from './judge/judge.component';

const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent,
  
  },
  {
    path: 'judge',
    component: JudgeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
