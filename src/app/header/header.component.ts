import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{


  isAuthenticated: boolean = false;
  userName: String = "";

  constructor(private oidcSS: OidcSecurityService, private userService: UserService) {}

  ngOnInit(): void {
    this.oidcSS.isAuthenticated$.subscribe(({isAuthenticated}) => {
      this.isAuthenticated = isAuthenticated;
    });
    
    
  }

  login() {
    this.oidcSS.authorize();
  }

  logout() {
    this.oidcSS.logoffAndRevokeTokens();
    this.oidcSS.logoffLocal();
  }

  loadName(){
    this.userName=this.userService.getCurrentUser().fullName;
    console.log("Username is "+this.userName);
  }
}
