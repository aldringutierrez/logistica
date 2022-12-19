import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-productos-list',
  templateUrl: './productos-list.component.html',
  styleUrls: ['./productos-list.component.css']
})
export class ProductosListComponent implements OnInit {

  productos?: Producto[];
  currentProducto: Producto = {};
  currentIndex = -1;
  nombre = '';

  constructor(private productosService: ProductosService) { }

  ngOnInit(): void {
    this.retrieveProductos();
  }

  retrieveProductos(): void {
    this.productosService.getAll()
      .subscribe({
        next: (data) => {
          this.productos = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveProductos();
    this.currentProducto = {};
    this.currentIndex = -1;
  }

  setActiveProducto(producto: Producto, index: number): void {
    //console.log("xxxxxxxxxxxxxxxxxxx");
    this.currentProducto = producto;
    this.currentIndex = index;
  }

  removeAllProductos(): void {
    this.productosService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchNombre(): void {
    this.currentProducto = {};
    this.currentIndex = -1;

    this.productosService.findByNombre(this.nombre)
      .subscribe({
        next: (data) => {
          this.productos = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}