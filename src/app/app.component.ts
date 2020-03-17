import { Component, ViewChild, ElementRef, NgZone, Renderer2 } from '@angular/core';

import { SettingsService } from './services/service.index';
import {
  Router,
  // import as RouterEvent to avoid confusion with the DOM Event
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  public template:string;
    
}

