import { Component, OnInit, signal } from '@angular/core';
import { MessageComponent } from './components/Messanger/message.component';
import { SocketService } from './socket/socket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MessageComponent],
  template: ` @if (!isBackendRunning()) {
      <div class="absolute h-screen w-screen bg-slate-900/90 z-50">
        <h1
          class="flex font-bold text-4xl bg-linear-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent justify-center items-center h-full text-center"
        >
          Loading our back shevles...
          <svg class="h-16 w-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
            <radialGradient
              id="a12"
              cx=".66"
              fx=".66"
              cy=".3125"
              fy=".3125"
              gradientTransform="scale(1.5)"
            >
              <stop offset="0" stop-color="#818CF8"></stop>
              <stop offset=".3" stop-color="#818CF8" stop-opacity=".9"></stop>
              <stop offset=".6" stop-color="#818CF8" stop-opacity=".6"></stop>
              <stop offset=".8" stop-color="#818CF8" stop-opacity=".3"></stop>
              <stop offset="1" stop-color="#818CF8" stop-opacity="0"></stop>
            </radialGradient>
            <circle
              transform-origin="center"
              fill="none"
              stroke="url(#a12)"
              stroke-width="5"
              stroke-linecap="round"
              stroke-dasharray="200 1000"
              stroke-dashoffset="0"
              cx="100"
              cy="100"
              r="70"
            >
              <animateTransform
                type="rotate"
                attributeName="transform"
                calcMode="spline"
                dur="2"
                values="360;0"
                keyTimes="0;1"
                keySplines="0 0 1 1"
                repeatCount="indefinite"
              ></animateTransform>
            </circle>
            <circle
              transform-origin="center"
              fill="none"
              opacity=".2"
              stroke="#818CF8"
              stroke-width="5"
              stroke-linecap="round"
              cx="100"
              cy="100"
              r="70"
            ></circle>
          </svg>
        </h1>
      </div>
    }
    <app-message></app-message>`,
})
export class App implements OnInit {
  protected readonly title = signal('Residential Live Chat');
  isBackendRunning = signal<boolean>(false);
  private socketConnection: SocketService;
  constructor(socketConnection: SocketService) {
    this.socketConnection = socketConnection;
  }
  ngOnInit(): void {
    this.socketConnection.checkHealth$().subscribe((ok) => {
      console.log(ok)
      this.isBackendRunning.set(ok);
    });
  }
}
