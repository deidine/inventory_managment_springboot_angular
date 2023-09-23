import { Component, HostListener } from '@angular/core';
import { AuthenticatorService } from './login/services/authenticator.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dims';

  openedSubject = new Subject<boolean>();

  @HostListener('click', ['$event']) clickedInside($event) {
      this.openedSubject.next(false);
  }
}
