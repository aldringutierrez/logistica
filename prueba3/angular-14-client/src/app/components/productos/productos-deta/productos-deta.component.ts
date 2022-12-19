import { Component, Input, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto.model';

@Component({
  selector: 'app-productos-deta',
  templateUrl: './productos-deta.component.html',
  styleUrls: ['./productos-deta.component.css']
})
export class ProductosDetaComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentProducto: Producto = {
    nombre: '',
    descripcion: ''
  };
  
  message = '';

  constructor(
    private productosService: ProductosService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getproducto(this.route.snapshot.params["id"]);
    }
  }

  getproducto(id: string): void {
    this.productosService.get(id)
      .subscribe({
        next: (data) => {
          this.currentProducto = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updatePublished(status: boolean): void {
    const data = {
      nombre: this.currentProducto.nombre,
      descripcion: this.currentProducto.descripcion
    };

    this.message = '';

    this.productosService.update(this.currentProducto.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          //this.currentproducto.published = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateProducto(): void {
    this.message = '';

    this.productosService.update(this.currentProducto.id, this.currentProducto)
      .subscribe({
        next: (res) => {
          //console.log(res);
          //this.message = res.message ? res.message : 'This producto was updated successfully!';
          this.router.navigate(['/productos'])
        },
        error: (e) => console.error(e)
      });
  }

  deleteProducto(): void {
    console.log("curr : "+this.currentProducto.id)
    this.productosService.delete(this.currentProducto.id)
      .subscribe({
        next: (res) => {
          console.log("res : "+res);
          //this.router.navigate(['/bodegas']);
          this.router.navigate(['/productos'])
            .then(() => {
              window.location.reload();
            });
        },
        error: (e) => console.error("error : "+e)
      });
  }

}