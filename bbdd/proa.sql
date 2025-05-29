-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 29, 2025 at 02:37 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `proa`
--

-- --------------------------------------------------------

--
-- Table structure for table `asignacionalumno`
--

CREATE TABLE `asignacionalumno` (
                                    `idUsuariosPROA` int(11) NOT NULL,
                                    `codigoAsignatura` varchar(10) NOT NULL,
                                    `idGrupo` int(11) DEFAULT NULL,
                                    `asignaturaFavorita` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `asignaciondocentes`
--

CREATE TABLE `asignaciondocentes` (
                                      `idUsuariosPROA` int(11) NOT NULL,
                                      `codigoAsignatura` varchar(10) NOT NULL,
                                      `responsable` tinyint(1) DEFAULT NULL,
                                      `asignaturaFavorita` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `asignaturas`
--

CREATE TABLE `asignaturas` (
                               `codigoAsignatura` varchar(10) NOT NULL,
                               `codigoTitulacion` varchar(10) DEFAULT NULL,
                               `nombre` varchar(64) NOT NULL,
                               `creditos` tinyint(2) NOT NULL,
                               `idCurso` int(11) DEFAULT NULL,
                               `idSemestre` int(11) DEFAULT NULL,
                               `idDepartamento` int(11) DEFAULT NULL,
                               `idCaracter` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `avisos`
--

CREATE TABLE `avisos` (
                          `idAviso` int(11) NOT NULL,
                          `idContenidoAvisos` int(11) DEFAULT NULL,
                          `codigoAsignatura` varchar(10) DEFAULT NULL,
                          `idEstadoAvisos` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `calificaciones`
--

CREATE TABLE `calificaciones` (
                                  `idExamen` int(11) NOT NULL,
                                  `idUsuariosPROA` int(11) NOT NULL,
                                  `notaExamenAlumno` tinyint(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `caracteresasignatura`
--

CREATE TABLE `caracteresasignatura` (
                                        `idCaracter` int(11) NOT NULL,
                                        `tipoCaracter` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contenidoavisos`
--

CREATE TABLE `contenidoavisos` (
                                   `idContenidoAvisos` int(11) NOT NULL,
                                   `mensaje` text NOT NULL,
                                   `fechaAviso` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contenidoexamen`
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

-- --------------------------------------------------------

--
-- Table structure for table `cursos`
--

CREATE TABLE `cursos` (
                          `idCurso` int(11) NOT NULL,
                          `nombreCurso` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `departamentos`
--

CREATE TABLE `departamentos` (
                                 `idDepartamento` int(11) NOT NULL,
                                 `nombreDepartamento` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `estadosavisos`
--

CREATE TABLE `estadosavisos` (
                                 `idEstadoAvisos` int(11) NOT NULL,
                                 `tiposEstado` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `estadosexamen`
--

CREATE TABLE `estadosexamen` (
                                 `idEstado` int(11) NOT NULL,
                                 `nombreEstado` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `examenes`
--

CREATE TABLE `examenes` (
                            `idExamen` int(11) NOT NULL,
                            `codigoAsignatura` varchar(10) DEFAULT NULL,
                            `idGrupo` int(11) DEFAULT NULL,
                            `idContenido` int(11) DEFAULT NULL,
                            `idEstado` int(11) DEFAULT NULL,
                            `idUsuariosPROA` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `grupos`
--

CREATE TABLE `grupos` (
                          `idGrupo` int(11) NOT NULL,
                          `nombreGrupo` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `opcionespregunta`
--

CREATE TABLE `opcionespregunta` (
                                    `idOpcion` int(11) NOT NULL,
                                    `idPregunta` int(11) NOT NULL,
                                    `textoOpcion` text NOT NULL,
                                    `esCorrecta` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personarol`
--

CREATE TABLE `personarol` (
                              `idUsuariosPROA` int(11) NOT NULL,
                              `idRol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `personarol`
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
                                                         (9, 3);

-- --------------------------------------------------------

--
-- Table structure for table `personas`
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
-- Dumping data for table `personas`
--

INSERT INTO `personas` (`idUsuariosPROA`, `idUsuariosGTI`, `email`, `nombre`, `apellidos`, `contraseña`, `dni`) VALUES
                                                                                                                    (1, 1, 'l.simdre@epsg.upv.es', 'Lief', 'Simants Dredge', '8dfc2f2f0b4ba9ed2bcc2c0d3eacac63a8a7afde2cbf04e00c1ac5c9b0be7c1a', '01-9218611'),
                                                                                                                    (2, 2, 'd.rawabc@epsg.upv.es', 'Debora', 'Rawstorne', 'ccfa9b051d91b247edaf003a3252c61ddd76b272cba6b8aed343f8425eae684f', '05-9971924'),
                                                                                                                    (3, 1, 'k.poumai@upv.es', 'Kevan', 'Pounds Mainston', 'f64fa63b2e00256c04262c7d08df6071b768719cd0ef86b38a8735a67472569d', '60-4525956'),
                                                                                                                    (4, 2, 'l.prista@upv.es', 'Luelle', 'Pridmore Starsmeare', '3c6dcef0938cfaceeb3ad106f0fa6f282369719f6be74f003067cb02a49e684d', '64-6055365'),
                                                                                                                    (5, 1, 'o.breshe@upv.es', 'Ondrea', 'Brezlaw Sherwill', 'bb851090dcc953ef26cae58f00c3c8aa50170e667ef57b076271a96851d7c598', '88-1316390'),
                                                                                                                    (6, 2, 'b.maltho@upv.es', 'Brooke', 'Malimoe Thomerson', '8ef036a12431278a81500e463d247a9712e798be4870848f21703c847bf1f0a8', '91-1970980'),
                                                                                                                    (7, 4, 'p.rodgar@institucion.es', 'Pablo', 'Rodríguez García', '21ea1873efc272bfa5903e33d67d2a6585fadc934987e13700b359ad3052384d', '68-1114028'),
                                                                                                                    (8, 4, 's.morfer@institucion.es', 'Sofía', 'Moreno Fernández', 'b2233d8955bc461c1e58b77e63846a3a993b660369396ab3456a4750ab70576a', '31-1473681'),
                                                                                                                    (9, 4, 'm.fermor@institucion.es', 'Martina', 'Fernández Moreno', '61c2a1e3a3690527c61b6d38ad514ff2175d115e1368fd5e421c4dd880e5451b', '32-9850488');

-- --------------------------------------------------------

--
-- Table structure for table `preguntasexamen`
--

CREATE TABLE `preguntasexamen` (
                                   `idPregunta` int(11) NOT NULL,
                                   `enunciado` text NOT NULL,
                                   `valorPregunta` tinyint(3) NOT NULL,
                                   `idContenido` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `respuestasexamen`
--

CREATE TABLE `respuestasexamen` (
                                    `idRespuesta` int(11) NOT NULL,
                                    `respuesta` text NOT NULL,
                                    `valorRespuesta` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
                         `idRol` int(11) NOT NULL,
                         `nombreRol` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`idRol`, `nombreRol`) VALUES
                                               (1, 'alumno'),
                                               (2, 'profesor'),
                                               (3, 'pas');

-- --------------------------------------------------------

--
-- Table structure for table `semestres`
--

CREATE TABLE `semestres` (
                             `idSemestre` int(11) NOT NULL,
                             `nombreSemestre` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `titulacion`
--

CREATE TABLE `titulacion` (
                              `codigoTitulacion` varchar(10) NOT NULL,
                              `nombreTitulacion` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `asignacionalumno`
--
ALTER TABLE `asignacionalumno`
    ADD PRIMARY KEY (`idUsuariosPROA`,`codigoAsignatura`),
  ADD KEY `codigoAsignatura` (`codigoAsignatura`),
  ADD KEY `idGrupo` (`idGrupo`);

--
-- Indexes for table `asignaciondocentes`
--
ALTER TABLE `asignaciondocentes`
    ADD PRIMARY KEY (`idUsuariosPROA`,`codigoAsignatura`),
  ADD KEY `codigoAsignatura` (`codigoAsignatura`);

--
-- Indexes for table `asignaturas`
--
ALTER TABLE `asignaturas`
    ADD PRIMARY KEY (`codigoAsignatura`),
  ADD KEY `codigoTitulacion` (`codigoTitulacion`),
  ADD KEY `idCurso` (`idCurso`),
  ADD KEY `idSemestre` (`idSemestre`),
  ADD KEY `idDepartamento` (`idDepartamento`),
  ADD KEY `idCaracter` (`idCaracter`);

--
-- Indexes for table `avisos`
--
ALTER TABLE `avisos`
    ADD PRIMARY KEY (`idAviso`),
  ADD KEY `idContenidoAvisos` (`idContenidoAvisos`),
  ADD KEY `codigoAsignatura` (`codigoAsignatura`),
  ADD KEY `idEstadoAvisos` (`idEstadoAvisos`);

--
-- Indexes for table `calificaciones`
--
ALTER TABLE `calificaciones`
    ADD PRIMARY KEY (`idExamen`,`idUsuariosPROA`),
  ADD KEY `idUsuariosPROA` (`idUsuariosPROA`);

--
-- Indexes for table `caracteresasignatura`
--
ALTER TABLE `caracteresasignatura`
    ADD PRIMARY KEY (`idCaracter`);

--
-- Indexes for table `contenidoavisos`
--
ALTER TABLE `contenidoavisos`
    ADD PRIMARY KEY (`idContenidoAvisos`);

--
-- Indexes for table `contenidoexamen`
--
ALTER TABLE `contenidoexamen`
    ADD PRIMARY KEY (`idContenido`);

--
-- Indexes for table `cursos`
--
ALTER TABLE `cursos`
    ADD PRIMARY KEY (`idCurso`);

--
-- Indexes for table `departamentos`
--
ALTER TABLE `departamentos`
    ADD PRIMARY KEY (`idDepartamento`);

--
-- Indexes for table `estadosavisos`
--
ALTER TABLE `estadosavisos`
    ADD PRIMARY KEY (`idEstadoAvisos`);

--
-- Indexes for table `estadosexamen`
--
ALTER TABLE `estadosexamen`
    ADD PRIMARY KEY (`idEstado`);

--
-- Indexes for table `examenes`
--
ALTER TABLE `examenes`
    ADD PRIMARY KEY (`idExamen`),
  ADD KEY `codigoAsignatura` (`codigoAsignatura`),
  ADD KEY `idGrupo` (`idGrupo`),
  ADD KEY `idContenido` (`idContenido`),
  ADD KEY `idEstado` (`idEstado`),
  ADD KEY `idUsuariosPROA` (`idUsuariosPROA`);

--
-- Indexes for table `grupos`
--
ALTER TABLE `grupos`
    ADD PRIMARY KEY (`idGrupo`);

--
-- Indexes for table `opcionespregunta`
--
ALTER TABLE `opcionespregunta`
    ADD PRIMARY KEY (`idOpcion`),
  ADD KEY `idPregunta` (`idPregunta`);

--
-- Indexes for table `personarol`
--
ALTER TABLE `personarol`
    ADD PRIMARY KEY (`idUsuariosPROA`,`idRol`),
  ADD KEY `idRol` (`idRol`);

--
-- Indexes for table `personas`
--
ALTER TABLE `personas`
    ADD PRIMARY KEY (`idUsuariosPROA`);

--
-- Indexes for table `preguntasexamen`
--
ALTER TABLE `preguntasexamen`
    ADD PRIMARY KEY (`idPregunta`),
  ADD KEY `idContenido` (`idContenido`);

--
-- Indexes for table `respuestasexamen`
--
ALTER TABLE `respuestasexamen`
    ADD PRIMARY KEY (`idRespuesta`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
    ADD PRIMARY KEY (`idRol`);

--
-- Indexes for table `semestres`
--
ALTER TABLE `semestres`
    ADD PRIMARY KEY (`idSemestre`);

--
-- Indexes for table `titulacion`
--
ALTER TABLE `titulacion`
    ADD PRIMARY KEY (`codigoTitulacion`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `avisos`
--
ALTER TABLE `avisos`
    MODIFY `idAviso` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `caracteresasignatura`
--
ALTER TABLE `caracteresasignatura`
    MODIFY `idCaracter` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contenidoavisos`
--
ALTER TABLE `contenidoavisos`
    MODIFY `idContenidoAvisos` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contenidoexamen`
--
ALTER TABLE `contenidoexamen`
    MODIFY `idContenido` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cursos`
--
ALTER TABLE `cursos`
    MODIFY `idCurso` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `departamentos`
--
ALTER TABLE `departamentos`
    MODIFY `idDepartamento` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `estadosavisos`
--
ALTER TABLE `estadosavisos`
    MODIFY `idEstadoAvisos` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `estadosexamen`
--
ALTER TABLE `estadosexamen`
    MODIFY `idEstado` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `examenes`
--
ALTER TABLE `examenes`
    MODIFY `idExamen` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `grupos`
--
ALTER TABLE `grupos`
    MODIFY `idGrupo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `opcionespregunta`
--
ALTER TABLE `opcionespregunta`
    MODIFY `idOpcion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personas`
--
ALTER TABLE `personas`
    MODIFY `idUsuariosPROA` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `preguntasexamen`
--
ALTER TABLE `preguntasexamen`
    MODIFY `idPregunta` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `respuestasexamen`
--
ALTER TABLE `respuestasexamen`
    MODIFY `idRespuesta` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
    MODIFY `idRol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `semestres`
--
ALTER TABLE `semestres`
    MODIFY `idSemestre` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `asignacionalumno`
--
ALTER TABLE `asignacionalumno`
    ADD CONSTRAINT `asignacionalumno_ibfk_1` FOREIGN KEY (`idUsuariosPROA`) REFERENCES `personas` (`idUsuariosPROA`),
  ADD CONSTRAINT `asignacionalumno_ibfk_2` FOREIGN KEY (`codigoAsignatura`) REFERENCES `asignaturas` (`codigoAsignatura`),
  ADD CONSTRAINT `asignacionalumno_ibfk_3` FOREIGN KEY (`idGrupo`) REFERENCES `grupos` (`idGrupo`);

--
-- Constraints for table `asignaciondocentes`
--
ALTER TABLE `asignaciondocentes`
    ADD CONSTRAINT `asignaciondocentes_ibfk_1` FOREIGN KEY (`idUsuariosPROA`) REFERENCES `personas` (`idUsuariosPROA`),
  ADD CONSTRAINT `asignaciondocentes_ibfk_2` FOREIGN KEY (`codigoAsignatura`) REFERENCES `asignaturas` (`codigoAsignatura`);

--
-- Constraints for table `asignaturas`
--
ALTER TABLE `asignaturas`
    ADD CONSTRAINT `asignaturas_ibfk_1` FOREIGN KEY (`codigoTitulacion`) REFERENCES `titulacion` (`codigoTitulacion`),
  ADD CONSTRAINT `asignaturas_ibfk_2` FOREIGN KEY (`idCurso`) REFERENCES `cursos` (`idCurso`),
  ADD CONSTRAINT `asignaturas_ibfk_3` FOREIGN KEY (`idSemestre`) REFERENCES `semestres` (`idSemestre`),
  ADD CONSTRAINT `asignaturas_ibfk_4` FOREIGN KEY (`idDepartamento`) REFERENCES `departamentos` (`idDepartamento`),
  ADD CONSTRAINT `asignaturas_ibfk_5` FOREIGN KEY (`idCaracter`) REFERENCES `caracteresasignatura` (`idCaracter`);

--
-- Constraints for table `avisos`
--
ALTER TABLE `avisos`
    ADD CONSTRAINT `avisos_ibfk_1` FOREIGN KEY (`idContenidoAvisos`) REFERENCES `contenidoavisos` (`idContenidoAvisos`),
  ADD CONSTRAINT `avisos_ibfk_2` FOREIGN KEY (`codigoAsignatura`) REFERENCES `asignaturas` (`codigoAsignatura`),
  ADD CONSTRAINT `avisos_ibfk_3` FOREIGN KEY (`idEstadoAvisos`) REFERENCES `estadosavisos` (`idEstadoAvisos`);

--
-- Constraints for table `calificaciones`
--
ALTER TABLE `calificaciones`
    ADD CONSTRAINT `calificaciones_ibfk_1` FOREIGN KEY (`idExamen`) REFERENCES `examenes` (`idExamen`),
  ADD CONSTRAINT `calificaciones_ibfk_2` FOREIGN KEY (`idUsuariosPROA`) REFERENCES `personas` (`idUsuariosPROA`);

--
-- Constraints for table `examenes`
--
ALTER TABLE `examenes`
    ADD CONSTRAINT `examenes_ibfk_1` FOREIGN KEY (`codigoAsignatura`) REFERENCES `asignaturas` (`codigoAsignatura`),
  ADD CONSTRAINT `examenes_ibfk_2` FOREIGN KEY (`idGrupo`) REFERENCES `grupos` (`idGrupo`),
  ADD CONSTRAINT `examenes_ibfk_3` FOREIGN KEY (`idContenido`) REFERENCES `contenidoexamen` (`idContenido`),
  ADD CONSTRAINT `examenes_ibfk_4` FOREIGN KEY (`idEstado`) REFERENCES `estadosexamen` (`idEstado`),
  ADD CONSTRAINT `examenes_ibfk_5` FOREIGN KEY (`idUsuariosPROA`) REFERENCES `personas` (`idUsuariosPROA`);

--
-- Constraints for table `opcionespregunta`
--
ALTER TABLE `opcionespregunta`
    ADD CONSTRAINT `opcionespregunta_ibfk_1` FOREIGN KEY (`idPregunta`) REFERENCES `preguntasexamen` (`idPregunta`) ON DELETE CASCADE;

--
-- Constraints for table `personarol`
--
ALTER TABLE `personarol`
    ADD CONSTRAINT `personarol_ibfk_1` FOREIGN KEY (`idUsuariosPROA`) REFERENCES `personas` (`idUsuariosPROA`),
  ADD CONSTRAINT `personarol_ibfk_2` FOREIGN KEY (`idRol`) REFERENCES `roles` (`idRol`);

--
-- Constraints for table `preguntasexamen`
--
ALTER TABLE `preguntasexamen`
    ADD CONSTRAINT `preguntasexamen_ibfk_2` FOREIGN KEY (`idContenido`) REFERENCES `contenidoexamen` (`idContenido`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
