import { Component, OnInit } from '@angular/core';

import { Subscription } from "rxjs";

import { AuthService } from "../pages/auth/auth.service";

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',    title: 'Dashboard',         icon:'nc-bank',       class: '' },
    { path: '/lectures',     title: 'Lectures',        icon:'nc-single-copy-04', class: '' },
    { path: '/workshop',     title: 'Workshops',             icon:'nc-briefcase-24',    class: '' },
    { path: '/teams',  title: 'Teams',             icon:'nc-badge',    class: '' },
    { path: '/sponsors',  title: 'Sponsors',             icon:'nc-mobile',    class: '' },

    { path: '/competition',  title: 'Competitions',             icon:'nc-single-02',    class: '' },
    { path: '/subscribers',          title: 'Subscribers',              icon:'nc-pin-3',      class: '' },
    { path: '/credentials',          title: 'Credentials',              icon:'nc-icon nc-settings-gear-65',      class: '' },
   

];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];


    userIsAuthenticated = false;
    private authListenerSubs: Subscription;

    constructor(private authService: AuthService) {}

    ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
