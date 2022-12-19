import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto.model';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-productos-add',
  templateUrl: './productos-add.component.html',
  styleUrls: ['./productos-add.component.css']
})
export class ProductosAddComponent implements OnInit {
  producto: Producto = {
    nombre: '',
    descripcion: ''
  };
  submitted = false;

  constructor(private productosService: ProductosService,
        private route: ActivatedRoute,
        private router: Router) { }

  ngOnInit(){

  }

  saveProducto(): void {
    const data = {
      nombre: this.producto.nombre,
      descripcion: this.producto.descripcion
    };

    this.productosService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          //this.submitted = true;
          this.router.navigate(['/productos']);
        },
        error: (e) => console.error(e)
      });
  }

  newProducto(): void {
    this.submitted = false;
    this.producto = {
      nombre: '',
      descripcion: ''
    };
  }

}