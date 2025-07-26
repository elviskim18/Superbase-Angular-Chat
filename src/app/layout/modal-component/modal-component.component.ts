import { Component, inject, signal } from '@angular/core';
import { ChatServiceService } from '../../services/chat-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-component',
  imports: [],
  templateUrl: './modal-component.component.html',
  styleUrl: './modal-component.component.scss'
})
export class ModalComponentComponent {
  private chat_service = inject(ChatServiceService);
  private router = inject(Router);
  dismiss = signal(false);


  deleteChat() {
    const id = (this.chat_service.savedChat() as { id: string }).id;

    console.log(id);

    this.chat_service
      .deleteChat(id)
      .then(() => {
        let currentUrl = this.router.url;

        this.dismiss.set(true);

        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate([currentUrl]);
          });
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  }

}
