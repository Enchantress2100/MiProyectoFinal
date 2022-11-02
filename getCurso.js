require("dotenv").config();

const { Client } = require("pg");
const db = async (curso) => {
  const client = new Client(
  //   {
  //   connectionString: process.env.DATABASE_URL,
  //   ssl: {
  //     rejectUnauthorized: false,
  //   },
    // }
  );
  await client.connect();
  const res = await client.query(
    `SELECT row_number() over (order by estudiantes.Nombre), foto, nombre,apellidos,rut, cursoActual 
FROM CURSO INNER JOIN estudiantes ON curso.idalumno= estudiantes.idalumno 
WHERE cursoActual = '${curso}'
and estudiantes.estado = 'OK'`
  );
  await client.end();
  return res.rows;
};

module.exports = db;
