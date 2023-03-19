import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto } from './user-dto';
import { delay } from 'core-js';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit{

  private userId: string = "";
  private currentUserDto!: UserDto;

  constructor(private httpClient: HttpClient) {
    //this.loadCurrentUser();
  }
  ngOnInit(): void {
  }

  getUserId(){
    return this.userId;
  }

  registerUser(){
    this.httpClient.get("http://localhost:8080/api/user/register",{responseType: "text"}).subscribe(data => {this.userId = data});
  }

  subscribeToUser(userId: String): Observable<boolean>{
    return this.httpClient.post<boolean>("http://localhost:8080/api/user/subscribe/"+userId, null);
  }

  unsubscribeToUser(userId: String): Observable<boolean>{
    return this.httpClient.post<boolean>("http://localhost:8080/api/user/unsubscribe/"+userId, null);
  }

  loadCurrentUser(){
    this.httpClient.get<UserDto>("http://localhost:8080/api/user/current").subscribe(data=>{
      this.currentUserDto = data;
      console.log("Fullname from loadCurrent User: "+data.fullName)
    });
  }

  getCurrentUser(): UserDto{
    this.loadCurrentUser();
    return this.currentUserDto;
  }
}
