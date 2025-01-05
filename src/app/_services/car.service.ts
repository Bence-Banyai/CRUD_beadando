import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from '../_models/car.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CarService {
  private url = 'http://localhost:3000/cars';

  constructor(private http: HttpClient) {}

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.url);
  }

  addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.url, car);
  }

  updateCar(car: Car): Observable<Car> {
    return this.http.put<Car>(`${this.url}/${car.id}`, car);
  }

  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
