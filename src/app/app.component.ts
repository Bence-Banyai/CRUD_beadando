import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CarListComponent } from './car-list/car-list.component';
import { CarCardComponent } from './car-card/car-card.component';
import { CarFormComponent } from './car-form/car-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    CarListComponent,
    CarCardComponent,
    CarFormComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'CRUD_beadando';
}
