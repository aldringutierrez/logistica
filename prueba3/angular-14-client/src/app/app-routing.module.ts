import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesListComponent } from './components/clientes/clientes-list/clientes-list.component';
import { ClientesDetaComponent } from './components/clientes/clientes-deta/clientes-deta.component';
import { ClienteAddComponent } from './components/clientes/cliente-add/cliente-add.component';
import { ProductosListComponent } from './components/productos/productos-list/productos-list.component';
import { ProductosDetaComponent } from './components/productos/productos-deta/productos-deta.component';
import { ProductosAddComponent } from './components/productos/productos-add/productos-add.component';
import { BodegasComponent } from './components/bodegas/bodegas.component';
import { PuertosComponent } from './components/puertos/puertos.component';
import { EnviosListComponent } from './components/envios/envios-list/envios-list.component';
import { EnviosDetaComponent } from './components/envios/envios-deta/envios-deta.component';
import { EnviosAddComponent } from './components/envios/envios-add/envios-add.component';

const routes: Routes = [
  { path: '', redirectTo: 'envios', pathMatch: 'full' },
  { path:'envios',component:EnviosListComponent},
  { path:'envios/add2', component: EnviosAddComponent },
  { path:'envios/:id', component: EnviosDetaComponent },
  { path:'clientes',component:ClientesListComponent},
  { path:'clientes/add2', component: ClienteAddComponent },
  { path:'clientes/:id', component: ClientesDetaComponent },
  { path:'productos',component:ProductosListComponent},
  { path:'productos/add2', component: ProductosAddComponent },
  { path:'productos/:id', component: ProductosDetaComponent },
  { path:'bodegas',component:BodegasComponent},
  { path:'puertos',component:PuertosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }