import { Component, OnInit } from '@angular/core';
declare function init_plugins();
@Component({
  selector: 'app-seguridad',
  templateUrl: './seguridad.component.html',
  styles: []
})
export class SeguridadComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
