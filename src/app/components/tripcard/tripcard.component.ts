import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tripcard',
  templateUrl: './tripcard.component.html',
  styleUrls: ['./tripcard.component.scss'],
})
export class TripcardComponent  implements OnInit {
  @Input() travel: any; 
  constructor() { }
  local: string = 'Paris';
  creatorname: string = 'Vasco Gavino'
  ngOnInit() {}

}
