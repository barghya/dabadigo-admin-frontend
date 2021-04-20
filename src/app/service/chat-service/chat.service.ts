import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { WebsocketService } from '../websocket-service/websocket.service';
import { map } from 'rxjs/operators';

const CHAT_URL = "wss://192.168.0.28:8003";


export interface Message {
  author: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public messages: Subject<Message>;
  constructor(wsService:WebsocketService ) {
    this.messages = <Subject<Message>>wsService.connect(CHAT_URL).pipe(map(
      (response: MessageEvent): Message => {
        let data = JSON.parse(response.data);
        return {
          author: data.author,
          message: data.message
        };
      }
    ));
  }

}
