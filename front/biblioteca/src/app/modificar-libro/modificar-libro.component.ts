import { Component, OnInit } from '@angular/core';
import { Libro } from '../entidades/libro';
import { ServicioLibrosService } from '../servicio-libros.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-modificar-libro',
  templateUrl: './modificar-libro.component.html',
  styleUrls: ['./modificar-libro.component.css']
})
export class ModificarLibroComponent implements OnInit {
  recogerId="";
  libroModificado=new Array();

  constructor(private route: ActivatedRoute, 
    public listaModificar: ServicioLibrosService){ 
      this.libroModificado=[];
    }

    

  ngOnInit(): void {
    // let id=this.route.snapshot.paramMap.get('id'); 
    this.route.paramMap.subscribe((params : ParamMap)=> {  
      this.recogerId=params.get('id')});

    this.listaModificar.modificarLibros(this.recogerId).subscribe(data =>
      this.libroModificado.push(data));
  }

  modificarGet() {
    let verLibro = [];

    for (let lista_anidada of this.libroModificado) {
      for (let registro of lista_anidada) {
        verLibro.push(new Libro(...registro));
      }
    }
    return verLibro;
  }

}
