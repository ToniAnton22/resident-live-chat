import { Injectable } from '@angular/core';
import { Messages } from '@shared/types';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { fromEvent, map, merge, Observable, startWith } from 'rxjs';

interface ISocketService {
  sendMessage(data: Messages): void;
  watchNewMessage$(): Observable<Messages>;
  watchUsersConnect$(): Observable<number>;
  destroy(): void;
  checkHealth$(): Observable<boolean>;
}

@Injectable({
  providedIn: 'root',
})
export class SocketService implements ISocketService {
  // Define socket service class
  private socket: Socket;

  constructor() {
    this.socket = io(environment.socketUrl, {
      reconnectionDelayMax: 10000,
      auth: { token: 'Auth-token' },
    });
  }

  checkHealth$(): Observable<boolean> {
    const connected$ = fromEvent(this.socket, 'connect').pipe(map(() => true));
    const disconnected$ = fromEvent(this.socket, 'disconnect').pipe(map(() => false));
    const connectError$ = fromEvent(this.socket, 'connect_error').pipe(map(() => false));
    return merge(connected$, disconnected$, connectError$).pipe(startWith(this.socket.connected));
  }

  sendMessage(data: Messages): void {
    this.socket.emit('messages', data);
  }
  watchNewMessage$(): Observable<Messages> {
    return fromEvent(this.socket, 'messages');
  }

  watchUsersConnect$(): Observable<number> {
    return fromEvent(this.socket, 'numConnected');
  }

  destroy(): void {
    this.socket.disconnect();
  }
}
