-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-06-2025 a las 22:27:13
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
                                                                                                           (1, 'DIU101', NULL, 0),
                                                                                                           (1, 'PRG666', NULL, 0),
                                                                                                           (2, 'DIU101', NULL, 0),
                                                                                                           (2, 'IDS020', NULL, 1),
                                                                                                           (2, 'PRG666', NULL, 0),
                                                                                                           (2, 'RDA189', NULL, 1),
                                                                                                           (7, 'DIU101', NULL, 0),
                                                                                                           (10, 'DIU101', NULL, 0),
                                                                                                           (13, 'DIU101', NULL, 0);

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
                                                                                                                 (3, 'DIU101', 0, NULL),
                                                                                                                 (3, 'PRG666', 1, NULL),
                                                                                                                 (4, 'DIU101', 1, NULL),
                                                                                                                 (4, 'IDS020', 1, NULL),
                                                                                                                 (4, 'PRG666', 0, NULL),
                                                                                                                 (4, 'RDA189', 1, 1),
                                                                                                                 (8, 'DIU101', 0, NULL),
                                                                                                                 (11, 'DIU101', 0, NULL),
                                                                                                                 (14, 'DIU101', 0, NULL);

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
                                                                                                                                                      ('DIU101', 'GTI', 'Diseño de Interfaces y Experiencia de Usuario', 6, 1, 2, 2, 1),
                                                                                                                                                      ('IDS020', 'GTI', 'Introducción al tratamiento digital de la señal', 6, 2, 2, 3, 1),
                                                                                                                                                      ('PRG666', 'GTI', 'Programación 1', 6, 1, 1, 7, 1),
                                                                                                                                                      ('RDA189', 'GTI', 'Redes de Área Local', 6, 2, 1, 3, 1);

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
                                  `notaExamenAlumno` tinyint(3) NOT NULL,
                                  `valorExamen` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `calificaciones`
--

INSERT INTO `calificaciones` (`idExamen`, `idUsuariosPROA`, `notaExamenAlumno`, `valorExamen`) VALUES
                                                                                                   (25, 2, 7, 10),
                                                                                                   (27, 2, 6, 8),
                                                                                                   (29, 2, 0, 10);

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
                                                                                                                                                  (28, 'Ejercicios Examenes Capitulo 5', 'Este examen evalúa los conocimientos teóricos y prácticos del alumno en el diseño, funcionamiento y análisis de redes de computadoras. Incluye preguntas tipo test, cuestiones de desarrollo y ejercicios de diseño de redes físicas y lógicas. Se abordan temas como direccionamiento IP, protocolos de red (como ARP y PPP), dispositivos de interconexión (switches, hubs, routers, puntos de acceso), segmentación mediante VLANs, y análisis del flujo de datos en una red. Las preguntas están orientadas a situaciones reales que requieren razonamiento técnico, configuración de equipos y comprensión del modelo OSI.', 10, 0, '2025-06-12 22:50:00', '2025-06-20 22:50:00', '00:30:00'),
                                                                                                                                                  (29, 'Ejercicios Examenes Capitulo 4', 'Este examen abarca contenidos fundamentales relacionados con redes de computadoras, centrándose en los estándares Ethernet, Token Ring e IEEE 802.11 (redes inalámbricas). A través de preguntas tipo test, se evalúan los conocimientos del alumno sobre conceptos técnicos como estructuras de tramas, funcionamiento de protocolos de acceso al medio (CSMA/CD, CSMA/CA), direccionamiento MAC, cableado, y funcionamiento de redes cableadas e inalámbricas.', 5, 0, '2025-06-12 22:55:00', '2025-06-26 21:55:00', '00:30:00'),
                                                                                                                                                  (30, 'Ejercicios Examenes Capitulo 3', 'Este examen evalúa los conocimientos fundamentales sobre el diseño e implementación de redes inalámbricas (WLAN). A través de preguntas tipo test, se analiza la capacidad del alumno para identificar buenas prácticas en la planificación, análisis de cobertura, detección de interferencias y documentación de redes inalámbricas en entornos reales.', 5, 0, '2025-06-12 23:55:00', '2025-06-15 23:55:00', '00:30:00'),
                                                                                                                                                  (31, 'Ejercicios Examenes Capitulo 6', 'Este examen evalúa los conocimientos del alumno sobre la conmutación en redes LAN, el uso de VLANs y el protocolo Spanning Tree Protocol (STP). A través de preguntas tipo test y ejercicios prácticos de análisis de topologías, se valoran conceptos clave relacionados con el funcionamiento de los switches, tipos de conmutación (como store and forward, cut-through), segmentación de redes mediante VLANs y prevención de bucles en redes conmutadas.', 10, 0, '2025-06-12 23:05:00', '2025-06-30 00:00:00', '00:45:00'),
                                                                                                                                                  (32, 'Cuestiones - TEMA 1', 'Este examen evalúa los conocimientos fundamentales sobre señales y sistemas discretos en el tiempo, enfocados en operaciones como convolución, análisis de periodicidad, y caracterización de sistemas lineales invariantes en el tiempo (LTI).', 5, 0, '2025-06-12 22:10:00', '2025-06-20 22:10:00', '01:00:00'),
                                                                                                                                                  (33, 'Cuestiones - TEMA 2', 'Este examen evalúa los conocimientos fundamentales sobre señales y sistemas discretos en el tiempo, enfocados en operaciones como convolución, análisis de periodicidad, y caracterización de sistemas lineales invariantes en el tiempo (LTI).', 10, 0, '2025-06-12 22:15:00', '2025-06-19 00:00:00', '01:00:00');

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
                                                                         (1, 'Ingeniería Electrónica'),
                                                                         (2, 'Expresión Gráfica en Ingeniería'),
                                                                         (3, 'Comunicaciones'),
                                                                         (4, 'Física Aplicada'),
                                                                         (5, 'Matemática Aplicada'),
                                                                         (6, 'Organización de Empresas'),
                                                                         (7, 'Informática de Sistemas y Computadores'),
                                                                         (8, 'Biotecnología');

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
                                                             (4, 'Borrador');

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
                                                                                                                    (25, 'RDA189', NULL, 28, 1, 4),
                                                                                                                    (26, 'RDA189', NULL, 29, 1, 4),
                                                                                                                    (27, 'RDA189', NULL, 30, 1, 4),
                                                                                                                    (28, 'RDA189', NULL, 31, 1, 4),
                                                                                                                    (29, 'IDS020', NULL, 32, 1, 4),
                                                                                                                    (30, 'IDS020', NULL, 33, 1, 4);

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

--
-- Volcado de datos para la tabla `preguntasexamen`
--

INSERT INTO `preguntasexamen` (`idPregunta`, `enunciado`, `valorPregunta`, `idContenido`) VALUES
                                                                                              (11, ' Cómo podemos logar que todos los mensajes de los ordenadores de la red que vayan hacia una dirección en Internet pasen a través de un ordenador en particular antes de ir hacia Internet:\n', 4, 28),
                                                                                              (12, '¿En qué parte de una estación de trabajo se encuentra la dirección de capa 2?', 3, 28),
                                                                                              (13, '¿Cuál es la función de ARP?', 3, 28),
                                                                                              (14, 'La función cuyo su funcionamiento se basa en técnicas de contienda por el medio se llama\n', 2, 29),
                                                                                              (15, 'En IEEE 802.11 con MACA, ¿Qué trama tiene más bits de las siguientes?', 2, 29),
                                                                                              (16, 'En la trama IEEE 802.11', 1, 29),
                                                                                              (17, 'En el diseño de una red inalámbrica se debe:\n', 2, 30),
                                                                                              (18, 'Para planificar la cobertura de una red inalámbrica en una planta de un edificio, se debe empezar:', 4, 30),
                                                                                              (19, 'Cual de los siguientes ítems no es parte de la documentación que debe generarse durante el diseño de la red:', 2, 30),
                                                                                              (20, 'He observado que después de cambiar los 10 HUBS que tenía mi red por 10 switches, la red es más lenta de lo que se espera. ¿Qué tipo de conmutación estará utilizando mis switches?:', 1, 31),
                                                                                              (21, '¿Qué es necesario para comunicar los ordenadores de 2 VLANs distintas?', 1, 31),
                                                                                              (22, 'Un switch utilizando el método corte es aquel que:', 1, 31),
                                                                                              (23, 'El Estándar IEEE 802.D define:\n', 1, 31),
                                                                                              (24, '¿Cual de las siguientes afirmaciones el falsa del protocolo Spanning Tree Protocol (STP)?', 1, 31),
                                                                                              (25, 'Sea la señal x[n] = δ[n] + δ[n − 1]. Calcula la señal y[n] = x[n] ∗ x[n + 1], e indica cuál de los siguientes resultados es el correcto.', 5, 32),
                                                                                              (26, 'Sea h[n] = δ[n] − δ[n − 1] la respuesta impulsional de un LTI, ¿qué clase de sistema es?\n', 5, 32),
                                                                                              (27, 'Sea la secuencia discreta x[n] = n·u[n+1], ¿cuál sería el resultado de la siguiente convolución?\nz[n] = x[n] ∗ δ[n − 1]\n', 1, 33),
                                                                                              (28, 'Las siguientes expresiones relacionan la salida con la entrada de un sistema discreto:\n\n1. y[n] = e<sup>x[n]</sup>\n\n2.y[n] = x[n − 1] + x[n + 1]\n\n3.y[n] = n·x[n]\n\nIndica cuál de las siguientes afirmaciones es cierta:', 2, 33),
                                                                                              (29, 'Dada la señal discreta x[n] = u[n] − u[n − 5], ¿cuál será la duración de la señal y[n] = x[n] ∗ x[n]?', 2, 33),
                                                                                              (30, 'Dada la secuencia x[n] = cos(6πn):', 2, 33),
                                                                                              (31, 'El resultado de la operación δ[n − 2] ∗ δ[n − 2] es:', 3, 33);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestasalumno`
--

CREATE TABLE `respuestasalumno` (
                                    `idUsuariosPROA` int(11) NOT NULL,
                                    `idExamen` int(11) NOT NULL,
                                    `idPregunta` int(11) NOT NULL,
                                    `idRespuesta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `respuestasalumno`
--

INSERT INTO `respuestasalumno` (`idUsuariosPROA`, `idExamen`, `idPregunta`, `idRespuesta`) VALUES
                                                                                               (2, 25, 11, 26),
                                                                                               (2, 25, 12, 28),
                                                                                               (2, 25, 13, 34),
                                                                                               (2, 27, 17, 48),
                                                                                               (2, 27, 18, 51),
                                                                                               (2, 27, 19, 53),
                                                                                               (2, 29, 25, 76),
                                                                                               (2, 29, 26, 79);

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

--
-- Volcado de datos para la tabla `respuestasexamen`
--

INSERT INTO `respuestasexamen` (`idRespuesta`, `respuesta`, `valorRespuesta`, `idPregunta`) VALUES
                                                                                                (24, 'Poniendo en la tabla de conmutación del switch la dirección MAC del router en el puerto donde está ese ordenador', 0, 11),
                                                                                                (25, 'Poniendo en todos los ordenadores como puerta de enlace la dirección IP del ordenador y poniendo un software en el router para que acepte la información que le llegue y la envíe hacia Internet.', 0, 11),
                                                                                                (26, 'Enviando a todos los ordenadores una respuesta ARP con la dirección IP de su puerta de enlace y la dirección MAC de ese ordenador. En el ordenador se deberá poner un software para que redirija toda la información a la puerta de enlace.', 1, 11),
                                                                                                (27, 'Poniendo un Hub en la red en vez de un Switch.', 0, 11),
                                                                                                (28, 'En la tabla de enrutamiento', 0, 12),
                                                                                                (29, 'En la tarjeta de interfaz de red ', 1, 12),
                                                                                                (30, 'En la tabla del servidor de nombre ', 0, 12),
                                                                                                (31, 'Se encuentra en el servidor DHCP ', 0, 12),
                                                                                                (32, 'Se utiliza para asignar una dirección MAC conocida a una dirección IP desconocida', 0, 13),
                                                                                                (33, 'Se utiliza para desarrollar una tabla de recursos de direcciones capa 4 en caché ', 0, 13),
                                                                                                (34, 'Se utiliza para asignar una dirección MAC desconocida a una dirección IP conocida', 1, 13),
                                                                                                (35, 'Envía un mensaje de broadcast para buscar la dirección IP del router', 0, 13),
                                                                                                (36, 'Función de coordinación distribuida', 1, 14),
                                                                                                (37, 'Función de coordinación puntual', 0, 14),
                                                                                                (38, 'Función de servicios de tipo síncrono', 0, 14),
                                                                                                (39, 'ACK', 0, 15),
                                                                                                (40, 'RTS', 1, 15),
                                                                                                (41, 'El campo FCS es mas grande que el campo de la dirección MAC origen', 0, 16),
                                                                                                (42, 'Existen 2 campos las direcciones MAC.', 0, 16),
                                                                                                (43, 'Existen 4 campos las direcciones MAC.', 1, 16),
                                                                                                (44, 'El campo de datos (Cuerpo de la trama) no puede ser el más pequeño', 0, 16),
                                                                                                (45, 'Tener en cuenta que el ancho de banda efectivo en las WLAN es menor que el teórico.', 0, 17),
                                                                                                (46, 'Testear la cobertura producida por el punto de acceso tanto visualmente como con un analizador de espectros de Radio Frecuencia', 0, 17),
                                                                                                (47, 'Realizar el análisis de espectros diferentes días y diferentes horas del día para observar posibles interferencias', 0, 17),
                                                                                                (48, 'Tener en cuenta todas los ítems anteriores', 1, 17),
                                                                                                (49, 'Midiendo cual es el radio de cobertura de los puntos de acceso que vamos a instalar', 0, 18),
                                                                                                (50, 'Midiendo el ancho de banda efectivo de la red inalámbrica que vamos a instalar', 0, 18),
                                                                                                (51, 'Eligiendo una esquina y situar el punto de acceso allí para medir la zona de cobertura', 1, 18),
                                                                                                (52, 'Midiendo si hay interferencias en alguno de los canales de la banda de 2,4 Ghz ', 0, 18),
                                                                                                (53, 'Topología Lógica', 0, 19),
                                                                                                (54, 'Número de usuarios que van a utilizar la red', 1, 19),
                                                                                                (55, 'Diario de Ingeniería', 0, 19),
                                                                                                (56, 'Metodo de Corte', 0, 20),
                                                                                                (57, 'Cut-through', 0, 20),
                                                                                                (58, 'Conmutación libre de fragmentos', 0, 20),
                                                                                                (59, 'Almacenamiento y envio', 1, 20),
                                                                                                (60, 'Hacer un trunk entre 2 switches', 0, 21),
                                                                                                (61, 'Poner el switch como puerta de enlace por defecto (gateway)', 0, 21),
                                                                                                (62, 'Poner un router que enrute entre las VLANs', 0, 21),
                                                                                                (63, 'Todas las anteriores', 1, 21),
                                                                                                (64, 'Es capaz de procesar los datos entrantes a la vez que los va retransmitiendo a la salida correcta', 0, 22),
                                                                                                (65, 'Puede procesar un paquete tan pronto como se recibe la dirección MAC de origen redirigiéndose a la salida correcta', 0, 22),
                                                                                                (66, 'Puede procesar un paquete tan pronto como se recibe la dirección MAC de destino redirigiéndose a la salida correcta', 1, 22),
                                                                                                (67, 'Procesa todo el paquete antes de retransmitirlo a la salida correcta', 0, 22),
                                                                                                (68, 'Como modificar la cabecera Ethernet para incluir etiquetas', 0, 23),
                                                                                                (69, 'Como indicar la pertenencia de una trama a una VLAN', 0, 23),
                                                                                                (70, 'Que el nuevo tamaño de una trama Ethernet pasa a ser 1518 bytes.', 0, 23),
                                                                                                (71, 'Un protocolo de spanning tree de extension', 1, 23),
                                                                                                (72, 'Evita bucles entre dos puentes o switches ', 0, 24),
                                                                                                (73, 'Establece una topología lógica tipo árbol ', 0, 24),
                                                                                                (74, 'Si hay más de un enlace entre 2 puentes o switches, sólo uno estará activo, los demás bloqueados ', 0, 24),
                                                                                                (75, 'Envía tramas desde todos los puertos del switch para alcanzar el destino deseado.', 1, 24),
                                                                                                (76, 'y[n] = δ[n] + 2δ[n − 1] + δ[n − 2]', 0, 25),
                                                                                                (77, 'y[n] = δ[n − 1] + 2δ[n − 2] + δ[n − 3]', 0, 25),
                                                                                                (78, 'Ninguna de las anteriores es cierta.', 1, 25),
                                                                                                (79, 'Es el sistema acumulador.', 0, 26),
                                                                                                (80, 'Es la primera diferencia.', 1, 26),
                                                                                                (81, 'Es el sistema identidad.', 0, 26),
                                                                                                (82, 'Ninguna de las anteriores.', 0, 26),
                                                                                                (83, 'z[n] = nu[n]', 0, 27),
                                                                                                (84, 'z[n] = nu[n − 1]', 1, 27),
                                                                                                (85, 'z[n] = nu[n + 1] − 1', 0, 27),
                                                                                                (86, 'z[n] = (n − 1)u[n]', 0, 27),
                                                                                                (87, 'Ninguno de los sistemas es LTI.', 0, 28),
                                                                                                (88, 'Los sistemas 1 y 2 no son LTI.', 1, 28),
                                                                                                (89, 'Los sistemas 2 y 3 no son LTI.', 0, 28),
                                                                                                (90, 'Los sistemas 1 y 3 no son LTI.', 0, 28),
                                                                                                (91, '12', 0, 29),
                                                                                                (92, '10', 0, 29),
                                                                                                (93, '8', 0, 29),
                                                                                                (94, '11', 1, 29),
                                                                                                (95, ' Es una secuencia periódica de periodo 2π', 0, 30),
                                                                                                (96, 'Es una secuencia periódica de periodo 1', 0, 30),
                                                                                                (97, 'Es una secuencia periódica de periodo 1/(2π)', 1, 30),
                                                                                                (98, 'No es periódica', 0, 30),
                                                                                                (99, ' δ[n]', 0, 31),
                                                                                                (100, 'δ[n − 2]', 0, 31),
                                                                                                (101, ' 1', 1, 31),
                                                                                                (102, ' δ[n − 4]', 0, 31);

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
                                                                      ('CAU', 'Grado en Comunicación Audiovisual'),
                                                                      ('GCA', 'Grado en Ciencias Ambientales'),
                                                                      ('GTI', 'Grado en Tecnologías Interactivas'),
                                                                      ('TEL', 'Grado en Ingeniería de Telecomunicaciones'),
                                                                      ('TUR', 'Grado en Turismo');

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_asignaturas_alumnos`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vista_asignaturas_alumnos` (
                                             `codigoAsignatura` varchar(10)
    ,`nombre` varchar(64)
    ,`creditos` tinyint(2)
    ,`alumnos` mediumtext
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_calificaciones_examen`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vista_calificaciones_examen` (
                                               `idExamen` int(11)
    ,`codigoAsignatura` varchar(10)
    ,`nombre` varchar(64)
    ,`apellidos` varchar(64)
    ,`notaExamenAlumno` tinyint(3)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_detalle_examenes_alumnos`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vista_detalle_examenes_alumnos` (
                                                  `id_alumno` int(11)
    ,`nombre_alumno` varchar(129)
    ,`codigo_asignatura` varchar(10)
    ,`nombre_asignatura` varchar(64)
    ,`id_examen` int(11)
    ,`titulo_examen` varchar(255)
    ,`id_pregunta` int(11)
    ,`pregunta` text
    ,`valor_pregunta` tinyint(3)
    ,`respuesta_correcta` text
    ,`valor_respuesta` tinyint(1)
    ,`id_respuesta_alumno` int(11)
    ,`respuesta_alumno` text
    ,`acierto_alumno` tinyint(1)
    ,`calificacion_total` tinyint(3)
    ,`valor_total_examen` tinyint(3)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_examenes_respuestas`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vista_examenes_respuestas` (
                                             `idExamen` int(11)
    ,`codigoAsignatura` varchar(10)
    ,`titulo` varchar(255)
    ,`pregunta` text
    ,`respuesta` text
    ,`valorRespuesta` tinyint(1)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_profesores_asignaturas`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vista_profesores_asignaturas` (
                                                `codigoAsignatura` varchar(10)
    ,`nombre` varchar(64)
    ,`profesores` mediumtext
    ,`tipo_profesor` mediumtext
);

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_asignaturas_alumnos`
--
DROP TABLE IF EXISTS `vista_asignaturas_alumnos`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_asignaturas_alumnos`  AS SELECT `a`.`codigoAsignatura` AS `codigoAsignatura`, `a`.`nombre` AS `nombre`, `a`.`creditos` AS `creditos`, group_concat(concat(`p`.`nombre`,' ',`p`.`apellidos`) order by `p`.`nombre` ASC separator ',') AS `alumnos` FROM ((`asignaturas` `a` join `asignacionalumno` `aa` on(`a`.`codigoAsignatura` = `aa`.`codigoAsignatura`)) join `personas` `p` on(`aa`.`idUsuariosPROA` = `p`.`idUsuariosPROA`)) GROUP BY `a`.`codigoAsignatura` ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_calificaciones_examen`
--
DROP TABLE IF EXISTS `vista_calificaciones_examen`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_calificaciones_examen`  AS SELECT `e`.`idExamen` AS `idExamen`, `a`.`codigoAsignatura` AS `codigoAsignatura`, `p`.`nombre` AS `nombre`, `p`.`apellidos` AS `apellidos`, `c`.`notaExamenAlumno` AS `notaExamenAlumno` FROM (((`calificaciones` `c` join `examenes` `e` on(`c`.`idExamen` = `e`.`idExamen`)) join `asignaturas` `a` on(`e`.`codigoAsignatura` = `a`.`codigoAsignatura`)) join `personas` `p` on(`c`.`idUsuariosPROA` = `p`.`idUsuariosPROA`)) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_detalle_examenes_alumnos`
--
DROP TABLE IF EXISTS `vista_detalle_examenes_alumnos`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_detalle_examenes_alumnos`  AS SELECT `p`.`idUsuariosPROA` AS `id_alumno`, concat(`p`.`nombre`,' ',`p`.`apellidos`) AS `nombre_alumno`, `a`.`codigoAsignatura` AS `codigo_asignatura`, `asig`.`nombre` AS `nombre_asignatura`, `e`.`idExamen` AS `id_examen`, `ce`.`titulo` AS `titulo_examen`, `pe`.`idPregunta` AS `id_pregunta`, `pe`.`enunciado` AS `pregunta`, `pe`.`valorPregunta` AS `valor_pregunta`, `re`.`respuesta` AS `respuesta_correcta`, `re`.`valorRespuesta` AS `valor_respuesta`, `ra`.`idRespuesta` AS `id_respuesta_alumno`, `re_alumno`.`respuesta` AS `respuesta_alumno`, `re_alumno`.`valorRespuesta` AS `acierto_alumno`, `c`.`notaExamenAlumno` AS `calificacion_total`, `ce`.`puntosExamen` AS `valor_total_examen` FROM (((((((((`personas` `p` join `respuestasalumno` `ra` on(`p`.`idUsuariosPROA` = `ra`.`idUsuariosPROA`)) join `examenes` `e` on(`ra`.`idExamen` = `e`.`idExamen`)) join `asignaturas` `asig` on(`e`.`codigoAsignatura` = `asig`.`codigoAsignatura`)) join `contenidoexamen` `ce` on(`e`.`idContenido` = `ce`.`idContenido`)) join `preguntasexamen` `pe` on(`ra`.`idPregunta` = `pe`.`idPregunta`)) join `respuestasexamen` `re_alumno` on(`ra`.`idRespuesta` = `re_alumno`.`idRespuesta`)) join `respuestasexamen` `re` on(`pe`.`idPregunta` = `re`.`idPregunta` and `re`.`valorRespuesta` = 1)) left join `calificaciones` `c` on(`e`.`idExamen` = `c`.`idExamen` and `p`.`idUsuariosPROA` = `c`.`idUsuariosPROA`)) left join `asignacionalumno` `a` on(`p`.`idUsuariosPROA` = `a`.`idUsuariosPROA` and `e`.`codigoAsignatura` = `a`.`codigoAsignatura`)) ORDER BY `p`.`idUsuariosPROA` ASC, `e`.`idExamen` ASC, `pe`.`idPregunta` ASC ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_examenes_respuestas`
--
DROP TABLE IF EXISTS `vista_examenes_respuestas`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_examenes_respuestas`  AS SELECT `e`.`idExamen` AS `idExamen`, `e`.`codigoAsignatura` AS `codigoAsignatura`, `c`.`titulo` AS `titulo`, `q`.`enunciado` AS `pregunta`, `re`.`respuesta` AS `respuesta`, `re`.`valorRespuesta` AS `valorRespuesta` FROM ((((`examenes` `e` join `contenidoexamen` `c` on(`e`.`idContenido` = `c`.`idContenido`)) join `preguntasexamen` `q` on(`c`.`idContenido` = `q`.`idContenido`)) join `respuestasalumno` `r` on(`r`.`idExamen` = `e`.`idExamen` and `r`.`idPregunta` = `q`.`idPregunta`)) join `respuestasexamen` `re` on(`r`.`idRespuesta` = `re`.`idRespuesta`)) ORDER BY `e`.`idExamen` ASC, `q`.`idPregunta` ASC ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_profesores_asignaturas`
--
DROP TABLE IF EXISTS `vista_profesores_asignaturas`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_profesores_asignaturas`  AS SELECT `a`.`codigoAsignatura` AS `codigoAsignatura`, `a`.`nombre` AS `nombre`, group_concat(concat(`p`.`nombre`,' ',`p`.`apellidos`) order by `p`.`nombre` ASC separator ',') AS `profesores`, group_concat(case when `ad`.`responsable` = 1 then 'Responsable' else 'Colaborador' end order by `p`.`nombre` ASC separator ',') AS `tipo_profesor` FROM ((`asignaciondocentes` `ad` join `asignaturas` `a` on(`ad`.`codigoAsignatura` = `a`.`codigoAsignatura`)) join `personas` `p` on(`ad`.`idUsuariosPROA` = `p`.`idUsuariosPROA`)) GROUP BY `a`.`codigoAsignatura` ;

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
-- Indices de la tabla `respuestasalumno`
--
ALTER TABLE `respuestasalumno`
    ADD PRIMARY KEY (`idUsuariosPROA`,`idExamen`,`idPregunta`),
  ADD KEY `idExamen` (`idExamen`),
  ADD KEY `idPregunta` (`idPregunta`),
  ADD KEY `idRespuesta` (`idRespuesta`);

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
    MODIFY `idContenido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `cursos`
--
ALTER TABLE `cursos`
    MODIFY `idCurso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `departamentos`
--
ALTER TABLE `departamentos`
    MODIFY `idDepartamento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
    MODIFY `idExamen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

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
-- AUTO_INCREMENT de la tabla `preguntasexamen`
--
ALTER TABLE `preguntasexamen`
    MODIFY `idPregunta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `respuestasexamen`
--
ALTER TABLE `respuestasexamen`
    MODIFY `idRespuesta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

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
-- Filtros para la tabla `respuestasalumno`
--
ALTER TABLE `respuestasalumno`
    ADD CONSTRAINT `respuestasalumno_ibfk_1` FOREIGN KEY (`idUsuariosPROA`) REFERENCES `personas` (`idUsuariosPROA`) ON DELETE CASCADE,
  ADD CONSTRAINT `respuestasalumno_ibfk_2` FOREIGN KEY (`idExamen`) REFERENCES `examenes` (`idExamen`) ON DELETE CASCADE,
  ADD CONSTRAINT `respuestasalumno_ibfk_3` FOREIGN KEY (`idPregunta`) REFERENCES `preguntasexamen` (`idPregunta`) ON DELETE CASCADE,
  ADD CONSTRAINT `respuestasalumno_ibfk_4` FOREIGN KEY (`idRespuesta`) REFERENCES `respuestasexamen` (`idRespuesta`) ON DELETE CASCADE;

--
-- Filtros para la tabla `respuestasexamen`
--
ALTER TABLE `respuestasexamen`
    ADD CONSTRAINT `respuestasexamen_ibfk_1` FOREIGN KEY (`idPregunta`) REFERENCES `preguntasexamen` (`idPregunta`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
