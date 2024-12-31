import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { NavBar2Component } from './nav-bar2/nav-bar2.component';
import { FooterComponent } from './footer/footer.component';
import { TripcardComponent } from './tripcard/tripcard.component';
import { NavigationbtnComponent } from './navigationbtn/navigationbtn.component';
import { ModalviagensComponent } from './modalviagens/modalviagens.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [NavBarComponent, NavBar2Component, FooterComponent,TripcardComponent,NavigationbtnComponent, ModalviagensComponent], 
  imports: [CommonModule, IonicModule, RouterModule,FormsModule],
  exports: [NavBarComponent, NavBar2Component, FooterComponent,TripcardComponent,NavigationbtnComponent, ModalviagensComponent],
})
export class ComponentsModule {}
