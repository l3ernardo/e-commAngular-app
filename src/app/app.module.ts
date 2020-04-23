import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './pages/app.routing.module';

import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { HeroComponent } from './pages/hero/hero.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ResetComponent } from './pages/auth/reset/reset.component';
import { NewPasswordComponent } from './pages/auth/new-password/new-password.component';

import { AuthModule } from './pages/auth/authentication/auth.module';
import { AuthService } from './pages/auth/services/auth.service';
import { SpinnerComponent } from './pages/shared/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    RegisterComponent,
    ResetComponent,
    NewPasswordComponent,
    LoginComponent,
    HeroComponent,
    SpinnerComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    AppRoutingModule,
    AuthModule,

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
