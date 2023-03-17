import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userId: string = "";

  constructor(private httpClient: HttpClient) { }

  getUserId(){
    return this.userId;
  }

  registerUser(){
    return this.httpClient.get("http://localhost:8080/api/user/register",{responseType: "text"}).subscribe(data => {this.userId = data});
  }

  subscribeToUser(userId: String): Observable<boolean>{
    return this.httpClient.post<boolean>("http://localhost:8080/api/user/subscribe/"+userId, null);
  }

  unsubscribeToUser(userId: String): Observable<boolean>{
    return this.httpClient.post<boolean>("http://localhost:8080/api/user/unsubscribe/"+userId, null);
  }
}
