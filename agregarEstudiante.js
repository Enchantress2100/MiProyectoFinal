require("dotenv").config();

const { Client } = require("pg");
const db = async (curso, rut, nombre, apellidos, edad, fechaNacimiento, foto, apoderado, numeroApoderado, direccion,alergias,salud) => {
  const client = new Client();
  //{
  //connectionString: process.env.DATABASE_URL,
  // ssl: {
  //rejectUnauthorized: false,
  //},}
    
  await client.connect();
  const res = await client.query(
    `INSERT INTO estudiantes(rut,nombre,apellidos,edad,fechaNacimiento,foto, estado) VALUES('${rut}','${nombre}','${apellidos}','${edad}','${fechaNacimiento}','${foto}', 'Pendiente');
INSERT INTO apoderados (idAlumno, apoderado, numeroApoderado, direccion) VALUES ((SELECT idAlumno FROM estudiantes WHERE rut='${rut}'),'${apoderado}','${numeroApoderado}','${direccion}');
INSERT INTO saludEstudiante(idAlumno, alergias, enfermedades) VALUES ((SELECT idAlumno from estudiantes where rut='${rut}'),'${alergias}','${salud}');
INSERT INTO curso (idCursoActual, idAlumno,idProfesor, idInspector, cursoActual)VALUES((SELECT idAlumno from estudiantes where rut='${rut}'),(SELECT idAlumno from estudiantes where rut='${rut}'),(SELECT idProfesor from curso where CursoActual = '${curso}' FETCH FIRST 1 ROW ONLY),(select idInspector from curso where CursoActual = '${curso}' FETCH FIRST 1 ROW ONLY),'${curso}');`
  );
  await client.end();
  return res.rows;
};

module.exports = db;
