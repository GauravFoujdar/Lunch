import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  public userAuthenticated = new BehaviorSubject<boolean>(false);

  get isUserAuthenticated(){
    return this.userAuthenticated.value
  }

  set setUserAuthentication(isAuthenticated:boolean){
    this.userAuthenticated.next(isAuthenticated)
  }
}
