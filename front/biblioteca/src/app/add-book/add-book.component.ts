import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioLibrosService } from '../servicio-libros.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  constructor( private router: Router, public datosLibros : ServicioLibrosService) { }

  ngOnInit(): void {
  }

  add_book () {
    this.router.navigate(['']);
  }

}
