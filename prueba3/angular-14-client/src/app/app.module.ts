import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


import { BodegasComponent } from './components/bodegas/bodegas.component';
import { PuertosComponent } from './components/puertos/puertos.component';
import { ClientesListComponent } from './components/clientes/clientes-list/clientes-list.component';
import { ClientesDetaComponent } from './components/clientes/clientes-deta/clientes-deta.component';
import { ClienteAddComponent } from './components/clientes/cliente-add/cliente-add.component';
import { ProductosListComponent } from './components/productos/productos-list/productos-list.component';
import { ProductosDetaComponent } from './components/productos/productos-deta/productos-deta.component';
import { ProductosAddComponent } from './components/productos/productos-add/productos-add.component';
import { EnviosListComponent } from './components/envios/envios-list/envios-list.component';
import { EnviosDetaComponent } from './components/envios/envios-deta/envios-deta.component';
import { EnviosAddComponent } from './components/envios/envios-add/envios-add.component';

@NgModule({
  declarations: [
    AppComponent,
    BodegasComponent,
    PuertosComponent,
    ClientesListComponent,
    ClientesDetaComponent,
    ClienteAddComponent,
    ProductosListComponent,
    ProductosDetaComponent,
    ProductosAddComponent,
    EnviosListComponent,
    EnviosDetaComponent,
    EnviosAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
