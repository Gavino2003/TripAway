import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { NavBar2Component } from './nav-bar2/nav-bar2.component';
import { FooterComponent } from './footer/footer.component';
import { TripcardComponent } from './tripcard/tripcard.component';
import { NavigationbtnComponent } from './navigationbtn/navigationbtn.component';

@NgModule({
  declarations: [NavBarComponent, NavBar2Component, FooterComponent,TripcardComponent,NavigationbtnComponent], 
  imports: [CommonModule, IonicModule, RouterModule,],
  exports: [NavBarComponent, NavBar2Component, FooterComponent,TripcardComponent,NavigationbtnComponent],
})
export class ComponentsModule {}
