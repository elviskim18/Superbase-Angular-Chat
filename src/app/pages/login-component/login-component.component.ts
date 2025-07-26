import { Component, inject } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login-component',
  imports: [],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.scss'
})
export class LoginComponentComponent {
  private auth = inject(AuthServiceService);

  async handleAuth() {
    const response = await this.auth.signInWithGoogle();
  }

}
