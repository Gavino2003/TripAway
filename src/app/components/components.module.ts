import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { NavBar2Component } from './nav-bar2/nav-bar2.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [NavBarComponent, NavBar2Component, FooterComponent], 
  imports: [CommonModule, IonicModule, RouterModule,],
  exports: [NavBarComponent, NavBar2Component, FooterComponent],
})
export class ComponentsModule {}
