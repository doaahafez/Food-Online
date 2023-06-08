import { Injectable } from '@angular/core';
import { User } from '../shared/models/User';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IUserLogin } from '../shared/interrfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';

const USER_KEY = 'USER';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersubject =  new BehaviorSubject<User>(this.getUserFromLocalStorage());
 public userObservable : Observable<User> 
  constructor( private http: HttpClient, private toastrService:ToastrService) {
    this.userObservable =this.usersubject.asObservable();
   }

   login (userLogin:IUserLogin):Observable<User>{
     return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next:(user)=>{
          this.setUserToLocalStorage(user)
            this.usersubject.next(user); 
            this.toastrService.success(
              `Welcome to Foodmine ${user.name}!`,
              'Login Successful'
            )  
        },
        error:(erroreResponse) =>{
         this.toastrService.error(erroreResponse.error,'Login Failed')
        }
      })
     );
   }
logout(){
  this.usersubject.next(new User());
  localStorage.removeItem(USER_KEY);
  window.location.reload();
}

private setUserToLocalStorage(user: User) {
  localStorage.setItem (USER_KEY,JSON.stringify(user));
}

private getUserFromLocalStorage():User {
  const userJson = localStorage.getItem(USER_KEY);
  if (userJson) return JSON.parse (userJson) as User;
  return new User();
}
}
