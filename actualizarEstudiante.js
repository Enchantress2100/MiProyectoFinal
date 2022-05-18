require("dotenv").config();

const { Client } = require("pg");
const db = async (curso,rut,nombre,apellidos,edad,apoderado,numeroApoderado,direccion,alergias,salud) => {
  const client = new Client();
  //{
  //connectionString: process.env.DATABASE_URL,
  // ssl: {
  //rejectUnauthorized: false,
  //},}
  await client.connect();
  const res = await client.query(
    `UPDATE curso
    SET cursoActual = '${curso}',
    idProfesor = (select idProfesor from curso where cursoActual = '${curso}' FETCH FIRST 1 ROW ONLY)
where idAlumno = (Select idAlumno from estudiantes where rut = '${rut}');

UPDATE estudiantes
SET nombre = '${nombre}', 
    apellidos = '${apellidos}',
    edad = '${edad}',
    estado= 'Pendiente'
where idAlumno = (Select idAlumno from estudiantes where rut = '${rut}');

UPDATE apoderados
SET apoderado = '${apoderado}',
    numeroApoderado = '${numeroApoderado}',
    direccion = '${direccion}'
where idAlumno = (Select idAlumno from estudiantes where rut = '${rut}');

UPDATE saludEstudiante
set alergias = '${alergias}',
    enfermedades = '${salud}'
where idAlumno = (Select idAlumno from estudiantes where rut = '${rut}');`
  );
  await client.end();
  return res.rows;
};

module.exports = db;
