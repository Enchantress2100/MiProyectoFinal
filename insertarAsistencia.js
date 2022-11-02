require("dotenv").config();

const { Client } = require("pg");
const db = async (rut, estado) => {
  const client = new Client(
    //{
  //   connectionString: process.env.DATABASE_URL,
  //   ssl: {
  //     rejectUnauthorized: false,
  //   },
  // }
  );
  await client.connect();
  const res = await client.query(
    `insert into asistencia (idAlumno, idCursoActual, fechaHora, estadoasistencia)
    values((select idAlumno from estudiantes where rut = '${rut}'),(select idCursoActual from curso where idAlumno = (select idAlumno from estudiantes where rut = '${rut}')), now(), '${estado}');`
  );
  await client.end();
  return res.rows;
};

module.exports = db;
