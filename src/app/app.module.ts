import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { QRCodeModule } from 'angularx-qrcode';


import { AppComponent } from './app.component';
import { VaComponent } from './va/va.component';
import { LoginComponent } from './login/login.component';
import { VaService } from './services/va.service';
import { ApiService } from './services/api.service';


@NgModule({
  declarations: [
    AppComponent,
    VaComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    QRCodeModule,
    HttpClientModule
  ],
  providers: [
    VaService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
