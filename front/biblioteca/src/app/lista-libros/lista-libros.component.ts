import { Component, OnInit } from '@angular/core';
import { ServicioLibrosService } from '../servicio-libros.service';

@Component({
  selector: 'app-lista-libros',
  templateUrl: './lista-libros.component.html',
  styleUrls: ['./lista-libros.component.css']
})

class Libro {
  constructor() {
    // POR AQUI SIGO
  }
}

export class ListaLibrosComponent implements OnInit {
  filtrada = false;
  lista_libros = new Array();

  constructor(public datosLibros : ServicioLibrosService) {
    // this.lista_libros = datosLibros.listarLibros();
   }

  ngOnInit(): void {
    this.datosLibros.listarLibros().subscribe(data =>
      this.lista_libros.push(data));
  }

  mostrarLibros() {
    
    let mostrar = []
    if (!this.filtrada) {
      for (let lista of this.lista_libros) {
        for (let libro of lista)
          mostrar.push(libro)
      }
    }
    console.log(mostrar)
    return mostrar
  }

}
