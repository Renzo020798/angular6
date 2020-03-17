import { Component, OnInit } from '@angular/core';

declare function init_plugins();

@Component({
  selector: 'app-egresos',
  templateUrl: './egresos.component.html',
  styles: []
})
export class EgresosComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    init_plugins();
  }
}