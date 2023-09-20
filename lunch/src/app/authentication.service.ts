import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  public userAuthenticated = new BehaviorSubject<boolean>(false);
  private userAuthenticatedType = new BehaviorSubject<string>('');
  private userName = new BehaviorSubject<string>('');

  get isUserAuthenticated(){
    return this.userAuthenticated.value
  }

  set setUserAuthentication(isAuthenticated:boolean){
    this.userAuthenticated.next(isAuthenticated)
  }
  get userType(){
    return this.userAuthenticatedType.value
  }

  set setUserType(userType:string){
    this.userAuthenticatedType.next(userType)
  }
  get getUserName(){
    return this.userName.value
  }

  set setUserName(userName:string){
    this.userName.next(userName)
  }
}
