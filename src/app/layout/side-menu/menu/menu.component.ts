import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  menuList = [
    {
      name : "Dashboard",
      icon : "assets/svgs/dashboard.svg",
      route : "/dashboard"
    },
    {
      name : "Products",
      icon : "assets/svgs/dashboard.svg",
      route : "/products"
    },
    {
      name : "Menu",
      icon : "assets/svgs/dashboard.svg",
      route : "/menu"
    },
    {
      name : "Menu",
      icon : "assets/svgs/dashboard.svg",
      route : "/menu"
    },
    {
      name : "Menu",
      icon : "assets/svgs/dashboard.svg",
      route : "/menu"
    },
    {
      name : "Menu",
      icon : "assets/svgs/dashboard.svg",
      route : "/menu"
    },
    {
      name : "Menu",
      icon : "assets/svgs/dashboard.svg",
      route : "/menu"
    },
    {
      name : "Menu",
      icon : "assets/svgs/dashboard.svg",
      route : "/menu"
    },
    {
      name : "Menu",
      icon : "assets/svgs/dashboard.svg",
      route : "/menu"
    },
  ]
}
