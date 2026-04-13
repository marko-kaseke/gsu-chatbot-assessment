import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { canActivateAuthRole } from './guards/auth-role.guard';
import { ChatComponent } from './components/chat/chat';
import { ChatLogsComponent } from './components/chat-logs/chat-logs';
import { FaqsAdminComponent } from './components/faqs-admin/faqs';
import { FaqsPublicComponent } from './components/faqs-public/faqs';
import { CreateFaqComponent } from './components/create-faq/create-faq';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'admin' }
  },
  
  {
    path: 'chat',
    component: ChatComponent,
  },
  
  {
    path: 'chat-logs',
    component: ChatLogsComponent,
    //canActivate: [canActivateAuthRole],
    //data: { role: 'admin' }
  },
  
  {
    path: 'faqs-admin',
    component: FaqsAdminComponent,
  },
  
  {
    path: 'faqs-public',
    component: FaqsPublicComponent,
  },
  
  {
    path: 'create-faq',
    component: CreateFaqComponent,
    //canActivate: [canActivateAuthRole],
    //data: { role: 'admin' } // keep your auth guard if needed
  },
  
  { path: 'forbidden', component: ForbiddenComponent },
  { path: '**', component: NotFoundComponent }
];
