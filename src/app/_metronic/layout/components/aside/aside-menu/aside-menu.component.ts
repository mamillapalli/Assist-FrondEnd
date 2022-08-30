import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import {AuthService} from "../../../../../modules/auth";

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.scss'],
})
export class AsideMenuComponent implements OnInit {
  appAngularVersion: string = environment.appVersion;
  appPreviewChangelogUrl: string = environment.appPreviewChangelogUrl;
  authRoles: any

  constructor(public authService: AuthService) {
    const auth = this.authService.getAuthFromLocalStorage();
    this.authRoles = auth?.roles
  }

  ngOnInit(): void {}
}
