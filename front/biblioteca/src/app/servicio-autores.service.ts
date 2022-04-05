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
}