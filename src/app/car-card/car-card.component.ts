import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Car } from '../_models/car.model';

@Component({
  selector: 'app-car-card',
  standalone: true,
  template: `
    <div class="card m-2 shadow-sm border-0" style="width: 18rem;">
      <img [src]="car?.image_Url" class="card-img-top" alt="{{ car?.brand }}" />
      <div class="card-body">
        <h5 class="card-title">{{ car?.brand }} {{ car?.model }}</h5>
        <p class="card-text">
          Year: {{ car?.year }}<br />
          Price: {{ car?.price }}
        </p>
        <div class="d-flex justify-content-around">
          <button class="btn btn-primary" (click)="edit.emit(car)">Edit</button>
          <button class="btn btn-danger" (click)="remove.emit(car?.id)">
            Delete
          </button>
        </div>
      </div>
    </div>
  `,
})
export class CarCardComponent {
  @Input() car!: Car;
  @Output() edit = new EventEmitter<Car>();
  @Output() remove = new EventEmitter<number>();
}
