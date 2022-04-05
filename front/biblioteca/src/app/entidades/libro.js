export class Libro {
    id;
    id_autor;
    titulo;
    editorial;
    lugar_publicacion;
    fecha;
    descripcion;

    constructor(id, id_autor, titulo, editorial, lugar_publicacion, fecha, descripcion) {
        this.id = id;
        this.id_autor = id_autor;
        this.titulo = titulo;
        this.editorial = editorial;
        this.lugar_publicacion = lugar_publicacion;
        this.fecha = fecha;
        this.descripcion = descripcion;
    }
}
