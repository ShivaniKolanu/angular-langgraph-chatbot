import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatButtonComponent } from './chat-button/chat-button.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';

// Any Angular Material modules you use
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIcon,

    // ✅ Import standalone components here
    ChatButtonComponent,
    ChatBoxComponent
  ],
  // ✅ You can now export them
  exports: [ChatButtonComponent]
})
export class ChatbotModule {}
