import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css']
})
export class ClientesListComponent implements OnInit {

  clientes?: Cliente[];
  currentCliente: Cliente = {};
  currentIndex = -1;
  nombre = '';

  constructor(private clientesService: ClientesService) { }

  ngOnInit(): void {
    this.retrieveClientes();
  }

  retrieveClientes(): void {
    this.clientesService.getAll()
      .subscribe({
        next: (data) => {
          this.clientes = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveClientes();
    this.currentCliente = {};
    this.currentIndex = -1;
  }

  setActiveCliente(cliente: Cliente, index: number): void {
    //console.log("xxxxxxxxxxxxxxxxxxx");
    this.currentCliente = cliente;
    this.currentIndex = index;
  }

  removeAllClientes(): void {
    this.clientesService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchNombre(): void {
    this.currentCliente = {};
    this.currentIndex = -1;

    this.clientesService.findByNombre(this.nombre)
      .subscribe({
        next: (data) => {
          this.clientes = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}