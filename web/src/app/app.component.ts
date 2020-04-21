import { UserService } from './login/user.service';
import { HeaderComponent } from './header/header.component';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  constructor(private userService: UserService){}
//   ngOnDestroy(): void {
//     this.userService.logoutUser.subscribe(res=> {
//         localStorage.removeItem('currentUser');
// });

// }
}
