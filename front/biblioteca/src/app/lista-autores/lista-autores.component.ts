import { Component, OnInit } from '@angular/core';
import { ServicioAutoresService } from '../servicio-autores.service';
import { Autor } from '../entidades/autor';

@Component({
  selector: 'app-lista-autores',
  templateUrl: './lista-autores.component.html',
  styleUrls: ['./lista-autores.component.css']
})
export class ListaAutoresComponent implements OnInit {
  lista_autores = new Array();

  constructor(public datosAutores : ServicioAutoresService) {
  }

  ngOnInit(): void {
    this.datosAutores.listarAutores().subscribe(data =>
      this.lista_autores.push(data));
  }

  mostrarAutores() {
    // console.log(this.lista_autores);
    let mostrar = [];

    for (let lista_anidada of this.lista_autores) {
      for (let registro of lista_anidada) {
        mostrar.push(new Autor(...registro));
        }
      }

    return mostrar;
  }

  eliminarAutor(id) {
    this.datosAutores.borrarAutor(id).subscribe((data) =>  window.location.reload());
  }
}
