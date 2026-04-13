import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MenuComponent } from './components/menu/menu.component';
import { routes } from './app.routes'; // Import routes defined in app.routes.ts

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MenuComponent, RouterModule],
  template: `
    <app-menu></app-menu>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [``]
})
export class AppComponent {
  constructor() {}
}
