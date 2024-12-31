import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule } from '@angular/common/http';
import { TravelsService } from './api/travels.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot({mode : 'ios'}), AppRoutingModule,HttpClientModule,FormsModule,ReactiveFormsModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
   // Certificar que está incluído
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, TravelsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
