import { Component, Input } from '@angular/core';
import { Message } from "./message.model";
import { MessageService } from "./message.service";

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css' ]
})
export class MessageComponent {
  @Input()  message: Message;


    color = "#868987";

    constructor(private messageService: MessageService ){}
    onEdit() {
        this.messageService.editMessage(this.message);
    }
    onDelete() {
        this.messageService.deleteMessage(this.message)
        .subscribe(
            result => console.log(result)
        );
    }
    
}
