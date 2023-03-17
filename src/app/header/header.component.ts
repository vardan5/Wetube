import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{


  isAuthenticated: boolean = false;

  constructor(private oidcSS: OidcSecurityService) {}

  ngOnInit(): void {
    this.oidcSS.isAuthenticated$.subscribe(({isAuthenticated}) => {
      this.isAuthenticated = isAuthenticated;
    })
  }

  login() {
    this.oidcSS.authorize();
  }

  logout() {
    this.oidcSS.logoff().subscribe((result) => console.log(result));
  }
}
