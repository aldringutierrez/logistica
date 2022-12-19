import { Component, Input, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente.model';

@Component({
  selector: 'app-clientes-deta',
  templateUrl: './clientes-deta.component.html',
  styleUrls: ['./clientes-deta.component.css']
})
export class ClientesDetaComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentCliente: Cliente = {
    nombre: '',
    direccion: '',
    email: '',
    telefono: 0
  };
  
  message = '';

  constructor(
    private clientesService: ClientesService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getcliente(this.route.snapshot.params["id"]);
    }
  }

  getcliente(id: string): void {
    this.clientesService.get(id)
      .subscribe({
        next: (data) => {
          this.currentCliente = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updatePublished(status: boolean): void {
    const data = {
      nombre: this.currentCliente.nombre,
      direccion: this.currentCliente.direccion,
      email: this.currentCliente.email,
      telefono: this.currentCliente.direccion
    };

    this.message = '';

    this.clientesService.update(this.currentCliente.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          //this.currentcliente.published = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateCliente(): void {
    this.message = '';

    this.clientesService.update(this.currentCliente.id, this.currentCliente)
      .subscribe({
        next: (res) => {
          //console.log(res);
          //this.message = res.message ? res.message : 'This cliente was updated successfully!';
          this.router.navigate(['/clientes'])
        },
        error: (e) => console.error(e)
      });
  }

  deleteCliente(): void {
    console.log("curr : "+this.currentCliente.id)
    this.clientesService.delete(this.currentCliente.id)
      .subscribe({
        next: (res) => {
          console.log("res : "+res);
          //this.router.navigate(['/bodegas']);
          this.router.navigate(['/clientes'])
            .then(() => {
              window.location.reload();
            });
        },
        error: (e) => console.error("error : "+e)
      });
  }

}