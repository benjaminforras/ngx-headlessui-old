import { HIGHLIGHT_OPTIONS, HighlightModule } from 'ngx-highlightjs';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HeadlessMenuModule } from 'projects/ngx-headlessui/src/components/headlessmenu/headlessmenu.module';
import { IndexComponent } from './pages/index/index.component';
import { NgModule } from '@angular/core';
import { NgxMenuPageComponent } from './pages/ngx-menu-page/ngx-menu-page.component';
import { NgxTransitionPageComponent } from './pages/ngx-transition-page/ngx-transition-page.component';
import { PreviewComponent } from './components/preview/preview.component';
import { TestComponent } from './pages/test/test.component';
import { TransitionModule } from 'projects/ngx-headlessui/src/components/transition/transition.module';

@NgModule({
  declarations: [
    AppComponent,
    PreviewComponent,
    NgxMenuPageComponent,
    NgxTransitionPageComponent,
    IndexComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HighlightModule,

    TransitionModule,
    HeadlessMenuModule
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import('highlight.js'),
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
