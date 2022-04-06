import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaAutoresComponent } from './lista-autores/lista-autores.component';
import { ListaLibrosComponent } from './lista-libros/lista-libros.component';
import { ModificarLibroComponent } from './modificar-libro/modificar-libro.component';

const routes: Routes = [
  { path: '', component: ListaLibrosComponent },
  { path: '', component: ListaAutoresComponent, outlet:'secondary'},
  { path: 'modificarLibro/:id', component: ModificarLibroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
