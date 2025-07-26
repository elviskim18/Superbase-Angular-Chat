import { Routes } from '@angular/router';
import { authGuardGuard } from './auth-guard.guard';


export const routes: Routes = [
    {
    path: 'chat',
    canActivate: [authGuardGuard],
    loadComponent: () =>
      import('./pages/chat-component/chat-component.component').then((com) => com.ChatComponentComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login-component/login-component.component').then((com) => com.LoginComponentComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/login-component/login-component.component').then((com) => com.LoginComponentComponent),
  },
];
