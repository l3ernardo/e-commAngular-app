import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroComponent } from './hero/hero.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ResetComponent } from './auth/reset/reset.component';
import { NewPasswordComponent } from './auth/new-password/new-password.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/hero', pathMatch: 'full'},
  { path: 'hero' , component: HeroComponent },
  { path: 'login' , component: LoginComponent},
  { path: 'register' , component: RegisterComponent },
  { path: 'reset' , component: ResetComponent },
  { path: 'new-password' , component: NewPasswordComponent,  }
]


@NgModule({
imports: [RouterModule.forRoot(appRoutes)],
exports: [RouterModule],
})
export class AppRoutingModule {

}
