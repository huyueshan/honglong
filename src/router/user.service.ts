
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthService {
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(): Observable<boolean> {
    return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
  }

  logout(): void {
    this.isLoggedIn = false;
    window.location.href="#/noload";
  }
}



// =======================================
// import { Injectable } from '@angular/core';

// import { Observable } from 'rxjs';
// import { tap, delay } from 'rxjs/operators';

// @Injectable()
// export class AuthService {
//   isLoggedIn = false;

//   // store the URL so we can redirect after logging in
//   redirectUrl: string;

//   login() {
//      this.isLoggedIn = !this.isLoggedIn;
//     //  return 
//     //  return of(true).pipe(
//     //   delay(1000),
//     //   tap(val => this.isLoggedIn = true)
//     // );
//   }

//   logout(): void {
//     this.isLoggedIn = false;
//   }
// }


