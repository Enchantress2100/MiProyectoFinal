--insertar en asistencia
INSERT INTO asistencia (idAlumno, idCursoActual, fechaHora, estadoasistencia)
    VALUES((select idAlumno FROM estudiantes WHERE rut = '20.572.189-4'),(SELECT idCursoActual FROM curso WHERE idAlumno = (SELECT idAlumno FROM estudiantes WHERE rut = '20.572.189-4')), now(), 'Presente');
INSERT INTO asistencia (idAlumno, idCursoActual, fechaHora, estadoasistencia)
    VALUES((SELECT idAlumno FROM estudiantes WHERE rut = '20.572.189-4'),(SELECT idCursoActual FROM curso WHERE idAlumno = (SELECT idAlumno FROM estudiantes WHERE rut = '20.372.098-K')), now(), 'Ausente');
INSERT INTO asistencia (idAlumno, idCursoActual, fechaHora, estadoasistencia)
    VALUES((SELECT idAlumno FROM estudiantes WHERE rut = '20.572.189-4'),(SELECT idCursoActual FROM curso WHERE idAlumno = (SELECT idAlumno FROM estudiantes WHERE rut = '20.572.189-4')), now(), 'Se retira');

