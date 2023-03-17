import { Component, OnInit} from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { LoginResponse } from 'angular-auth-oidc-client/lib/login/login-response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'wetube-ui';
  
  constructor(private oidcSS: OidcSecurityService) {
    
  }

  ngOnInit(): void {
    this.oidcSS.checkAuth().subscribe(({ isAuthenticated }) => {
      console.log("App is Authenticated", isAuthenticated);
    });
  }
  
}
