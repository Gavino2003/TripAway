import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tripcard',
  templateUrl: './tripcard.component.html',
  styleUrls: ['./tripcard.component.scss'],
})
export class TripcardComponent  implements OnInit {

  constructor() { }
  local: string = 'Paris';
  creatorname: string = 'Vasco Gavino'
  ngOnInit() {}

}
