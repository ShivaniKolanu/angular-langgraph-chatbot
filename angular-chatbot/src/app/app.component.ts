import { Component } from '@angular/core';
import { ChatButtonComponent } from './chatbot/chat-button/chat-button.component';
// import any Angular Material modules your chatbot components need, if used standalone

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    ChatButtonComponent,
    // other imports your app uses, e.g. CommonModule, FormsModule, Material modules...
  ],
})
export class AppComponent {}
