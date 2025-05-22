-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-05-2025 a las 18:36:48
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
-- Base de datos: `gti`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `institucion`
--

CREATE TABLE `institucion` (
  `codigoInstitucion` char(3) NOT NULL,
  `codigoTipoInstitucion` varchar(2) NOT NULL,
  `nombreInstitucion` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipoinstitucion`
--

CREATE TABLE `tipoinstitucion` (
  `codigoTipoInstitucion` varchar(2) NOT NULL,
  `nombreTipoInstitucion` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuariosgti`
--

CREATE TABLE `usuariosgti` (
  `idUsuariosGTI` int(11) NOT NULL,
  `email` varchar(254) NOT NULL,
  `nombre` varchar(64) NOT NULL,
  `apellidos` varchar(64) NOT NULL,
  `contraseña` varchar(64) NOT NULL,
  `codigoInstitucion` char(3) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 0,
  `token` varchar(36) DEFAULT NULL,
  `validez_token` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuariosgti`
--

INSERT INTO `usuariosgti` (`idUsuariosGTI`, `email`, `nombre`, `apellidos`, `contraseña`, `codigoInstitucion`, `telefono`, `estado`, `token`, `validez_token`) VALUES
(1, 'dapasa@har.upv.es', 'Daniel', 'Palacio', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', NULL, NULL, 0, NULL, NULL),
(2, 'jogilo@upvnet.upv.es', 'José Luis', 'Gimenez', 'db2e7f1bd5ab9968ae76199b7cc74795ca7404d5a08d78567715ce532f9d2669', NULL, NULL, 0, NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `institucion`
--
ALTER TABLE `institucion`
  ADD PRIMARY KEY (`codigoInstitucion`),
  ADD KEY `codigoTipoInstitucion` (`codigoTipoInstitucion`);

--
-- Indices de la tabla `tipoinstitucion`
--
ALTER TABLE `tipoinstitucion`
  ADD PRIMARY KEY (`codigoTipoInstitucion`);

--
-- Indices de la tabla `usuariosgti`
--
ALTER TABLE `usuariosgti`
  ADD PRIMARY KEY (`idUsuariosGTI`),
  ADD KEY `codigoInstitucion` (`codigoInstitucion`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuariosgti`
--
ALTER TABLE `usuariosgti`
  MODIFY `idUsuariosGTI` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `institucion`
--
ALTER TABLE `institucion`
  ADD CONSTRAINT `institucion_ibfk_1` FOREIGN KEY (`codigoTipoInstitucion`) REFERENCES `tipoinstitucion` (`codigoTipoInstitucion`);

--
-- Filtros para la tabla `usuariosgti`
--
ALTER TABLE `usuariosgti`
  ADD CONSTRAINT `usuariosgti_ibfk_1` FOREIGN KEY (`codigoInstitucion`) REFERENCES `institucion` (`codigoInstitucion`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
