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
    <div class="container my-4">
      <h2 class="text-center mb-4">Car Inventory</h2>
      <div class="row mb-3 justify-content-center">
        <div class="col-auto">
          <button class="btn btn-success" (click)="showForm()">
            Add New Car
          </button>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-auto d-flex flex-wrap justify-content-center">
          <app-car-card
            *ngFor="let c of cars"
            class="mx-2 mb-3"
            [car]="c"
            (edit)="onEdit($event)"
            (remove)="onDelete($event)"
          ></app-car-card>
        </div>
      </div>

      <div class="row justify-content-center" *ngIf="formVisible">
        <div class="col-12 col-md-6 shadow p-3">
          <app-car-form
            [existingCar]="selectedCar"
            (complete)="refresh($event)"
          ></app-car-form>
        </div>
      </div>
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
