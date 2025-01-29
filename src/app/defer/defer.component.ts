import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

@Component({
  selector: 'app-defer',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './defer.component.html',
  styleUrls: ['./defer.component.css']
})
export class DeferComponent {
  allProducts: Product[] = [];
  products$: Observable<Product[]> = of([]);
  currentPage = 1;
  pageSize = 3;
  errorMessage: string | null = null;
  loading = false;

  constructor(private http: HttpClient) { }

  trackById(index: number, product: Product): number {
    return product.id;
  }

  loadProducts() {
    this.loading = true;
    this.errorMessage = null;

    this.http.get<Product[]>('https://fakestoreapi.com/products').pipe(
      catchError((error) => {
        console.error('Error loading products:', error);
        this.errorMessage = 'Error al cargar los productos. Intenta nuevamente más tarde.';
        this.loading = false;
        return of([]);
      })
    ).subscribe(products => {
      console.log('Productos cargados:', products);
      this.allProducts = products;
      this.updatePageProducts();
      this.loading = false;
    });
  }

  updatePageProducts() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.products$ = of(this.allProducts.slice(startIndex, endIndex));
  }

  nextPage() {
    if ((this.currentPage * this.pageSize) < this.allProducts.length) {
      this.currentPage++;
      this.updatePageProducts();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePageProducts();
    }
  }
}
