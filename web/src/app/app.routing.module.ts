import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { ImageClassifierComponent } from './image-classifier/image-classifier.component';
//import { TFTguardGuard } from './guard/tftguard.guard';

const routes: Routes = [
    // { path: 'user', component: UserComponent },
    // { path: 'login', component: LoginComponent },
    { path: '', component: HomepageComponent },
    { path: 'homepage', component: HomepageComponent },
    { path: 'image-classifier', component: ImageClassifierComponent},

    { path: '**', redirectTo: 'homepage' }


];

@NgModule({
imports:[
    RouterModule.forRoot(routes, {useHash: true})
],
exports: [
    RouterModule
],
declarations: []
})

export class AppRoutingModule {}
