import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
})
export class ChatBoxComponent {
  messages: string[] = [];
  userInput: string = '';
  apiUrl: string = 'http://localhost:3000/chat'; // make sure this matches your backend

  // Conversation state
  state = {
    step: '__start__',
    name: '',
    lastName: '',
    age: null as number | null,
    messages: [] as string[],
  };
  isFirstCall = true;


  constructor(private http: HttpClient) {
    // Initial call to start the conversation
    this.sendToServer('');
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    const userMessage = this.userInput;
    this.messages.push(`You: ${userMessage}`);
    this.sendToServer(userMessage);
    this.userInput = '';
  }

  sendToServer(userMessage: string) {
    console.log('Sending to server:', userMessage, 'with state:', this.state, 'isFirstCall:', this.isFirstCall);
    let body;
    if (this.isFirstCall) {
      // Initial body
      body = {
        state: { ...this.state },
        input: ''
      };
      this.isFirstCall = false;
    } else {
      // Do NOT update local state here; let backend handle state transitions
      body = {
        state: { ...this.state },
        input: userMessage
      };
    }

    this.http.post<{ messages: string[] } & Partial<typeof this.state>>(this.apiUrl, body).subscribe(
      (res) => {
        console.log('Response from server:', res);
        // Update only known state properties from backend response
        Object.keys(res).forEach(key => {
          if (key !== 'messages' && key in this.state) {
            (this.state as any)[key] = (res as any)[key];
          }
        });
        res.messages.forEach(msg => this.messages.push(`Bot: ${msg}`));
        // No need to update step separately, it's part of state
      },
      (err) => {
        this.messages.push(`Bot: Error talking to server.`);
        console.error(err);
      }
    );
  }
}
