require("dotenv").config();

const { Client } = require("pg");
const db = async (curso) => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  await client.connect();
  const res = await client.query(
    `SELECT row_number() over (order by estudiantes.Nombre),foto,nombre,apellidos,rut,apoderado,direccion,numeroApoderado,alergias,enfermedades, asistencia.estadoAsistencia FROM CURSO 
INNER JOIN estudiantes ON curso.idalumno= estudiantes.idalumno
INNER JOIN apoderados ON estudiantes.idalumno=apoderados.idalumno
LEFT JOIN saludestudiante ON estudiantes.idalumno=saludestudiante.idalumno
INNER JOIN asistencia ON estudiantes.idAlumno = asistencia.idAlumno 
WHERE cursoActual='${curso}'
and estudiantes.estado = 'OK'
and to_char( asistencia.fechahora, 'MM-DD-YYYY')= to_char( now(), 'MM-DD-YYYY')`);
  await client.end();
  return res.rows;
};

module.exports = db;
