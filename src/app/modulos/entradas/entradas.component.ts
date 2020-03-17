import { Component, OnInit } from '@angular/core';

declare function init_plugins();
@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styles: []
})
export class EntradasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
