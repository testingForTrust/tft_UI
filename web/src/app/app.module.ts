import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA  } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';
import { MatMenuModule, MatButtonModule, MatIconModule, MatCardModule, MatSidenavModule, MatExpansionModule, MatFormFieldModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material';
import { MatTabsModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { SwiperModule, SwiperConfigInterface,SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import {NgxPaginationModule} from 'ngx-pagination';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { ImageClassifierComponent } from './image-classifier/image-classifier.component';
import { ImageClassifierMainSettingsComponent } from './image-classifier-main-settings/image-classifier-main-settings.component';
//import { TFTguardGuard } from './guard/tftguard.guard';
import { AdversarialInputsSettingsComponent } from './adversarial-inputs-settings/adversarial-inputs-settings.component';
import { InterpretabilitySettingsComponent } from './interpretability-settings/interpretability-settings.component';

const routes: Routes = [
    // { path: 'user', component: UserComponent },
    // { path: 'login', component: LoginComponent },
    { path: '', component: HomepageComponent },
    { path: 'homepage', component: HomepageComponent },
    { path: 'image-classifier', component: ImageClassifierComponent},
    { path: '**', redirectTo: 'homepage' }

];

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  observer: true,
  direction: 'horizontal',
  threshold: 50,
  spaceBetween: 5,
  slidesPerView: 1,
  centeredSlides: true
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    LoginComponent,
    ImageClassifierComponent,
    ImageClassifierMainSettingsComponent,
    AdversarialInputsSettingsComponent,
    InterpretabilitySettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes, {useHash: true}),
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,MatInputModule,
    MatTabsModule,
    HttpClientModule,
    HttpModule,
    SwiperModule,
    BrowserModule,
    NgxPaginationModule,
    MalihuScrollbarModule.forRoot()
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
       LoginComponent, ImageClassifierMainSettingsComponent, AdversarialInputsSettingsComponent
   ]
})
export class AppModule { }
