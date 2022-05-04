//ejecutar npm's
//express
const express = require("express");
const app = express();

//directorio de profesores e inspectores
const profesor = require("./public/profesores");
const inspector = require("./public/inspectores");
const inspectorGeneral = require("./public/inspectorGeneral");

//handlebars
const exphbs = require("express-handlebars");
//integrar handlebars como motos de plantillas
app.set("view engine", "handlebars");
//configurar el motor de plantilla con el metodo engine
app.engine(
  "handlebars",
  exphbs.engine({
    layoutsDir: __dirname + "/views",
    partialsDir: __dirname + "/views/componentes",
  })
);

//npm y middleware para subir imagenes al servidor (fileUpload)
const expressFileUpload = require("express-fileupload");
app.use(
  expressFileUpload({
    limits: { fileSize: 5000000 },
    abortOnLimit: true,
    responseOnLimit:
      "el peso de la imagen que ud quiere subir supera el limite permitido",
  })
);

//middleware de bodyParser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//disponibilizar carpeta publica
app.use(express.static("public"));

//middleware para cargar las librerias de bootstrap, y jquery
app.use(
  "/bootstrap",
  express.static(__dirname + "/node_modules/bootstrap/dist/css")
);
app.use("/jquery", express.static(__dirname + "/node_modules/jquery/dist"));
app.use(
  "/BootstrapJs",
  express.static(__dirname + "/node_modules/bootstrap/dist/js/")
);

//jsonwebtoken para admin y para usuarios
const jwt = require("jsonwebtoken");
//password del signature
const secretKey = "Mi llave secreta";

//puerto para levantar el servidor en Heroku
//const port = process.env.PORT || 5000;

//ruta para visualizar las tareas
app.get("/", async (req, res) => {
  res.render("inicio", {
    layout: "inicio",
  });
});

app.get("/profesores", async (req, res) => {
  res.render("profesores", {
    layout: "profesores",
  });
});

app.get("/inspectores", async (req, res) => {
  res.render("inspectores", {
    layout: "inspectores",
  });
});


//levantar el servidor
app.listen(3000, () => console.log("Server on and working OK"));
