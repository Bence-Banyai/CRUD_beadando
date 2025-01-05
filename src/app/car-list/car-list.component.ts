import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService } from '../_services/car.service';
import { Car } from '../_models/car.model';
import { CarCardComponent } from '../car-card/car-card.component';
import { CarFormComponent } from '../car-form/car-form.component';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule, CarCardComponent, CarFormComponent],
  template: `
    <div class="container">
      <div class="row">
        <div class="col-12 mb-3">
          <button class="btn btn-success" (click)="showForm()">
            Add New Car
          </button>
        </div>
      </div>
      <div class="row">
        <app-car-card
          *ngFor="let c of cars"
          [car]="c"
          (edit)="onEdit($event)"
          (remove)="onDelete($event)"
        >
        </app-car-card>
      </div>

      <app-car-form
        *ngIf="formVisible"
        [existingCar]="selectedCar"
        (complete)="refresh($event)"
      >
      </app-car-form>
    </div>
  `,
})
export class CarListComponent implements OnInit {
  cars: Car[] = [];
  formVisible = false;
  selectedCar: Car | null = null;

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(): void {
    this.carService.getCars().subscribe((data) => (this.cars = data));
  }

  showForm(): void {
    this.selectedCar = null;
    this.formVisible = true;
  }

  onEdit(car: Car): void {
    this.selectedCar = { ...car };
    this.formVisible = true;
  }

  onDelete(id?: number): void {
    if (!id) return;
    this.carService.deleteCar(id).subscribe(() => this.loadCars());
  }

  refresh(updated: boolean): void {
    if (updated) {
      this.loadCars();
    }
    this.formVisible = false;
  }
}
