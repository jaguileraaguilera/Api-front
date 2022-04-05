import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { ListaLibrosComponent } from './lista-libros/lista-libros.component';
import { ListaAutoresComponent } from './lista-autores/lista-autores.component';

@NgModule({
  declarations: [
    AppComponent,
    BusquedaComponent,
    ListaLibrosComponent,
    ListaAutoresComponent
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
