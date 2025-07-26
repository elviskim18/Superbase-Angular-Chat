import { Component, effect, inject, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ChatServiceService } from '../../services/chat-service.service';
import { Ichat } from '../../Interface/chat-response';
import { DatePipe } from '@angular/common';
import { ModalComponentComponent } from '../../layout/modal-component/modal-component.component';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-chat-component',
  imports: [ReactiveFormsModule,DatePipe,ModalComponentComponent],
  templateUrl: './chat-component.component.html',
  styleUrl: './chat-component.component.scss',
  standalone: true
})
export class ChatComponentComponent {
  private chat_service = inject(ChatServiceService);
  private auth = inject(AuthServiceService);
  private router = inject(Router);

  
  chats = signal<Ichat[]>([]);

  constructor() {
    effect(() => {
      this.onListChat();
    });
  }


  chatForm!: FormGroup;
  private fb = inject(FormBuilder);

  ngOnInit() {
    this.chatForm = this.fb.group({
      chat_message: ['', Validators.required],
    });
  }

  onSubmit() {
    const formValue = this.chatForm.value.chat_message;
    this.chat_service
      .chatMessage(formValue)
      .then((res) => {
        this.chatForm.reset();
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  onListChat() {
    this.chat_service
      .listChat()
      .then((res: Ichat[] | null) => {
        console.log(res);
        if (res !== null) { 
          this.chats.set(res);
        } else {
          console.log('No messages Found');
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  openDropDown(msg: Ichat) {
    console.log(msg);
    this.chat_service.selectedChats(msg);
  }

  async logOut() {
    this.auth.signOut().then(() => { this.router.navigate(['/login']); })
      .catch((err) => {
        alert(err.message);
      });
  }

}
