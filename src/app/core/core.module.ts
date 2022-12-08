import { NgModule } from '@angular/core';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../../environments/environment';
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

// TODO: Add ng-recaptha component https://github.com/Enngage/ngx-captcha | https://developers.google.com/recaptcha/docs/v3?hl=en&authuser=0 | https://www.google.com/recaptcha/admin



@NgModule({
  declarations: [],
  imports: [
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
  ],
  providers: [
    ScreenTrackingService,UserTrackingService // TODO: Move Analytics to CORE Module
  ]
})
export class CoreModule { }
