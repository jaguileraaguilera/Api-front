import { Component, OnInit } from '@angular/core';
import { Libro } from '../entidades/libro';
import { ServicioLibrosService } from '../servicio-libros.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-modificar-libro',
  templateUrl: './modificar-libro.component.html',
  styleUrls: ['./modificar-libro.component.css']
})
export class ModificarLibroComponent implements OnInit {
  recogerId="";
  libroModificado=new Array();

  comprobarForm=this.formBuilder.group({
    id:'',
    id_autor:'',
    titulo:'',
    editorial:'',
    lugar_publicacion:'',
    fecha:'',
    descripcion:'',
  })

  constructor(private route: ActivatedRoute, 
    public listaModificar: ServicioLibrosService, 
    private formBuilder: FormBuilder,
    private router: Router){ 
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

  modificarPost() {
    console.log("Entran los datos del form")
    this.listaModificar.modificarLibrosPost(this.comprobarForm.value);
    this.router.navigate(['']);
  }

  // onSubmit(): void {
  //   // Process checkout data here
  //   this.items = this.cartService.clearCart();
  //   console.warn('Your order has been submitted', this.checkoutForm.value);
  //   this.checkoutForm.reset();
  // }

}
