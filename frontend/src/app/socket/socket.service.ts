import { Injectable } from "@angular/core";
import { UserMessageInput } from "@shared/types";

@Injectable({
    providedIn: 'root'
})

interface ISocketService {
    sendMessage(data: UserMessageInput): void;
    getMessages(): void;
    handshake(): string;
}
export class SocketService implements ISocketService { 
    // Define socket service class

    sendMessage(data: UserMessageInput): void {
        throw Error("Not implemented")
    }
    getMessages(): void {
         throw Error("Not implemented")
    }
    handshake(): string {
        return "True"
    }
}