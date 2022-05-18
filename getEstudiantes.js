require("dotenv").config();

const { Client } = require("pg");
const db = async (rut) => {
  const client = new Client();
  //{
  //connectionString: process.env.DATABASE_URL,
  // ssl: {
  //rejectUnauthorized: false,
  //},}
    await client.connect();
  const res = await client.query(
    `select es.nombre, es.apellidos, es.edad, es.rut, es.fechaNacimiento,
    ap.apoderado, ap.numeroApoderado, ap.direccion,sa.alergias, sa.enfermedades,
    cu.cursoActual from estudiantes as es
inner join apoderados as ap ON ap.idAlumno = es.idAlumno
left join saludEstudiante as sa ON sa.idAlumno = es.idAlumno
inner join curso as cu ON cu.idAlumno = es.idAlumno
where es.rut = '${rut}' 
and es.estado = 'OK' FETCH FIRST 1 ROW ONLY`
  );
  await client.end();
  return res.rows;
};

module.exports = db;
