import { Component } from '@angular/core';
import { Authority } from 'src/app/config/authority.constants';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  authority = Authority;

  menuList = [
    {
      name : "Dashboard",
      icon : "assets/svgs/dashboard.svg",
      route : "/dashboard",
      authority:null
    },
    {
      name : "Manage Products",
      icon : "assets/svgs/dashboard.svg",
      route : "/admin/products",
      authority : Authority.ADMIN
    },
    {
      name : "Products",
      icon : "assets/svgs/dashboard.svg",
      route : "/products",
      authority:null
    },
  ]
}
