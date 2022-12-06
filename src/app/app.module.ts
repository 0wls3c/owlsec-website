import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions'; //TODO: Add Authentication for Login/Registration
import { provideStorage,getStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFireAuthModule } from '@angular/fire/compat/auth'; // TODO: Add Compat Authentication
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import {AngularFireAnalyticsModule} from '@angular/fire/compat/analytics';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
// TODO: Add ng-recaptha component https://github.com/Enngage/ngx-captcha | https://developers.google.com/recaptcha/docs/v3?hl=en&authuser=0 | https://www.google.com/recaptcha/admin


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
    AngularFireModule.initializeApp(environment.firebase),
    // AngularFireAuthModule, TODO: Enable Compat Authentication
    AngularFirestoreModule,
    AngularFireAnalyticsModule,
    AngularFireDatabaseModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideAnalytics(() => getAnalytics()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    // provideFunctions(() => getFunctions()), TODO: Enable Authentication
    provideStorage(() => getStorage()),
    NgbModule
  ],
  providers: [
    ScreenTrackingService,UserTrackingService // TODO: Move Analytics to CORE Module
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
