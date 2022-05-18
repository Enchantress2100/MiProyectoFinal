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


//visualizar estudiantes por curso (profesores)
const getCurso = require('./getCurso')
//visualizar estudiantes por curso (inspectores)
const getCursoInspector = require('./getCursoInspector')
//insertar estudiantes desde la interfaz de inspector
const insertarEstudiante = require('./agregarEstudiante')
//editar registro de estudiantes desde la interfaz de inspector
const editarEstudiante = require('./actualizarEstudiante')
//visualizar estudiantes por rut (para editar o )
const getEstudiantes = require('./getEstudiantes')
//eliminar registro de estudiantes por rut
const eliminarRegistro = require('./eliminarRegistro')
//traer cambios a confirmar
const traerCambios = require('./traerCambios')
//traer registros s borrar
const traerEliminacion = require('./traerPendientesEliminacion')
//confirmar cambios
const confirmarCambios=require('./confirmarCambios')
//confirmar eliminaciones
const confirmarEliminacion = require('./confirmarEliminacion')

//ruta para visualizar las tareas
app.get("/", async (req, res) => {
  res.render("inicio", {
    layout: "inicio",
  });
});

//ruta Login para profesores, inspectores e inspector general
app.get("/loginP", (req, res) => {
  res.render("profesores", {
    layout: "profesores",
  });
});

app.get("/loginI", (req, res) => {
  res.render("inspectores", {
    layout: "inspectores",
  });
});

app.get("/loginIG", (req, res) => {
  res.render("inspectorGeneral", {
    layout: "inspectorGeneral",
  });
});

//visualizar validacion del ingreso para profesores
app.get('/loginProfesor', async (req, res) => {
  const { nombre,email, password } = req.query
  const profesores = profesor.find((p) => p.email == email && p.password == password)
  if (profesores) {
    const token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + 120,
      data: profesores
    }, secretKey);
    res.send(
      `<script>alert("Bienvenid@ profesor@ ${profesores.nombre} ");window.location.href = "/Dashboard?token=${token}"</script>`);
  } else {
    res.status(401).send(
        `<script>alert("Credenciales erróneas"); window.location.href = "/"</script>`
      )
    } 
  })
//email: "mconsuelo.gomezt@gmail.com",
//password: "profesoraconsuelo2100",

//disponibilizar ruta restringida para los profesores autorizados. En caso contrario devolver mensaje de error y su descripcion (estado HTTP)
  app.get("/Dashboard", (req, res) => {
    const { token } = req.query;
    jwt.verify(token, secretKey, (err, { data: profesor }) => {
      err
        ? res.status(401).send({
            error: "401 Unauthorized",
            message: "no está autorizado a acceder a esta página",
          })
        : res.render("loginExitoProfesor", {
          layout: "loginExitoProfesor",
          profesor
          });
    });
  });

//visualizar validacion del ingreso para inspectores
app.get("/loginInspector", async (req, res) => {
  const { nombre, email, password } = req.query;
  const inspectores = inspector.find(
    (i) => i.email == email && i.password == password
  );
  if (inspectores) {
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 120,
        data: inspectores,
      },
      secretKey
    );
    res.send(
      `<script>alert("Bienvenid@ Inspector@ ${inspectores.nombre} ");window.location.href = "/Dashboard2?token=${token}"</script>`
    );
  } else {
    res
      .status(401)
      .send(
        `<script>alert("Credenciales erróneas"); window.location.href = "/"</script>`
      );
  }
});

//disponibilizar ruta restringida para los inspectores autorizados. En caso contrario devolver mensaje de error y su descripcion (estado HTTP)
  app.get("/Dashboard2", (req, res) => {
    const { token } = req.query;
    jwt.verify(token, secretKey, (err, { data: inspector} ) => {
      err
        ? res.status(401).send({
            error: "401 Unauthorized",
            message: "no está autorizado a acceder a esta página",
          })
        : res.render("loginExitoInspector", {
          layout: "loginExitoInspector",
          inspector
          });
    });
  });
  //email: 'pilar.apablazap@gmail.com',
  //password: 'pilarapablaza2006',

  //visualizar listas de curso (vista profesores)
  //1ro.basico
app.get("/listaCursoProfesor1", async (req, res) => {
  const curso = await getCurso('Primero Basico')
  const c= 'Primero Básico'
    res.render("listaCursoProfesor", {
      layout: "listaCursoProfesor",
      curso,
      c,
    });
});
  //2do.Basico
app.get("/listaCursoProfesor2", async (req, res) => {
  const curso = await getCurso("Segundo Basico");
  const c = "Segundo Básico";
  res.render("listaCursoProfesor", {
    layout: "listaCursoProfesor",
    curso,
    c
  });
});
  //3ro.Basico
app.get("/listaCursoProfesor3", async (req, res) => {
  const curso = await getCurso("Tercero Basico");
  const c = "Tercero Básico";
  res.render("listaCursoProfesor", {
    layout: "listaCursoProfesor",
    curso,
    c
  });
});
  //4to.Basico
app.get("/listaCursoProfesor4", async (req, res) => {
  const curso = await getCurso("Cuarto Basico");
  const c = "Cuarto Básico";
  res.render("listaCursoProfesor", {
    layout: "listaCursoProfesor",
    curso,
    c
  });
});
  //5to.Basico
app.get("/listaCursoProfesor5", async (req, res) => {
  const curso = await getCurso("Quinto Basico");
  const c = "Quinto Básico";
  res.render("listaCursoProfesor", {
    layout: "listaCursoProfesor",
    curso,
    c
  });
});
  //6to.Basico
app.get("/listaCursoProfesor6", async (req, res) => {
  const curso = await getCurso("Sexto Basico");
  const c = "Sexto Básico";
  res.render("listaCursoProfesor", {
    layout: "listaCursoProfesor",
    curso,
    c
  });
});
  //7mo.Basico
app.get("/listaCursoProfesor7", async (req, res) => {
  const curso = await getCurso("Septimo Basico");
  const c = "Séptimo Básico";
  res.render("listaCursoProfesor", {
    layout: "listaCursoProfesor",
    curso,
    c
  });
});
  //8vo.Basico
app.get("/listaCursoProfesor8", async (req, res) => {
  const curso = await getCurso("Octavo Basico");
  const c = "Octavo Básico";
  res.render("listaCursoProfesor", {
    layout: "listaCursoProfesor",
    curso,
    c
  });
});

//visualizar listas de curso (vista inspectores)
//1ro.basico
app.get("/listaCursoInspector1", async (req, res) => {
  const curso = await getCursoInspector("Primero Basico");
  const c = "Primero Básico";
  res.render("listaCursoInspector", {
    layout: "listaCursoInspector",
    curso,
    c,
  });
});
//2do.basico
app.get("/listaCursoInspector2", async (req, res) => {
  const curso = await getCursoInspector("Segundo Basico");
  const c = "Segundo Básico";
  res.render("listaCursoInspector", {
    layout: "listaCursoInspector",
    curso,
    c,
  });
});
//3ro.basico
app.get("/listaCursoInspector3", async (req, res) => {
  const curso = await getCursoInspector("Tercero Basico");
  const c = "Tercero Básico";
  res.render("listaCursoInspector", {
    layout: "listaCursoInspector",
    curso,
    c,
  });
});
//4to.basico
app.get("/listaCursoInspector4", async (req, res) => {
  const curso = await getCursoInspector("Cuarto Basico");
  const c = "Cuarto Básico";
  res.render("listaCursoInspector", {
    layout: "listaCursoInspector",
    curso,
    c,
  });
});
//5to.basico
app.get("/listaCursoInspector5", async (req, res) => {
  const curso = await getCursoInspector("Quinto Basico");
  const c = "Quinto Básico";
  res.render("listaCursoInspector", {
    layout: "listaCursoInspector",
    curso,
    c,
  });
});
//6to.basico
app.get("/listaCursoInspector6", async (req, res) => {
  const curso = await getCursoInspector("Sexto Basico");
  const c = "Sexto Básico";
  res.render("listaCursoInspector", {
    layout: "listaCursoInspector",
    curso,
    c,
  });
});
//7mo.basico
app.get("/listaCursoInspector7", async (req, res) => {
  const curso = await getCursoInspector("Séptimo Basico");
  const c = "Séptimo Básico";
  res.render("listaCursoInspector", {
    layout: "listaCursoInspector",
    curso,
    c,
  });
});
//8vo.basico
app.get("/listaCursoInspector8", async (req, res) => {
  const curso = await getCursoInspector("Octavo Basico");
  const c = "Octavo Básico";
  res.render("listaCursoInspector", {
    layout: "listaCursoInspector",
    curso,
    c,
  });
});

//ruta para agregar estudiantes nuevos desde la interfaz de inspector
app.get('/agregarEstudiante', async (req, res) => {
  res.render("agregar", {
    layout: 'agregar'
  })
})

app.post("/agregarEstudiante", async (req, res) => {
  const { foto } = req.files
  const { name } = foto
  const { curso, nombre, edad, fechaNacimiento, apellidos, rut, apoderado, direccion, numeroApoderado, salud, alergias } = req.body;
  await insertarEstudiante(curso, rut, nombre, apellidos, edad, fechaNacimiento, foto, apoderado, numeroApoderado, direccion, alergias, salud);
  foto.mv(`${__dirname}/public/img/${name}`, (err) => {
    res.render('loginExitoInspector', {
      layout: 'loginExitoInspector',
    })
    })
})
  
//ruta para editar estudiantes existentes desde la interfaz de inspector
app.post("/actualizarEstudiante", async (req, res) => {
  const {curso,rut,nombre,apellido,edad,apoderado,telefono,direccion,alergias,salud} = req.body;
  await editarEstudiante(curso,rut,nombre,apellido,edad,apoderado,telefono,direccion,alergias,salud);
  res.render("listo", {
    layout: "listo",
  });
});
app.get('/actualizarEstudiante', async (req, res) => {
  const { rut } = req.query
  const estudiante1 = await getEstudiantes(rut)
  const estudiantes = (estudiante1[0])//porque estudiante1 no funciona asi que nos vamos al indice tratandolo estrictamente como array
  res.render("editar", {
          layout: "editar",
          estudiantes,
        });
});

//ruta para eliminar registro de estudiantes
//traer rut de los cambios a confirmar
//traer rut de los registros a borrar

app.get('/eliminarRegistro', async (req, res) => {
  const { rut } = req.query
  const cambios = await traerCambios()
  const borrar = await traerEliminacion()
  await eliminarRegistro(rut)
  res.render('eliminar', {
    layout: 'eliminar',
    rut,
    cambios,
    borrar
  })
})

//visualizar validacion del ingreso para el Inspector General
app.get("/loginInspectorGeneral", async (req, res) => {
  const { nombre, email, password } = req.query;
  const inspecGeneral = inspectorGeneral.find(
    (g) => g.email == email && g.password == password
  );
  if (inspecGeneral) {
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 120,
        data: inspecGeneral,
      },
      secretKey
    );
    res.send(
      `<script>alert("Bienvenid@ Inspector@ ${inspecGeneral.nombre} ");window.location.href = "/Dashboard3?token=${token}"</script>`
    );
  } else {
    res
      .status(401)
      .send(
        `<script>alert("Credenciales erróneas"); window.location.href = "/"</script>`
      );
  }
});

//disponibilizar ruta restringida para los inspectores autorizados. En caso contrario devolver mensaje de error y su descripcion (estado HTTP)
  app.get("/Dashboard3", async (req, res) => {
    const { token } = req.query;
    const cambios = await traerCambios()
    const borrar = await traerEliminacion()
    jwt.verify(token, secretKey, (err, { data: inspecGeneral} ) => {
      err
        ? res.status(401).send({
            error: "401 Unauthorized",
            message: "no está autorizado a acceder a esta página",
          })
        : res.render("loginExitoInspectorGeneral", {
          layout: "loginExitoInspectorGeneral",
          inspecGeneral,
          cambios, 
          borrar
          });
    });
  });
  //email: "marialuz.maureira@gmail.com",
  //password: "marialuz.forever"

//confirmar los cambios
app.get('/confirmarCambios', async (req, res) => {
  await confirmarCambios()
});
//confirmar las eliminaciones
app.get("/confirmarEliminacion", async (req, res) => {
  await confirmarEliminacion();
});

//levantar el servidor
app.listen(3000, () => console.log("Server on and working OK"));
