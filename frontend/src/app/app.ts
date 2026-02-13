import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageComponent } from './components/Messanger/message.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MessageComponent],
  template: '<app-message></app-message>',
})
export class App {
  protected readonly title = signal('frontend');
}
