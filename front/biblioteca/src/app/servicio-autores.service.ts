import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ServicioAutoresService {
  readonly endPoint = "http://localhost:5000/";
  constructor(private http : HttpClient) { }

  public listarAutores() {  
    return this.http.get(`${this.endPoint}recuperarTodosAutores`);
  }

  public borrarAutor(id) {
    console.log(id);
    // this.http.get(`${this.endPoint}recuperarTodosAutores`);
    try {
      return this.http.delete(`${this.endPoint}eliminarAutor/${id}`);
    }
    catch {
      console.log("error");
    }
  }
}