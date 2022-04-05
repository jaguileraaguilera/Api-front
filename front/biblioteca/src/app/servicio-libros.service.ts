import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ServicioLibrosService {
  readonly endPoint = "http://localhost:5000/"
  constructor(private http : HttpClient) { }

  public listarLibros() {  
    return this.http.get(`${this.endPoint}recuperarTodosLibros`);
  }

  public modificarLibros(id) {  
    return this.http.get(`${this.endPoint}editarLibro/${id}`);
  }

  public modificarLibrosPost(libro) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');  
    return this.http.put(`${this.endPoint}editarLibro/${libro.id}`, libro.toJson(),
    {headers: headers});
  }

  public modificarAutores(id) {  
    return this.http.get(`${this.endPoint}editarAutor/${id}`);
  }
  
  // /**
  //  * Método que accede a todas las personas del servicio rest
  //  * @returns 
  //  */
  // public listar() {
  //   return this.httpClient.get<Persona[]>(`${this.endPoint}personas/`)
  //           .pipe(catchError(this.manejarError))
  // }  

  // /**
  //  * Método que da de alta una persona en el servicio rest. La persona viajará
  //  * en el body en formato Json.
  //  * @param persona 
  //  * @returns 
  //  */
  // public insertar(persona : Persona) : Observable<Persona>{    
  //   let headers = new HttpHeaders();
  //   //En este caso debemos de decir que el contenido que estamos mandando es de tipo
  //   //Json, ya que el servidor Rest solo trabaja con Json
  //   headers = headers.set('Content-Type', 'application/json; charset=utf-8');
  //   return this.httpClient.post<Persona>(
  //                                         this.endPoint + "personas/",
  //                                         persona.toString(),
  //                                         {headers: headers}
  //                                       )
  //           .pipe(catchError(this.manejarError))  
  // }
  
  // /**
  //  * Método que da modifica una persona en el servicio rest. La persona viajará
  //  * en el body en formato Json y el id como path param
  //  * @param persona 
  //  * @returns 
  //  */
  // public modificar(persona : Persona): Observable<any>{   
  //   let headers = new HttpHeaders();
  //   //En este caso debemos de decir que el contenido que estamos mandando es de tipo
  //   //Json, ya que el servidor Rest solo trabaja con Json
  //   headers = headers.set('Content-Type', 'application/json; charset=utf-8');
  //   return this.httpClient.put(`${this.endPoint}personas/${persona.id}`,
  //                               persona.toString(),
  //                               {headers: headers})
  //            .pipe(catchError(this.manejarError))
  // }

  // /**
  //  * Método que elimina a una persona del servicio rest a partir de un id
  //  * @param id 
  //  * @returns 
  //  */
  // public borrar(id : number) : Observable<any>{    
  //   return this.httpClient.delete(`${this.endPoint}personas/${id}`)
  //           .pipe(catchError(this.manejarError))
  // } 

  // /**
  //  * Metodo que maneja los posibles errores de las llamadas al servicio rest
  //  * @param error 
  //  * @returns 
  //  */
  // private manejarError(error: HttpErrorResponse){
  //   let mensajeError = ''
  //   if (error.error instanceof ErrorEvent) {
  //     mensajeError = 'A ocurrido un error:' + error.error
  //   } else {
  //     mensajeError = `El servicio Rest retorno: Status: ${error.status}, ` +
  //           `Body: ${error.error}`
  //   }
  //   console.error(mensajeError)
  //   return throwError(() => new Error(mensajeError));
  // }

  ngOnInit() {

  }
}
