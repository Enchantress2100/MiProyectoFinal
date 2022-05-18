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
    `UPDATE estudiantes
set estado = 'PendienteEliminar'
where rut = '${rut}'
`);
  await client.end();
  return res.rows;
};

module.exports = db;
