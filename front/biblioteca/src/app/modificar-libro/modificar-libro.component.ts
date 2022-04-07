import { Component, OnInit } from '@angular/core';
import { Libro } from '../entidades/libro';
import { ServicioLibrosService } from '../servicio-libros.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modificar-libro',
  templateUrl: './modificar-libro.component.html',
  styleUrls: ['./modificar-libro.component.css']
})
export class ModificarLibroComponent implements OnInit {
  recogerId="";
  libroModificado=new Array();

  comprobarForm=new FormGroup({
    id_libro:new FormControl(''),
    titulo:new FormControl(''),
    editorial:new FormControl(''),
    lugar_publicacion:new FormControl(''),
    fecha:new FormControl(''),
    descripcion:new FormControl('')
  })

  constructor(private route: ActivatedRoute, 
    public listaModificar: ServicioLibrosService, 
    //private formBuilder: FormBuilder,
    private router: Router){ 
      this.libroModificado=[];
    }
    

  ngOnInit(): void {

    // this.route.paramMap.subscribe((params : ParamMap)=> {  
    //   this.recogerId=params.get('id')});

    this.listaModificar.modificarLibros(this.route.snapshot.paramMap.get('id')).subscribe(data =>
      this.comprobarForm=new FormGroup({
        id_libro:new FormControl(data['id']),
        titulo:new FormControl(data['titulo']),
        editorial:new FormControl(data['editorial']),
        lugar_publicacion:new FormControl(data['lugar_publicacion']),
        fecha:new FormControl(data['fecha']),
        descripcion:new FormControl(data['descripcion'])
      })
    )
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

  modificarPost() {
    console.log("Entran los datos del form")
    this.listaModificar.modificarLibrosPost(this.comprobarForm.value);
    this.router.navigate(['']);
  }

}
