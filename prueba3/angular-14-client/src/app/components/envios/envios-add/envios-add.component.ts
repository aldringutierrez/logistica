import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Envio } from 'src/app/models/envio.model';
import { Cliente } from 'src/app/models/cliente.model';
import { Producto } from 'src/app/models/producto.model';
import { EnviosService } from 'src/app/services/envios.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { ProductosService } from 'src/app/services/productos.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-envios-add',
  templateUrl: './envios-add.component.html',
  styleUrls: ['./envios-add.component.css']
})
export class EnviosAddComponent implements OnInit {

  clientes?: Cliente[];
  productos?: Producto[];


  envio: Envio = {
    clienteId:null,
    productoId:null,
    bodegaId:null,
    puertoId:null,
    cantidad: 0,
    precio: 0,
    descuento: 0,
    total: 0,
    fechaRegistro: new Date(),
    fechaEntrega: new Date(),
    placa: '',
    flota: '',
    guia: '',
    internacional: ''
  };
  submitted = false;

  constructor(private enviosService: EnviosService,
        private clientesService: ClientesService,
        private productosService: ProductosService,
        private route: ActivatedRoute,
        private router: Router) { }

  ngOnInit(){
    this.traerClientes();
    this.traerProductos();

  }

  saveEnvio(): void {
    const data = {
      clienteId		: this.envio.clienteId		,
      productoId		: this.envio.productoId	,
      bodegaId		: this.envio.bodegaId		,
      puertoId		: this.envio.puertoId		,
      cantidad		: this.envio.cantidad		,
      precio			: this.envio.precio			,
      descuento		: this.envio.descuento		,
      total			: this.envio.total			,
      fechaRegistro	: this.envio.fechaRegistro	,
      fechaEntrega	: this.envio.fechaEntrega	,
      placa			: this.envio.placa			,
      flota			: this.envio.flota			,
      guia			: this.envio.guia			,
      internacional	: this.envio.internacional	
      };

    console.log("saveEnvio()");  
    this.enviosService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          //this.submitted = true;
          this.router.navigate(['/envios']);
        },
        error: (e) => {
          if(e.status==418){
            swal.fire('El envio solo puede tener bodega o puerto. No ambos');
          }
          //console.error(e)
        }
      });
  }

  newEnvio(): void {
    this.submitted = false;
    this.envio = {
      clienteId:null,
      productoId:null,
      bodegaId:null,
      puertoId:null,
      cantidad: 0,
      precio: 0,
      descuento: 0,
      total: 0,
      fechaRegistro: new Date(),
      fechaEntrega: new Date(),
      placa: '',
      flota: '',
      guia: '',
      internacional: ''
      };
  }
  traerClientes(): void {
    this.clientesService.getAll()
      .subscribe({
        next: (data) => {
          this.clientes = data;
          //console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  
  traerProductos(): void {
    this.productosService.getAll()
      .subscribe({
        next: (data) => {
          this.productos = data;
          //console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  
  recalcula(ev:Event) {
    if (this.envio.bodegaId==null&&this.envio.puertoId==null){
      swal.fire('No se puede recalcular total con bodega y puerto en nulo.  Seleccione bodega o puerto');
      return;
    }
    if (this.envio.bodegaId!=null&&this.envio.puertoId!=null){
      swal.fire('No se puede recalcular total con bodega y puerto no nulo. Seleccione bodega o puerto');
      return;
    }
    if (this.envio.bodegaId!=null){
      if (this.envio.cantidad!>10){
        this.envio.descuento=5;
      } else {
        this.envio.descuento=0;
      }
    }
    if (this.envio.puertoId!=null){
      if (this.envio.cantidad!>10){
        this.envio.descuento=3;
      } else {
        this.envio.descuento=0;
      }
    }
    console.log("this.envio.precio : "+this.envio.precio)
    console.log("this.envio.cantidad : "+this.envio.cantidad)
    console.log("this.envio.descuento : "+this.envio.descuento)
    this.envio.total = this.envio.precio!*this.envio.cantidad!*(1-this.envio.descuento!/100);
  }

}