require("dotenv").config();

const { Client } = require("pg");
const db = async () => {
  const client = new Client();
  //{
  //connectionString: process.env.DATABASE_URL,
  // ssl: {
  //rejectUnauthorized: false,
  //},}

  await client.connect();
  const res = await client.query(
    `UPDATE estudiantes
set estado = 'Eliminado'
where estado = 'PendienteEliminar'`
  );
  await client.end();
  return res.rows;
};

module.exports = db;
