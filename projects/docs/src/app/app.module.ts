import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MenuModule } from 'projects/ngx-headlessui/src/components/menu/menu.module';
import { NgModule } from '@angular/core';
import { NgxMenuPageComponent } from './pages/ngx-menu-page/ngx-menu-page.component';
import { NgxTransitionPageComponent } from './pages/ngx-transition-page/ngx-transition-page.component';
import { PreviewComponent } from './components/preview/preview.component';
import { TransitionModule } from 'projects/ngx-headlessui/src/components/transition/transition.module';
import { IndexComponent } from './pages/index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    PreviewComponent,
    NgxMenuPageComponent,
    NgxTransitionPageComponent,
    IndexComponent
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
