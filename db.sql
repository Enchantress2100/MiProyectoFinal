--crear base de datos libro, resetearla si es que ya existe.
DROP DATABASE libro IF EXISTS;
CREATE DATABASE libro;

--acceder desde consola a la base de datos libro
\c libro

--SELECT * FROM estudiantes;
-- SELECT * FROM apoderados;
-- SELECT * FROM saludEstudiante;
-- SELECT * FROM curso;
-- SELECT * FROM profesores;
-- SELECT * FROM inspectores;
-- SELECT * FROM asistencia;

--crear tablas 

CREATE TABLE estudiantes(
    idAlumno SERIAL,
    rut VARCHAR(12)NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    apellidos VARCHAR(255) NOT NULL,
    edad INT,
    fechaNacimiento DATE NOT NULL,
    foto VARCHAR(255)NOT NULL,
    estado VARCHAR(250),
    PRIMARY KEY (idAlumno)
);

CREATE TABLE apoderados(
    idAlumno INT,
    apoderado VARCHAR(255)NOT NULL,
    numeroApoderado VARCHAR(25)NOT NULL,
    direccion VARCHAR(255)NOT NULL,
    FOREIGN KEY (idAlumno) REFERENCES estudiantes(idAlumno)
);

CREATE TABLE saludEstudiante(
    idAlumno INT,
    alergias VARCHAR(255),
    enfermedades VARCHAR(255),
    FOREIGN KEY (idAlumno) REFERENCES estudiantes(idAlumno)
);

CREATE TABLE profesores(
    idProfesor VARCHAR(12)NOT NULL,
    nombreProfesor VARCHAR(255)NOT NULL,
    pass VARCHAR(255) NOT NULL,
    PRIMARY KEY (idProfesor)
);

CREATE TABLE inspectores(
    idInspector VARCHAR(12)NOT NULL,
    nombreInspector VARCHAR(255)NOT NULL,
    pass VARCHAR(255) NOT NULL,
    PRIMARY KEY (idInspector)
);


CREATE TABLE curso(
    idCursoActual INT NOT NULL,
    idAlumno INT NOT NULL,
    idProfesor VARCHAR(12)NOT NULL,
    idInspector VARCHAR(12)NOT NULL,
    cursoActual VARCHAR(20)NOT NULL,
    PRIMARY KEY (idCursoActual),
    FOREIGN KEY (idAlumno) REFERENCES estudiantes(idAlumno),
    FOREIGN KEY (idProfesor) REFERENCES profesores(idProfesor),
    FOREIGN KEY (idInspector) REFERENCES inspectores(idInspector)
);

CREATE TABLE asistencia(
    idAlumno INT,
    idCursoActual INT NOT NULL,
    fechaHora TIMESTAMP,
    estadoAsistencia VARCHAR(50),
    FOREIGN KEY (idAlumno) REFERENCES estudiantes(idAlumno),
    FOREIGN KEY (idCursoActual) REFERENCES curso(idCursoActual)
);
