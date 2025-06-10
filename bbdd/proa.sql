-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-06-2025 a las 16:59:18
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proa`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignacionalumno`
--

CREATE TABLE `asignacionalumno` (
                                    `idUsuariosPROA` int(11) NOT NULL,
                                    `codigoAsignatura` varchar(10) NOT NULL,
                                    `idGrupo` int(11) DEFAULT NULL,
                                    `asignaturaFavorita` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `asignacionalumno`
--

INSERT INTO `asignacionalumno` (`idUsuariosPROA`, `codigoAsignatura`, `idGrupo`, `asignaturaFavorita`) VALUES
                                                                                                           (1, 'COMM101', NULL, 0),
                                                                                                           (1, 'DIU666', NULL, 0),
                                                                                                           (1, 'PROG101', 1, 1),
                                                                                                           (1, 'SOUND204', NULL, 0),
                                                                                                           (1, 'UIUX102', 1, 0),
                                                                                                           (2, 'COMM101', NULL, 0),
                                                                                                           (2, 'MULT203', NULL, 0),
                                                                                                           (2, 'PROG101', 2, 1),
                                                                                                           (2, 'SIGS301', NULL, 0),
                                                                                                           (2, 'SOUND204', NULL, 0),
                                                                                                           (2, 'TFG401', 2, 1),
                                                                                                           (7, 'COMM101', NULL, 0),
                                                                                                           (7, 'SOUND204', NULL, 0),
                                                                                                           (10, 'COMM101', NULL, 0),
                                                                                                           (13, 'COMM101', NULL, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignaciondocentes`
--

CREATE TABLE `asignaciondocentes` (
                                      `idUsuariosPROA` int(11) NOT NULL,
                                      `codigoAsignatura` varchar(10) NOT NULL,
                                      `responsable` tinyint(1) DEFAULT NULL,
                                      `asignaturaFavorita` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `asignaciondocentes`
--

INSERT INTO `asignaciondocentes` (`idUsuariosPROA`, `codigoAsignatura`, `responsable`, `asignaturaFavorita`) VALUES
                                                                                                                 (3, 'COMM101', 1, 1),
                                                                                                                 (3, 'MULT203', 1, NULL),
                                                                                                                 (3, 'PROG101', 1, 1),
                                                                                                                 (3, 'SIGS301', 0, NULL),
                                                                                                                 (3, 'TFG401', 0, 0),
                                                                                                                 (4, 'SIGS301', 1, NULL),
                                                                                                                 (4, 'SOUND204', 0, 0),
                                                                                                                 (4, 'UIUX102', 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignaturas`
--

CREATE TABLE `asignaturas` (
                               `codigoAsignatura` varchar(10) NOT NULL,
                               `codigoTitulacion` varchar(10) DEFAULT NULL,
                               `nombre` varchar(64) NOT NULL,
                               `creditos` tinyint(2) NOT NULL,
                               `idCurso` int(11) NOT NULL,
                               `idSemestre` int(11) DEFAULT NULL,
                               `idDepartamento` int(11) DEFAULT NULL,
                               `idCaracter` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `asignaturas`
--

INSERT INTO `asignaturas` (`codigoAsignatura`, `codigoTitulacion`, `nombre`, `creditos`, `idCurso`, `idSemestre`, `idDepartamento`, `idCaracter`) VALUES
                                                                                                                                                      ('COMM101', 'TEL', 'Fundamentos de comunicaciones', 6, 1, 1, 4, 1),
                                                                                                                                                      ('DIU666', 'GTI', 'Diseño de Interfaces', 6, 1, 2, 2, 1),
                                                                                                                                                      ('MULT203', 'GTI', 'Sistemas multimedia', 6, 2, 1, 1, 2),
                                                                                                                                                      ('PROG101', 'GTI', 'Programación de videojuegos', 6, 1, 1, 1, 1),
                                                                                                                                                      ('SIGS301', 'TEL', 'Procesado de señal', 6, 3, 1, 4, 2),
                                                                                                                                                      ('SOUND204', 'GTI', 'Sonido interactivo', 6, 2, 2, 3, 2),
                                                                                                                                                      ('TFG401', 'GTI', 'Trabajo Fin de Grado', 12, 4, 2, 1, 5),
                                                                                                                                                      ('UIUX102', 'GTI', 'Diseño de interfaces', 6, 1, 2, 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `avisos`
--

CREATE TABLE `avisos` (
                          `idAviso` int(11) NOT NULL,
                          `idContenidoAvisos` int(11) DEFAULT NULL,
                          `codigoAsignatura` varchar(10) DEFAULT NULL,
                          `idEstadoAvisos` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calificaciones`
--

CREATE TABLE `calificaciones` (
                                  `idExamen` int(11) NOT NULL,
                                  `idUsuariosPROA` int(11) NOT NULL,
                                  `notaExamenAlumno` tinyint(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `calificaciones`
--

INSERT INTO `calificaciones` (`idExamen`, `idUsuariosPROA`, `notaExamenAlumno`) VALUES
                                                                                    (1, 1, 8),
                                                                                    (4, 1, 6),
                                                                                    (5, 1, 8),
                                                                                    (6, 2, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `caracteresasignatura`
--

CREATE TABLE `caracteresasignatura` (
                                        `idCaracter` int(11) NOT NULL,
                                        `tipoCaracter` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `caracteresasignatura`
--

INSERT INTO `caracteresasignatura` (`idCaracter`, `tipoCaracter`) VALUES
                                                                      (1, 'Obligatoria'),
                                                                      (2, 'Optativa'),
                                                                      (3, 'Troncal'),
                                                                      (4, 'Básica'),
                                                                      (5, 'TFG');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contenidoavisos`
--

CREATE TABLE `contenidoavisos` (
                                   `idContenidoAvisos` int(11) NOT NULL,
                                   `mensaje` text NOT NULL,
                                   `fechaAviso` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contenidoexamen`
--

CREATE TABLE `contenidoexamen` (
                                   `idContenido` int(11) NOT NULL,
                                   `titulo` varchar(255) NOT NULL,
                                   `descripcion` text DEFAULT NULL,
                                   `pesoExamen` tinyint(3) NOT NULL,
                                   `puntosExamen` tinyint(3) NOT NULL,
                                   `fechaApertura` datetime NOT NULL,
                                   `fechaFin` datetime NOT NULL,
                                   `duracion` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `contenidoexamen`
--

INSERT INTO `contenidoexamen` (`idContenido`, `titulo`, `descripcion`, `pesoExamen`, `puntosExamen`, `fechaApertura`, `fechaFin`, `duracion`) VALUES
                                                                                                                                                  (1, 'Examen Final de Programación', 'Contenidos de programación avanzada en videojuegos', 30, 10, '2025-05-30 00:15:46', '2025-06-06 00:15:46', '01:30:00'),
                                                                                                                                                  (2, 'Examen Parcial', 'Parte intermedia del curso de programación', 25, 10, '2025-04-20 00:00:00', '2025-05-02 09:00:00', '01:00:00'),
                                                                                                                                                  (3, 'Cuestionario 1', 'Preguntas básicas de teoría', 15, 10, '2025-04-25 00:00:00', '2025-05-05 23:59:00', '00:45:00'),
                                                                                                                                                  (4, 'Test unidad 3', 'Evaluación del tema 3', 20, 10, '2025-03-01 00:00:00', '2025-03-02 08:00:00', '00:45:00'),
                                                                                                                                                  (5, 'Test unidad 1', 'Evaluación del tema 1', 20, 10, '2025-03-01 00:00:00', '2025-03-02 08:00:00', '00:45:00'),
                                                                                                                                                  (6, 'Test unidad 2', 'Evaluación del tema 2', 20, 10, '2025-03-24 00:00:00', '2025-03-24 17:15:00', '00:45:00'),
                                                                                                                                                  (7, 'Examen Parcial', 'Parte intermedia del curso de programación', 25, 10, '2025-04-20 00:00:00', '2025-05-02 09:00:00', '01:00:00'),
                                                                                                                                                  (8, 'Cuestionario 1', 'Preguntas básicas de teoría', 15, 10, '2025-04-25 00:00:00', '2025-05-05 23:59:00', '00:45:00'),
                                                                                                                                                  (9, 'Test unidad 3', 'Evaluación del tema 3', 20, 10, '2025-03-01 00:00:00', '2025-03-02 08:00:00', '00:45:00'),
                                                                                                                                                  (10, 'Test unidad 1', 'Evaluación del tema 1', 20, 10, '2025-03-01 00:00:00', '2025-03-02 08:00:00', '00:45:00'),
                                                                                                                                                  (11, 'Test unidad 2', 'Evaluación del tema 2', 20, 10, '2025-03-24 00:00:00', '2025-03-24 17:15:00', '00:45:00'),
                                                                                                                                                  (12, 'Examen Parcial', 'Parte intermedia del curso', 25, 10, '2025-04-20 00:00:00', '2025-05-02 09:00:00', '01:00:00'),
                                                                                                                                                  (13, 'Cuestionario 1', 'Preguntas básicas', 15, 10, '2025-04-25 00:00:00', '2025-05-05 23:59:00', '00:45:00'),
                                                                                                                                                  (14, 'Test unidad 3', 'Tema 3', 20, 10, '2025-03-01 00:00:00', '2025-03-02 08:00:00', '00:45:00'),
                                                                                                                                                  (15, 'Test unidad 1', 'Tema 1', 20, 10, '2025-03-01 00:00:00', '2025-03-02 08:00:00', '00:45:00'),
                                                                                                                                                  (16, 'Test unidad 2', 'Tema 2', 20, 10, '2025-03-24 00:00:00', '2025-03-24 17:15:00', '00:45:00'),
                                                                                                                                                  (17, 'Cuestionario Procesado de Señal', NULL, 15, 10, '2025-05-30 00:00:00', '2025-06-06 00:00:00', '00:00:59'),
                                                                                                                                                  (18, 'Cuestionario Procesado de Señal', NULL, 15, 10, '2025-05-30 00:00:00', '2025-06-06 00:00:00', '00:00:59'),
                                                                                                                                                  (19, 'Cuestionario Procesado de Señal', NULL, 15, 10, '2025-05-30 00:00:00', '2025-06-06 00:00:00', '00:00:59'),
                                                                                                                                                  (20, 'Cuestionario Procesado de Señal', NULL, 15, 10, '2025-05-30 00:00:00', '2025-06-06 00:00:00', '00:00:59');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos`
--

CREATE TABLE `cursos` (
                          `idCurso` int(11) NOT NULL,
                          `nombreCurso` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cursos`
--

INSERT INTO `cursos` (`idCurso`, `nombreCurso`) VALUES
                                                    (1, 'Primero'),
                                                    (2, 'Segundo'),
                                                    (3, 'Tercero'),
                                                    (4, 'Cuarto');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departamentos`
--

CREATE TABLE `departamentos` (
                                 `idDepartamento` int(11) NOT NULL,
                                 `nombreDepartamento` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `departamentos`
--

INSERT INTO `departamentos` (`idDepartamento`, `nombreDepartamento`) VALUES
                                                                         (1, 'Informática'),
                                                                         (2, 'Diseño'),
                                                                         (3, 'Sonido'),
                                                                         (4, 'Comunicaciones');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadosavisos`
--

CREATE TABLE `estadosavisos` (
                                 `idEstadoAvisos` int(11) NOT NULL,
                                 `tiposEstado` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadosexamen`
--

CREATE TABLE `estadosexamen` (
                                 `idEstado` int(11) NOT NULL,
                                 `nombreEstado` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estadosexamen`
--

INSERT INTO `estadosexamen` (`idEstado`, `nombreEstado`) VALUES
                                                             (1, 'Abierto'),
                                                             (2, 'En revisión'),
                                                             (3, 'Calificado'),
                                                             (4, 'Cerrado'),
                                                             (5, 'Borrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `examenes`
--

CREATE TABLE `examenes` (
                            `idExamen` int(11) NOT NULL,
                            `codigoAsignatura` varchar(10) DEFAULT NULL,
                            `idGrupo` int(11) DEFAULT NULL,
                            `idContenido` int(11) DEFAULT NULL,
                            `idEstado` int(11) DEFAULT NULL,
                            `idUsuariosPROA` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `examenes`
--

INSERT INTO `examenes` (`idExamen`, `codigoAsignatura`, `idGrupo`, `idContenido`, `idEstado`, `idUsuariosPROA`) VALUES
                                                                                                                    (1, 'PROG101', 1, 1, 1, 3),
                                                                                                                    (4, 'PROG101', 1, 1, 1, 3),
                                                                                                                    (5, 'PROG101', 1, 11, 2, 3),
                                                                                                                    (6, 'PROG101', 1, 4, 3, 3),
                                                                                                                    (8, 'PROG101', 1, 2, 1, 3),
                                                                                                                    (13, 'PROG101', 1, 3, 2, 3),
                                                                                                                    (16, 'SIGS301', NULL, 18, 4, 4),
                                                                                                                    (17, 'SIGS301', NULL, 20, 1, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupos`
--

CREATE TABLE `grupos` (
                          `idGrupo` int(11) NOT NULL,
                          `nombreGrupo` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `grupos`
--

INSERT INTO `grupos` (`idGrupo`, `nombreGrupo`) VALUES
                                                    (1, 'PL1'),
                                                    (2, 'PL2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personarol`
--

CREATE TABLE `personarol` (
                              `idUsuariosPROA` int(11) NOT NULL,
                              `idRol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `personarol`
--

INSERT INTO `personarol` (`idUsuariosPROA`, `idRol`) VALUES
                                                         (1, 1),
                                                         (2, 1),
                                                         (3, 2),
                                                         (4, 2),
                                                         (5, 3),
                                                         (6, 3),
                                                         (7, 1),
                                                         (8, 2),
                                                         (9, 3),
                                                         (10, 1),
                                                         (11, 2),
                                                         (12, 3),
                                                         (13, 1),
                                                         (14, 2),
                                                         (15, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas`
--

CREATE TABLE `personas` (
                            `idUsuariosPROA` int(11) NOT NULL,
                            `idUsuariosGTI` int(11) NOT NULL,
                            `email` varchar(254) NOT NULL,
                            `nombre` varchar(64) NOT NULL,
                            `apellidos` varchar(64) NOT NULL,
                            `contraseña` varchar(64) NOT NULL,
                            `dni` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `personas`
--

INSERT INTO `personas` (`idUsuariosPROA`, `idUsuariosGTI`, `email`, `nombre`, `apellidos`, `contraseña`, `dni`) VALUES
                                                                                                                    (1, 1, 'l.simdre@epsg.upv.es', 'Lief', 'Simants Dredge', '9218611', '01-9218611'),
                                                                                                                    (2, 2, 'd.rawabc@epsg.upv.es', 'Debora', 'Rawstorne', '9971924', '05-9971924'),
                                                                                                                    (3, 1, 'k.poumai@upv.es', 'Kevan', 'Pounds Mainston', '4525956', '60-4525956'),
                                                                                                                    (4, 2, 'l.prista@upv.es', 'Luelle', 'Pridmore Starsmeare', '6055365', '64-6055365'),
                                                                                                                    (5, 1, 'o.breshe@upv.es', 'Ondrea', 'Brezlaw Sherwill', '1316390', '88-1316390'),
                                                                                                                    (6, 2, 'b.maltho@upv.es', 'Brooke', 'Malimoe Thomerson', '1970980', '91-1970980'),
                                                                                                                    (7, 4, 'p.rodgar@institucion.es', 'Pablo', 'Rodríguez García', '1114028', '68-1114028'),
                                                                                                                    (8, 4, 's.morfer@institucion.es', 'Sofía', 'Moreno Fernández', '1473681', '31-1473681'),
                                                                                                                    (9, 4, 'm.fermor@institucion.es', 'Martina', 'Fernández Moreno', '9850488', '32-9850488'),
                                                                                                                    (10, 5, 'j.mormar@institucion.es', 'Javier', 'Moreno Martínez', '1796971', '60-1796971'),
                                                                                                                    (11, 5, 'm.péfer@institucion.es', 'Martina', 'Pérez Fernández', '8165435', '34-8165435'),
                                                                                                                    (12, 5, 'd.sáló@institucion.es', 'Daniela', 'Sánchez López', '8976724', '36-8976724'),
                                                                                                                    (13, 6, 'j.morsá@institucion.es', 'Javier', 'Moreno Sánchez', '6574454', '63-6574454'),
                                                                                                                    (14, 6, 'h.pégar@institucion.es', 'Hugo', 'Pérez García', '6316673', '18-6316673'),
                                                                                                                    (15, 6, 'l.morpé@institucion.es', 'Lucía', 'Moreno Pérez', '3789142', '82-3789142');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preguntasexamen`
--

CREATE TABLE `preguntasexamen` (
                                   `idPregunta` int(11) NOT NULL,
                                   `enunciado` text NOT NULL,
                                   `valorPregunta` tinyint(3) NOT NULL,
                                   `idContenido` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestasexamen`
--

CREATE TABLE `respuestasexamen` (
                                    `idRespuesta` int(11) NOT NULL,
                                    `respuesta` text NOT NULL,
                                    `valorRespuesta` tinyint(1) NOT NULL,
                                    `idPregunta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
                         `idRol` int(11) NOT NULL,
                         `nombreRol` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`idRol`, `nombreRol`) VALUES
                                               (1, 'alumno'),
                                               (2, 'profesor'),
                                               (3, 'pas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `semestres`
--

CREATE TABLE `semestres` (
                             `idSemestre` int(11) NOT NULL,
                             `nombreSemestre` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `semestres`
--

INSERT INTO `semestres` (`idSemestre`, `nombreSemestre`) VALUES
                                                             (1, 'A'),
                                                             (2, 'B');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `titulacion`
--

CREATE TABLE `titulacion` (
                              `codigoTitulacion` varchar(10) NOT NULL,
                              `nombreTitulacion` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `titulacion`
--

INSERT INTO `titulacion` (`codigoTitulacion`, `nombreTitulacion`) VALUES
                                                                      ('GTI', 'Grado en Tecnologías Interactivas'),
                                                                      ('TEL', 'Grado en Ingeniería de Telecomunicaciones');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asignacionalumno`
--
ALTER TABLE `asignacionalumno`
    ADD PRIMARY KEY (`idUsuariosPROA`,`codigoAsignatura`),
  ADD KEY `codigoAsignatura` (`codigoAsignatura`),
  ADD KEY `idGrupo` (`idGrupo`);

--
-- Indices de la tabla `asignaciondocentes`
--
ALTER TABLE `asignaciondocentes`
    ADD PRIMARY KEY (`idUsuariosPROA`,`codigoAsignatura`),
  ADD KEY `codigoAsignatura` (`codigoAsignatura`);

--
-- Indices de la tabla `asignaturas`
--
ALTER TABLE `asignaturas`
    ADD PRIMARY KEY (`codigoAsignatura`),
  ADD KEY `codigoTitulacion` (`codigoTitulacion`),
  ADD KEY `idCurso` (`idCurso`),
  ADD KEY `idSemestre` (`idSemestre`),
  ADD KEY `idDepartamento` (`idDepartamento`),
  ADD KEY `idCaracter` (`idCaracter`);

--
-- Indices de la tabla `avisos`
--
ALTER TABLE `avisos`
    ADD PRIMARY KEY (`idAviso`),
  ADD KEY `idContenidoAvisos` (`idContenidoAvisos`),
  ADD KEY `codigoAsignatura` (`codigoAsignatura`),
  ADD KEY `idEstadoAvisos` (`idEstadoAvisos`);

--
-- Indices de la tabla `calificaciones`
--
ALTER TABLE `calificaciones`
    ADD PRIMARY KEY (`idExamen`,`idUsuariosPROA`),
  ADD KEY `idUsuariosPROA` (`idUsuariosPROA`);

--
-- Indices de la tabla `caracteresasignatura`
--
ALTER TABLE `caracteresasignatura`
    ADD PRIMARY KEY (`idCaracter`);

--
-- Indices de la tabla `contenidoavisos`
--
ALTER TABLE `contenidoavisos`
    ADD PRIMARY KEY (`idContenidoAvisos`);

--
-- Indices de la tabla `contenidoexamen`
--
ALTER TABLE `contenidoexamen`
    ADD PRIMARY KEY (`idContenido`);

--
-- Indices de la tabla `cursos`
--
ALTER TABLE `cursos`
    ADD PRIMARY KEY (`idCurso`);

--
-- Indices de la tabla `departamentos`
--
ALTER TABLE `departamentos`
    ADD PRIMARY KEY (`idDepartamento`);

--
-- Indices de la tabla `estadosavisos`
--
ALTER TABLE `estadosavisos`
    ADD PRIMARY KEY (`idEstadoAvisos`);

--
-- Indices de la tabla `estadosexamen`
--
ALTER TABLE `estadosexamen`
    ADD PRIMARY KEY (`idEstado`);

--
-- Indices de la tabla `examenes`
--
ALTER TABLE `examenes`
    ADD PRIMARY KEY (`idExamen`),
  ADD KEY `codigoAsignatura` (`codigoAsignatura`),
  ADD KEY `idGrupo` (`idGrupo`),
  ADD KEY `idContenido` (`idContenido`),
  ADD KEY `idEstado` (`idEstado`),
  ADD KEY `idUsuariosPROA` (`idUsuariosPROA`);

--
-- Indices de la tabla `grupos`
--
ALTER TABLE `grupos`
    ADD PRIMARY KEY (`idGrupo`);

--
-- Indices de la tabla `personarol`
--
ALTER TABLE `personarol`
    ADD PRIMARY KEY (`idUsuariosPROA`,`idRol`),
  ADD KEY `idRol` (`idRol`);

--
-- Indices de la tabla `personas`
--
ALTER TABLE `personas`
    ADD PRIMARY KEY (`idUsuariosPROA`);

--
-- Indices de la tabla `preguntasexamen`
--
ALTER TABLE `preguntasexamen`
    ADD PRIMARY KEY (`idPregunta`),
  ADD KEY `idContenido` (`idContenido`);

--
-- Indices de la tabla `respuestasexamen`
--
ALTER TABLE `respuestasexamen`
    ADD PRIMARY KEY (`idRespuesta`),
  ADD KEY `idPregunta` (`idPregunta`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
    ADD PRIMARY KEY (`idRol`);

--
-- Indices de la tabla `semestres`
--
ALTER TABLE `semestres`
    ADD PRIMARY KEY (`idSemestre`);

--
-- Indices de la tabla `titulacion`
--
ALTER TABLE `titulacion`
    ADD PRIMARY KEY (`codigoTitulacion`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `avisos`
--
ALTER TABLE `avisos`
    MODIFY `idAviso` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `caracteresasignatura`
--
ALTER TABLE `caracteresasignatura`
    MODIFY `idCaracter` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `contenidoavisos`
--
ALTER TABLE `contenidoavisos`
    MODIFY `idContenidoAvisos` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `contenidoexamen`
--
ALTER TABLE `contenidoexamen`
    MODIFY `idContenido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `cursos`
--
ALTER TABLE `cursos`
    MODIFY `idCurso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `departamentos`
--
ALTER TABLE `departamentos`
    MODIFY `idDepartamento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `estadosavisos`
--
ALTER TABLE `estadosavisos`
    MODIFY `idEstadoAvisos` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `estadosexamen`
--
ALTER TABLE `estadosexamen`
    MODIFY `idEstado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT de la tabla `examenes`
--
ALTER TABLE `examenes`
    MODIFY `idExamen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `grupos`
--
ALTER TABLE `grupos`
    MODIFY `idGrupo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `personas`
--
ALTER TABLE `personas`
    MODIFY `idUsuariosPROA` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
    MODIFY `idRol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `semestres`
--
ALTER TABLE `semestres`
    MODIFY `idSemestre` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `asignacionalumno`
--
ALTER TABLE `asignacionalumno`
    ADD CONSTRAINT `asignacionalumno_ibfk_1` FOREIGN KEY (`idUsuariosPROA`) REFERENCES `personas` (`idUsuariosPROA`),
  ADD CONSTRAINT `asignacionalumno_ibfk_2` FOREIGN KEY (`codigoAsignatura`) REFERENCES `asignaturas` (`codigoAsignatura`),
  ADD CONSTRAINT `asignacionalumno_ibfk_3` FOREIGN KEY (`idGrupo`) REFERENCES `grupos` (`idGrupo`);

--
-- Filtros para la tabla `asignaciondocentes`
--
ALTER TABLE `asignaciondocentes`
    ADD CONSTRAINT `asignaciondocentes_ibfk_1` FOREIGN KEY (`idUsuariosPROA`) REFERENCES `personas` (`idUsuariosPROA`),
  ADD CONSTRAINT `asignaciondocentes_ibfk_2` FOREIGN KEY (`codigoAsignatura`) REFERENCES `asignaturas` (`codigoAsignatura`);

--
-- Filtros para la tabla `asignaturas`
--
ALTER TABLE `asignaturas`
    ADD CONSTRAINT `asignaturas_ibfk_1` FOREIGN KEY (`codigoTitulacion`) REFERENCES `titulacion` (`codigoTitulacion`),
  ADD CONSTRAINT `asignaturas_ibfk_2` FOREIGN KEY (`idCurso`) REFERENCES `cursos` (`idCurso`),
  ADD CONSTRAINT `asignaturas_ibfk_3` FOREIGN KEY (`idSemestre`) REFERENCES `semestres` (`idSemestre`),
  ADD CONSTRAINT `asignaturas_ibfk_4` FOREIGN KEY (`idDepartamento`) REFERENCES `departamentos` (`idDepartamento`),
  ADD CONSTRAINT `asignaturas_ibfk_5` FOREIGN KEY (`idCaracter`) REFERENCES `caracteresasignatura` (`idCaracter`);

--
-- Filtros para la tabla `avisos`
--
ALTER TABLE `avisos`
    ADD CONSTRAINT `avisos_ibfk_1` FOREIGN KEY (`idContenidoAvisos`) REFERENCES `contenidoavisos` (`idContenidoAvisos`),
  ADD CONSTRAINT `avisos_ibfk_2` FOREIGN KEY (`codigoAsignatura`) REFERENCES `asignaturas` (`codigoAsignatura`),
  ADD CONSTRAINT `avisos_ibfk_3` FOREIGN KEY (`idEstadoAvisos`) REFERENCES `estadosavisos` (`idEstadoAvisos`);

--
-- Filtros para la tabla `calificaciones`
--
ALTER TABLE `calificaciones`
    ADD CONSTRAINT `calificaciones_ibfk_1` FOREIGN KEY (`idExamen`) REFERENCES `examenes` (`idExamen`),
  ADD CONSTRAINT `calificaciones_ibfk_2` FOREIGN KEY (`idUsuariosPROA`) REFERENCES `personas` (`idUsuariosPROA`);

--
-- Filtros para la tabla `examenes`
--
ALTER TABLE `examenes`
    ADD CONSTRAINT `examenes_ibfk_1` FOREIGN KEY (`codigoAsignatura`) REFERENCES `asignaturas` (`codigoAsignatura`),
  ADD CONSTRAINT `examenes_ibfk_2` FOREIGN KEY (`idGrupo`) REFERENCES `grupos` (`idGrupo`),
  ADD CONSTRAINT `examenes_ibfk_3` FOREIGN KEY (`idContenido`) REFERENCES `contenidoexamen` (`idContenido`),
  ADD CONSTRAINT `examenes_ibfk_4` FOREIGN KEY (`idEstado`) REFERENCES `estadosexamen` (`idEstado`),
  ADD CONSTRAINT `examenes_ibfk_5` FOREIGN KEY (`idUsuariosPROA`) REFERENCES `personas` (`idUsuariosPROA`);

--
-- Filtros para la tabla `personarol`
--
ALTER TABLE `personarol`
    ADD CONSTRAINT `personarol_ibfk_1` FOREIGN KEY (`idUsuariosPROA`) REFERENCES `personas` (`idUsuariosPROA`),
  ADD CONSTRAINT `personarol_ibfk_2` FOREIGN KEY (`idRol`) REFERENCES `roles` (`idRol`);

--
-- Filtros para la tabla `preguntasexamen`
--
ALTER TABLE `preguntasexamen`
    ADD CONSTRAINT `preguntasexamen_ibfk_2` FOREIGN KEY (`idContenido`) REFERENCES `contenidoexamen` (`idContenido`);

--
-- Filtros para la tabla `respuestasexamen`
--
ALTER TABLE `respuestasexamen`
    ADD CONSTRAINT `respuestasexamen_ibfk_1` FOREIGN KEY (`idPregunta`) REFERENCES `preguntasexamen` (`idPregunta`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
