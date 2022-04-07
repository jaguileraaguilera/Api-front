import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaLibrosComponent } from './lista-libros/lista-libros.component';
import { ModificarAutorComponent } from './modificar-autor/modificar-autor.component';
import { ModificarLibroComponent } from './modificar-libro/modificar-libro.component';
import { ListaAutoresComponent } from './lista-autores/lista-autores.component';
import { AddBookComponent } from './add-book/add-book.component';
import { AddAuthorComponent } from './add-author/add-author.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaLibrosComponent,
    ModificarAutorComponent,
    ModificarLibroComponent,
    ListaLibrosComponent,
    ListaAutoresComponent,
    AddBookComponent,
    AddAuthorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
