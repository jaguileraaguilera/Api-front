import { Component, OnInit } from '@angular/core';
import { ServicioLibrosService } from '../servicio-libros.service';
import { Libro } from '../entidades/libro';

@Component({
  selector: 'app-lista-libros',
  templateUrl: './lista-libros.component.html',
  styleUrls: ['./lista-libros.component.css']
})

export class ListaLibrosComponent implements OnInit {
  filtro_busqueda = "";
  lista_libros = new Array();

  constructor(public datosLibros : ServicioLibrosService) {
  }

  ngOnInit(): void {
    this.datosLibros.listarLibros().subscribe(data =>
      this.lista_libros.push(data));
  }

  mostrarLibros() {
    let mostrar = [];

    for (let lista_anidada of this.lista_libros) {
      for (let registro of lista_anidada) {
        let libro = new Libro(...registro);

        if (!this.filtro_busqueda)
          mostrar.push(libro);
        else {
          if (libro.id.includes(this.filtro_busqueda))
            mostrar.push(libro);
        }
      }
    }

    return mostrar;
  }
}
