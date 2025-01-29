import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products';
  private productsSubject = new BehaviorSubject<any[]>([]);
  products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) { }

  loadProducts() {
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap((products) => this.productsSubject.next(products)),
      catchError(() => {
        console.error('Error al cargar productos');
        this.productsSubject.next([]);
        return of([]);
      })
    );
  }
}
