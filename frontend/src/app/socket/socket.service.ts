import { Injectable } from '@angular/core';
import { Messages, UserMessageInput } from '@shared/types';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { fromEvent, map, Observable } from 'rxjs';

interface ISocketService {
  sendMessage(data: UserMessageInput): void;
  watchNewMessage$(): Observable<Messages>;
  connected$(): Observable<boolean>;
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
      auth: {
        token: 'Auth-token',
      },
    });
  }

  sendMessage(data: UserMessageInput): void {
    throw Error('Not implemented');
  }
  watchNewMessage$(): Observable<Messages> {
    return fromEvent(this.socket, 'messages');
  }

  connected$(): Observable<boolean> {
    return fromEvent(this.socket, 'connect').pipe(map(() => true));
  }
}
