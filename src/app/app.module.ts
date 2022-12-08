import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { CoreModule } from './core/core.module';
import { LandingModule } from './pages/landing/landing.module';



// TODO: Move AngularFire Modules To CORE Module
@NgModule({
  declarations: [
    AppComponent,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    CoreModule,
    LandingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
