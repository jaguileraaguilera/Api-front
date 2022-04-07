import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaAutoresComponent } from './lista-autores/lista-autores.component';
import { ListaLibrosComponent } from './lista-libros/lista-libros.component';
import { ModificarLibroComponent } from './modificar-libro/modificar-libro.component';
import { AddBookComponent } from './add-book/add-book.component';
import { AddAuthorComponent } from './add-author/add-author.component';

const routes: Routes = [
  { path: '', component: ListaLibrosComponent },
  { path: '', component: ListaAutoresComponent, outlet:'secondary'},
  { path: 'modificarLibro/:id', component: ModificarLibroComponent},
  { path: 'addLibro', component: AddBookComponent},
  { path: 'addAutor', component: AddAuthorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
