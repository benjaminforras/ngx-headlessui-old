import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { MenuModule } from 'ngx-headlessui';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
