import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';

import {MatSidenavModule} from '@angular/material/sidenav';
import { HeaderLayoutComponent } from './header-layout/header-layout.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { MenuComponent } from './side-menu/menu/menu.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SharedModule } from '../core/shared/shared.module';


@NgModule({
  declarations: [
    LayoutComponent,
    HeaderLayoutComponent,
    SideMenuComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MatSidenavModule,
    SharedModule,
    MatToolbarModule
  ]
})
export class LayoutModule { }
