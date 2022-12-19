import { Component, OnInit } from '@angular/core';
import { Envio } from 'src/app/models/envio.model';
import { EnviosService } from 'src/app/services/envios.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { ProductosService } from 'src/app/services/productos.service';
import { Cliente } from 'src/app/models/cliente.model';
import { Producto } from 'src/app/models/producto.model';

@Component({
  selector: 'app-envios-list',
  templateUrl: './envios-list.component.html',
  styleUrls: ['./envios-list.component.css']
})
export class EnviosListComponent implements OnInit {

  envios?: Envio[];
  currentEnvio: Envio = {};
  currentIndex = -1;
  nombre = '';
  nombreCliente : string;
  nombreProducto : string;
  nombreBodega = '';
  nombrePuerto = '';
  cliente: Cliente;
  producto: Producto;

  constructor(private enviosService: EnviosService,
    private clientesService: ClientesService,
    private productosService: ProductosService,

    ) { }

  ngOnInit(): void {
    this.retrieveEnvios();
  }

  retrieveEnvios(): void {
    this.enviosService.getAll()
      .subscribe({
        next: (data) => {
          this.envios = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveEnvios();
    this.currentEnvio = {};
    this.currentIndex = -1;
  }

  setActiveEnvio(envio: Envio, index: number): void {
    console.log("setActiveEnvio ");
    this.currentEnvio = envio;
    this.currentIndex = index;
    this.traerClienteById(envio.clienteId);
    this.traerProductoById(envio.productoId);
  }

  removeAllEnvios(): void {
    this.enviosService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchNombre(): void {
    this.currentEnvio = {};
    this.currentIndex = -1;

    this.enviosService.findByNombre(this.nombre)
      .subscribe({
        next: (data) => {
          this.envios = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  traerClienteById(id:any): void {
    this.clientesService.get(id)
      .subscribe({
        next: (data) => {
          this.cliente = data;
          console.log("cliente : "+this.cliente.nombre);
          this.nombreCliente = this.cliente.nombre!;  
          //console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  traerProductoById(id:any): void {
    this.productosService.get(id)
      .subscribe({
        next: (data) => {
          this.producto = data;
          console.log(this.producto.nombre);
          this.nombreProducto = this.producto.nombre!;  
        },
        error: (e) => console.error(e)
      });
    
  }
   

}