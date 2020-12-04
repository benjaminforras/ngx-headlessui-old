import { MenuModule, TransitionModule } from 'ngx-headlessui';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxMenuPageComponent } from './pages/ngx-menu-page/ngx-menu-page.component';
import { PreviewComponent } from './components/preview/preview.component';
import { NgxTransitionPageComponent } from './pages/ngx-transition-page/ngx-transition-page.component';

@NgModule({
  declarations: [
    AppComponent,
    PreviewComponent,
    NgxMenuPageComponent,
    NgxTransitionPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MenuModule,
    TransitionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
