import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigationbtn',
  templateUrl: './navigationbtn.component.html',
  styleUrls: ['./navigationbtn.component.scss'],
})
export class NavigationbtnComponent  implements OnInit {
  fabOpened = false;
  constructor() { }

  ngOnInit() {}

  toggleFab() {
    this.fabOpened = !this.fabOpened; // Alterna a visibilidade dos botões
  }
}
