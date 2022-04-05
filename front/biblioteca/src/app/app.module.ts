import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AutorComponent } from './autor/autor.component';
import { ListaLibrosComponent } from './lista-libros/lista-libros.component';
import { ModificarComponent } from './modificar/modificar.component';
import { LibroComponent } from './libro/libro.component';
import { ModificarAutorComponent } from './modificar-autor/modificar-autor.component';
import { ModificarLibroComponent } from './modificar-libro/modificar-libro.component';

@NgModule({
  declarations: [
    AppComponent,
    BusquedaComponent,
    AutorComponent,
    ListaLibrosComponent,
    ModificarComponent,
    LibroComponent,
    ModificarAutorComponent,
    ModificarLibroComponent
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
