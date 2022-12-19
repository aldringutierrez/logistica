import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente.model';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-cliente-add',
  templateUrl: './cliente-add.component.html',
  styleUrls: ['./cliente-add.component.css']
})
export class ClienteAddComponent implements OnInit {
  cliente: Cliente = {
    nombre: '',
    direccion: ''
  };
  submitted = false;

  constructor(private clientesService: ClientesService,
        private route: ActivatedRoute,
        private router: Router) { }

  ngOnInit(){

  }

  saveCliente(): void {
    const data = {
      nombre: this.cliente.nombre,
      direccion: this.cliente.direccion,
      email: this.cliente.email,
      telefono: this.cliente.telefono
    };

    this.clientesService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          //this.submitted = true;
          this.router.navigate(['/clientes']);
        },
        error: (e) => console.error(e)
      });
  }

  newCliente(): void {
    this.submitted = false;
    this.cliente = {
      nombre: '',
      direccion: ''
    };
  }

}