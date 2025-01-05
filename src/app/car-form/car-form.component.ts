import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Car } from '../_models/car.model';
import { CarService } from '../_services/car.service';

@Component({
  selector: 'app-car-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card p-3">
      <form #carForm="ngForm" (ngSubmit)="save()">
        <div class="mb-3">
          <label class="form-label">Brand</label>
          <input
            [(ngModel)]="tempCar.brand"
            name="brand"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Model</label>
          <input
            [(ngModel)]="tempCar.model"
            name="model"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Year</label>
          <input
            [(ngModel)]="tempCar.year"
            name="year"
            type="number"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Price</label>
          <input
            [(ngModel)]="tempCar.price"
            name="price"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Image URL</label>
          <input
            [(ngModel)]="tempCar.image_Url"
            name="image_Url"
            class="form-control"
          />
        </div>
        <button class="btn btn-primary" type="submit">Save</button>
      </form>
    </div>
  `,
})
export class CarFormComponent {
  @Input() existingCar: Car | null = null;
  @Output() complete = new EventEmitter<boolean>();
  tempCar: Car = {
    brand: '',
    model: '',
    year: 0,
    price: '',
    image_Url: '',
  };

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    if (this.existingCar) {
      this.tempCar = { ...this.existingCar };
    }
  }

  save(): void {
    if (this.existingCar) {
      this.carService
        .updateCar(this.tempCar)
        .subscribe(() => this.complete.emit(true));
    } else {
      this.carService
        .addCar(this.tempCar)
        .subscribe(() => this.complete.emit(true));
    }
  }
}
