import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChatBoxComponent } from '../chat-box/chat-box.component';

@Component({
  selector: 'app-chat-button',
  templateUrl: './chat-button.component.html',
  styleUrls: ['./chat-button.component.scss'],
  standalone: true,
  imports: [
    // Material modules you use, e.g. MatButtonModule
  ]
})
export class ChatButtonComponent {
  constructor(private dialog: MatDialog) {}

  openChat() {
    this.dialog.open(ChatBoxComponent, { width: '700px' });
  }
}
