import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuoteFormComponent } from './quoteForm/quote-form/quote-form.component';
import { LandingPageComponent } from './landingPage/landing-page/landing-page.component';
import { MenuBarComponent } from './menu-bar/menu-bar/menu-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    QuoteFormComponent,
    LandingPageComponent,
    MenuBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
