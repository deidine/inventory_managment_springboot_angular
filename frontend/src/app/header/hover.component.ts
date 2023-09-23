
import { Component } from '@angular/core';

@Component({
  selector: 'app-auto-open-menu',
  template: `
  <div class="app-nav-item" [matMenuTriggerFor]="menu" #menuTrigger="matMenuTrigger"
                  (mouseenter)="mouseEnter(menuTrigger)" (mouseleave)="mouseLeave(menuTrigger)">
      <ng-content select="[trigger]"></ng-content>
  </div>
  <mat-menu #menu="matMenu" [hasBackdrop]="false">
      <div (mouseenter)="mouseEnter(menuTrigger)" (mouseleave)="mouseLeave(menuTrigger)">
          <ng-content select="[content]"></ng-content>
      </div>
  </mat-menu>
  `
})
export class hover {
  timedOutCloser:any;

  constructor() { }

  mouseEnter(trigger:any) {
    if (this.timedOutCloser) {
      clearTimeout(this.timedOutCloser);
    }
    trigger.openMenu();
  }

  mouseLeave(trigger) {
    this.timedOutCloser = setTimeout(() => {
      trigger.closeMenu();
    }, 50);
  }
}