import { Component, Input, OnInit } from '@angular/core';
import { EnviosService } from 'src/app/services/envios.service';
import { ProductosService } from 'src/app/services/productos.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Envio } from 'src/app/models/envio.model';
import { Cliente } from 'src/app/models/cliente.model';
import { Producto } from 'src/app/models/producto.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-envios-deta',
  templateUrl: './envios-deta.component.html',
  styleUrls: ['./envios-deta.component.css']
})
export class EnviosDetaComponent implements OnInit {
  myVar1 = false;
  myVar2 = false;

  clientes?: Cliente[];
  productos?: Producto[];
  producto?: Producto;

  @Input() viewMode = false;
  @Input() nombreCliente: any ;
  @Input() nombreProducto: any ;

  @Input() currentEnvio: Envio = {
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
  
  message = '';

  constructor(
    private enviosService: EnviosService,
    private productosService: ProductosService,
    private clientesService: ClientesService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getenvio(this.route.snapshot.params["id"]);
    }
    this.traerClientes();
    this.traerProductos();
  }

  getenvio(id: string): void {
    console.log("getenvio");
    this.enviosService.get(id)
      .subscribe({
        next: (data) => {
          this.currentEnvio = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateEnvio(): void {
    console.log("updateEnvio()");
    //swal.fire('Hello world!');

    this.message = '';

    this.enviosService.update(this.currentEnvio.id, this.currentEnvio)
      .subscribe({
        next: (res) => {
          //console.log(res);
          //this.message = res.message ? res.message : 'This envio was updated successfully!';
          this.router.navigate(['/envios'])
        },
        //error: (e) => swal.fire(e)
        error: (e) => {
          if(e.status==418){
            swal.fire('El envio solo puede tener bodega o puerto. No ambos');
          }
  
          console.error("xxxxxxxxxxxxxxxxxx : "+e.status)
        }
      });
  }

  deleteEnvio(): void {
    console.log("curr : "+this.currentEnvio.id)
    this.enviosService.delete(this.currentEnvio.id)
      .subscribe({
        next: (res) => {
          console.log("res : "+res);
          //this.router.navigate(['/bodegas']);
          this.router.navigate(['/envios'])
            .then(() => {
              window.location.reload();
            });
        },
        error: (e) => console.error("error : "+e)
      });
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
  
  traerProductoById(id:any): void {
    this.productosService.get(id)
      .subscribe({
        next: (data) => {
          this.producto = data;
          return this.producto.nombre;  
          //console.log(data);
        },
        error: (e) => console.error(e)
      });
    
  }
   
onChangeClientes(evento:Event){
  //this.currentEnvio.clienteId
  //console.log("onChangeClientes : "+evento);
}

changeCheck(){
  if(this.myVar2){
    this.currentEnvio.internacional="S"
  } else{
    this.currentEnvio.internacional="N"
  }
  console.log("changeCheck : "+this.currentEnvio.internacional);
}

  recalcula(ev: Event) {
  if (this.currentEnvio.bodegaId==null&&this.currentEnvio.puertoId==null){
    swal.fire('No se puede recalcular total con bodega y puerto en nulo.  Seleccione bodega o puerto');
    return;
  }
  if (this.currentEnvio.bodegaId!=null&&this.currentEnvio.puertoId!=null){
    swal.fire('No se puede recalcular total con bodega y puerto no nulo. Seleccione bodega o puerto');
    return;
  }
  if (this.currentEnvio.bodegaId!=null){
    if (this.currentEnvio.cantidad!>10){
      this.currentEnvio.descuento=5;
    } else {
      this.currentEnvio.descuento=0;
    }
  }
  if (this.currentEnvio.puertoId!=null){
    if (this.currentEnvio.cantidad!>10){
      this.currentEnvio.descuento=3;
    } else {
      this.currentEnvio.descuento=0;
    }
  }
  this.currentEnvio.total = this.currentEnvio.precio!*this.currentEnvio.cantidad!*(1-this.currentEnvio.descuento!/100);
}

}
