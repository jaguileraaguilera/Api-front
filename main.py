import json
import pymysql
from random import randrange
import os
from flask import *
from flask_cors import CORS, cross_origin

host = "localhost"
user = "root"
password = ""
database = "biblioteca"
charset = "utf8"

app = Flask(__name__, template_folder='front')
cors=CORS(app)
app.config['CORS_HEADERS'] ='Content-Type'

# public // Creates the db dynamically // Crea la base de datos dinámicamente
@app.route('/creaDB', methods=['POST'])
def creaDB():
    try:
        db = pymysql.connect(host= host, user= user, passwd= password, charset= charset)
        cursor= db.cursor()
        cursor.execute("CREATE DATABASE IF NOT EXISTS " + database)

        db = pymysql.connect(host= host, user= user, passwd= password, db= database, charset= charset)
        cursor= db.cursor()

        with open('./sql/autores.sql','r') as sql_file:
            cursor.execute(sql_file.read())

        with open('./sql/libros.sql','r') as sql_file:
            cursor.execute(sql_file.read())

        __creaAutores()
        __creaLibros()
        
        db.commit()
        db.close()
        return json.dumps([True,"Base de datos creada correctamente"])
    except Exception as e:
        return json.dumps([False,"[ERROR]" + str(e)])


# private // Insert all books from json into "libros" table // Inserta todos los libros del json en la tabla "libros"
def __creaLibros() -> None:

    db = pymysql.connect(host= host, user= user, passwd= password, db= database, charset= charset)
    cursor= db.cursor()

    cursor.execute("DELETE FROM libros")

    with open('./set_libros_1.json', encoding="utf8") as file:
        data = json.load(file)

        for libro in data:
            try:
                autor:str = libro["autor_personas"]
                cursor.execute(f"SELECT id FROM autores WHERE nombre ='{autor}'")
                for item in cursor.fetchall():
                    id_autor = item[0]
            except KeyError as ke:
                try:
                    autor:str = libro["autor_entidades"]
                    cursor.execute(f"SELECT id FROM autores WHERE nombre ='{autor}'")
                    for item in cursor.fetchall():
                        id_autor = item[0]
                except:
                    autor:str = "anonimo"
                    cursor.execute(f"SELECT id FROM autores WHERE nombre ='{autor}'")
                    for item in cursor.fetchall():
                        id_autor = item[0]


            id_libro:str = libro["id_BNE"]
            titulo:str = libro["título"]
            editorial:str = libro["editorial"]
            lugar:str = libro["lugar_publicacion"]
            fecha:str = libro["fecha_publicacion"]
            descripcion:str = libro["descripcion_notas"]

            sentencia:str = f"INSERT INTO libros (id,id_autor,titulo, editorial, lugar_publicacion, fecha, descripcion) VALUE ('{id_libro}',{id_autor},'{titulo}','{editorial}','{lugar}','{fecha}','{descripcion}')"

            cursor.execute(sentencia)

    db.commit()
    data = cursor.fetchone()
    db.close()

# private // Insert all authors from json into "autores" table // Inserta todos los autores en la tabla "autores"
def __creaAutores() -> None:
    provincias = ["Albacete","Alicante","Almeria","Alava","Asturias","Avila","Badajoz","Islas Baleares","Barcelona","Bizkaia","Burgos","Caceres","Cadiz","Cantabria",
    "Castellon","Ciudad Real","Cordoba","A Coruña","Cuenca","Gipuzkoa","Girona","Granada","Guadalajara","Huelva","Huesca","Jaén","León","Lleida","Lugo","Madrid",
    "Málaga","Murcia","Navarra","Ourense","Palencia","Las Palmas","Pontevedra","La Rioja","Salamanca","Santa Cruz de Tenerife","Segovia","Sevilla","Soria","Tarragona","Teruel",
    "Toledo","Valencia","Valladolid","Zamora","Zaragoza","Ceuta","Melilla"]
    
    db = pymysql.connect(host= host, user= user, passwd= password, db= database, charset= charset)
    cursor= db.cursor()
    cursor.execute("SET FOREIGN_KEY_CHECKS = 0;")
    cursor.execute("DELETE FROM autores")

    with open('./set_libros_1.json', encoding="utf8") as file:
        data:json = json.load(file)
        autores_Insertados = []
        for libro in data:
            lugar_nacimiento:str = provincias[randrange(52)]

            try:
                autor:str = libro["autor_personas"]

                if autor not in autores_Insertados:
                    autores_Insertados.append(autor)
                    sentencia:str = "INSERT INTO autores (nombre, lugar_nacimiento) VALUE ('"+autor+"','"+lugar_nacimiento+"')"
                    cursor.execute(sentencia)
            except KeyError as ke:
                try:
                    autor:str = libro["autor_entidades"]

                    if autor not in autores_Insertados:
                        autores_Insertados.append(autor)
                        sentencia:str = "INSERT INTO autores (nombre, lugar_nacimiento) VALUE ('"+autor+"','"+lugar_nacimiento+"')"
                        cursor.execute(sentencia)


                except:
                    autor:str = "anonimo"
                    if autor not in autores_Insertados:
                        autores_Insertados.append(autor)
                        sentencia:str = "INSERT INTO autores (nombre, lugar_nacimiento) VALUE ('"+autor+"','"+lugar_nacimiento+"')"
                        cursor.execute(sentencia)

    db.commit()
    data = cursor.fetchone()
    db.close()

@app.route('/recuperarTodosLibros', methods=['GET'])
def recuperarTodosLibros():
    db = pymysql.connect(host =host, user =user, passwd = password, db = database, charset = charset)
    cursor= db.cursor()
    cursor.execute("SELECT * FROM libros")

    libros =[]
    for item in cursor.fetchall():
        libros.append(item)

    db.commit()
    db.close()
    return Response(json.dumps(libros), mimetype="application/json")

@app.route('/recuperarTodosAutores', methods=['GET'])
def recuperarTodosAutores():
    db = pymysql.connect(host =host, user =user, passwd = password, db = database, charset = charset)
    cursor= db.cursor()
    cursor.execute("SELECT * FROM autores")

    autores =[]
    for item in cursor.fetchall():
        autores.append(item)

    db.commit()
    db.close()
    return Response(json.dumps(autores),mimetype="application/json")

# public // Read the sql file that modify the db // Lee el archivo sql que va a modficar la base de datos
@app.route('/nuevoRegistroPorArchivo', methods=['POST'])
def nuevoRegistroPorArchivo() -> list:
    sqlFile:str = request.form['sqlFile']

    checkExension = os.path.splitext(sqlFile)[-1].lower()
    if checkExension == ".sql":
        try:
            db = pymysql.connect(host= host, user= user, passwd= password, db= database, charset= charset)
            cursor= db.cursor()
            
            with open(sqlFile,'r',encoding='utf8') as sql_file:
                cursor.execute(sql_file.read())

            db.commit()
            db.close()

            return json.dumps([True, "El archivo se ha ejecutado correctamente"])

        except Exception as e:
            return json.dumps([False, "[ERROR]: " + str(e)])

    else:
        return json.dumps([False, "El archivo no es correcto"])

# public // Execute the sql sentence that modify the db // Ejecuta la sentencia sql que modifica la base de datos
# All queries must be splitten with ";" --> show databases;use random_existing_db;
# Las queries deben de estar cada una separada por ";" --> show databases;use random_existing_db;
@app.route('/nuevoRegistroPorTexto', methods=['POST'])
def nuevoRegistroPorTexto()->list:
    sqlQueries:str = request.form['sqlQueries']

    try:
        db = pymysql.connect(host= host, user= user, passwd= password, db= database, charset= charset)
        cursor= db.cursor()
        cursor.execute(sqlQueries)

        db.commit()
        db.close()
        return json.dumps([True, "Se ha registrado correctamente"])   
    except Exception as e:
        return json.dumps([False, "[ERROR]:" + str(e)])

# public // Remove Author // Elimina Autor
@app.route('/eliminarAutor/<id>', methods=['DELETE'])
def eliminarAutor(id)->list:
    id_autor:str = id

    try:
        db = pymysql.connect(host= host, user= user, passwd= password, db= database, charset= charset)
        cursor = db.cursor()
        
        cursor.execute("SET FOREIGN_KEY_CHECKS = 0;")
        cursor.execute(f"DELETE FROM autores WHERE id= {id_autor}")
        cursor.execute(f"DELETE FROM libros WHERE id_autor={id_autor}")
        cursor.execute("SET FOREIGN_KEY_CHECKS = 1;")

        db.commit()
        db.close()

        return Response(json.dumps("eliminado correctamente"),mimetype="application/json")

    except Exception as e:
       
        return Response(json.dumps("An error has ocurred:" +str(e)),mimetype="application/json")


# public // Search book // Busca libro 
@app.route('/realizarBusquedaLibro', methods=['POST']) 
def realizarBusquedaLibro()-> list: # búsqueda por id
    busqueda:str = request.form['busqueda']

    db = pymysql.connect(host =host, user =user, passwd =password, db = database, charset = charset)
    cursor= db.cursor()
    cursor.execute(f"SELECT * FROM libros WHERE id LIKE '%{busqueda}%'")
    libros = []
    for item in cursor.fetchall():
        libros.append(item)
    db.commit()
    db.close()
    return Response(json.dumps(libros), mimetype="application/json")

# public // Creates a new row inside table // Crea una nueva fila dentro de la tabla   
# id_libro must have the same structure that in the db "a1234567"
# id_libro debe de mantener la estructura de la base de datos "a1234567"
@app.route('/addLibro', methods=['POST'])
def addLibro()->list:

    nombre_autor:str = request.form['nombre_autor']
    id_libro:str = request.form['id_libro']

    titulo:str = request.form['titulo']
    editorial:str = request.form['editorial']
    lugar_publicacion:str = request.form['lugar_publicacion']
    fecha:str = request.form['fecha']
    descripcion:str = request.form['descripcion']

    try:
        db = pymysql.connect(host =host, user =user, passwd = password, db = database, charset = charset)
        cursor= db.cursor()

        cursor.execute(f"SELECT id FROM autores WHERE nombre ='{nombre_autor}'")
        for item in cursor.fetchall():
            id_autor:int = item[0]

        cursor.execute("SET FOREIGN_KEY_CHECKS=0")
        sentencia:str = f"INSERT INTO libros (id,id_autor,titulo, editorial, lugar_publicacion, fecha, descripcion) VALUE ('{id_libro}',{id_autor},'{titulo}','{editorial}','{lugar_publicacion}','{fecha}','{descripcion}')"
        cursor.execute(sentencia)
        
        
        cursor.execute("SET FOREIGN_KEY_CHECKS=1")

        
        db.commit()
        db.close()

        return Response(json.dumps("Datos insertados correctamente"),mimetype="application/json")
    except Exception as e:
        return Response(json.dumps("[ERROR]" + str(e)),mimetype="application/json")

@app.route('/addAutor', methods=['POST'])
def addAutor()->list:
    nombre_autor:str = request.form['nombre_autor']    
    lugar_nacimiento:str = request.form['lugar_nacimiento']

    try:
        db = pymysql.connect(host =host, user =user, passwd = password, db = database, charset = charset)
        cursor= db.cursor()
        
        sentencia:str = "INSERT INTO autores (nombre, lugar_nacimiento) VALUE ('"+nombre_autor+"','"+lugar_nacimiento+"')"
        
        cursor.execute(sentencia)
        db.commit()
        db.close()

        return Response(json.dumps("Datos insertados correctamente"),mimetype="application/json")
    except Exception as e:
        return Response(json.dumps("[ERROR]" + str(e)),mimetype="application/json")



# public // Edit the book with the parameters given // Edita el libro con los parametros dados
# Hay que pasar todos los atributos aunque no los vayamos a modificar. No se puede modificar el id del autor.
@app.route('/editarLibro/<id>', methods=['GET', 'PUT'])
def editarLibro(id)->list:
    if request.method == "GET":
        busqueda:str = id
        db = pymysql.connect(host =host, user =user, passwd =password, db = database, charset = charset)
        cursor= db.cursor()
        cursor.execute("SELECT * FROM libros WHERE id= '"+busqueda+"'")
        libros = []
        for item in cursor.fetchall():
            libros.append(item)
        db.commit()
        db.close()
        return Response(json.dumps(libros[0]), mimetype="application/json")
    else:
        id_libro:str = id
        titulo:str = request.form['titulo']
        editorial:str = request.form['editorial']
        lugar_publicacion:str = request.form['lugar_publicacion']
        fecha:str = request.form['fecha']
        descripcion:str = request.form['descripcion']

        try:
            db = pymysql.connect(host= host, user= user, passwd= password, db= database, charset= charset)

            cursor = db.cursor()
            cursor.execute("SET FOREIGN_KEY_CHECKS = 0;")
            cursor.execute("UPDATE libros SET titulo ='"+titulo+"' , editorial ='"+editorial+"' ,lugar_publicacion ='"+lugar_publicacion+"' ,fecha ='"+fecha+"' ,descripcion ='"+descripcion+"'WHERE id='"+id_libro+"'")
            cursor.execute("SET FOREIGN_KEY_CHECKS = 1;")
            
            db.commit()
            db.close()

            return Response(json.dumps("Libro actualizado correctamente"),mimetype="application/json")
        except Exception as e:
            return Response(json.dumps("An error has ocurred:" + str(e)),mimetype="application/json")

@app.route('/editarAutor/<id>', methods=['GET','PUT'])
def editarAutor(id)->list:
    if request.method == "GET":
        busqueda:str = id
        db = pymysql.connect(host =host, user =user, passwd =password, db = database, charset = charset)
        cursor= db.cursor()
        cursor.execute("SELECT * FROM autores WHERE id= '"+busqueda+"'")
        autores = []
        for item in cursor.fetchall():
            autores.append(item)
        db.commit()
        db.close()
        return Response(json.dumps(autores[0]), mimetype="application/json")
    else:
        id_autor:str = id
        nombre:str = request.form['nombre']
        lugar_nacimiento:str = request.form['lugar_nacimiento']

        try:
            db = pymysql.connect(host= host, user= user, passwd= password, db= database, charset= charset)

            cursor = db.cursor()
            cursor.execute("SET FOREIGN_KEY_CHECKS = 0;")
            cursor.execute("UPDATE autores SET nombre ='"+nombre+"',lugar_nacimiento ='"+lugar_nacimiento+f"' WHERE id={id_autor}")
            cursor.execute("SET FOREIGN_KEY_CHECKS = 1;")
            
            db.commit()
            db.close()

            return Response(json.dumps("Autor actualizado correctamente"),mimetype="application/json")
        except Exception as e:
            return Response(json.dumps("An error has ocurred:"+ str(e)),mimetype="application/json")


#TEST FUNCTIONS FOR CALLING FROM FRONT
@app.route('/test',methods=['GET','POST'])
def test():
    print("HOLA", request.form['mydata'])
    # contenido = request.json()
    # return "Contenido " + contenido['texto']
    return "test1"

@app.route('/test2',methods=['GET','POST'])
def test2():
    print("HOLAefewfw", request.form['mydata'])
    # contenido = request.json()
    # return "Contenido " + contenido['texto']
    return "test2"

# FUNTION FOR LOADING HTML FROM FLASK
@app.route('/')
def home():
    print("WEofewfew")
    return render_template('index.html')

if __name__ == "__main__":
    #creaDB()
    app.run()