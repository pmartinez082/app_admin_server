-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: putxerappdb
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ebaluazioa`
--

DROP TABLE IF EXISTS `ebaluazioa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ebaluazioa` (
  `idEbaluazioa` int NOT NULL AUTO_INCREMENT,
  `idEpaimahaikidea` int NOT NULL,
  `idEzaugarria` int NOT NULL,
  `idTaldea` int NOT NULL,
  `puntuak` smallint NOT NULL,
  `noiz` datetime NOT NULL,
  PRIMARY KEY (`idEbaluazioa`),
  KEY `fk_Ebaluazioa_Epaimahaikidea1_idx` (`idEpaimahaikidea`),
  KEY `fk_Ebaluazioa_Ezaugarria1_idx` (`idEzaugarria`),
  KEY `fk_Ebaluazioa_Taldea1_idx` (`idTaldea`),
  CONSTRAINT `fk_Ebaluazioa_Epaimahaikidea1` FOREIGN KEY (`idEpaimahaikidea`) REFERENCES `epaimahaikidea` (`idEpaimahaikidea`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Ebaluazioa_Ezaugarria1` FOREIGN KEY (`idEzaugarria`) REFERENCES `ezaugarria` (`idEzaugarria`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Ebaluazioa_Taldea1` FOREIGN KEY (`idTaldea`) REFERENCES `taldea` (`idTaldea`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=186 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ebaluazioa`
--

LOCK TABLES `ebaluazioa` WRITE;
/*!40000 ALTER TABLE `ebaluazioa` DISABLE KEYS */;
INSERT INTO `ebaluazioa` VALUES (125,21,21,3,5,'2024-12-03 22:19:41'),(126,21,22,3,5,'2024-12-03 22:19:41'),(127,21,21,4,2,'2024-12-03 22:19:49'),(128,21,22,4,3,'2024-12-03 22:19:49'),(133,21,21,8,2,'2024-12-03 22:20:34'),(134,21,22,8,3,'2024-12-03 22:20:34'),(135,21,21,9,4,'2024-12-03 22:20:40'),(136,21,22,9,5,'2024-12-03 22:20:40'),(143,21,21,13,2,'2024-12-03 22:21:09'),(144,21,22,13,3,'2024-12-03 22:21:09'),(149,22,21,3,5,'2024-12-03 22:22:27'),(150,22,22,3,6,'2024-12-03 22:22:27'),(151,22,21,4,6,'2024-12-03 22:22:36'),(152,22,22,4,8,'2024-12-03 22:22:36'),(157,22,21,8,10,'2024-12-03 22:22:57'),(158,22,22,8,5,'2024-12-03 22:22:57'),(159,22,21,9,5,'2024-12-03 22:23:05'),(160,22,22,9,7,'2024-12-03 22:23:05'),(167,22,21,13,7,'2024-12-03 22:23:31'),(168,22,22,13,8,'2024-12-03 22:23:31'),(175,23,23,3,1,'2024-12-14 16:35:53'),(176,23,24,3,3,'2024-12-14 16:35:53'),(177,23,23,16,1,'2024-12-14 16:38:20'),(178,23,24,16,2,'2024-12-14 16:38:20'),(179,23,25,16,3,'2024-12-14 16:38:20'),(185,23,23,4,6,'2025-03-12 12:15:54');
/*!40000 ALTER TABLE `ebaluazioa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `epaimahaikidea`
--

DROP TABLE IF EXISTS `epaimahaikidea`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `epaimahaikidea` (
  `idEpaimahaikidea` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `idFasea` int NOT NULL,
  PRIMARY KEY (`idEpaimahaikidea`),
  KEY `fk_Epaimahaikidea_User1_idx` (`username`),
  KEY `fk_Epaimahaikidea_Faseak1_idx` (`idFasea`),
  CONSTRAINT `fk_Epaimahaikidea_Fasea1` FOREIGN KEY (`idFasea`) REFERENCES `fasea` (`idFasea`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Epaimahaikidea_User1` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `epaimahaikidea`
--

LOCK TABLES `epaimahaikidea` WRITE;
/*!40000 ALTER TABLE `epaimahaikidea` DISABLE KEYS */;
INSERT INTO `epaimahaikidea` VALUES (21,'epaile1',26),(22,'epaile1234',26),(23,'epaile1',27),(24,'epaile2',27),(25,'txomin',27),(26,'pepita',28),(27,'pipi',28),(28,'popo',28),(29,'txomin',28),(30,'userPost3',28);
/*!40000 ALTER TABLE `epaimahaikidea` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ezaugarria`
--

DROP TABLE IF EXISTS `ezaugarria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ezaugarria` (
  `idEzaugarria` int NOT NULL AUTO_INCREMENT,
  `idFasea` int NOT NULL,
  `izena` varchar(45) NOT NULL,
  `puntuakMin` smallint NOT NULL,
  `puntuakMax` smallint NOT NULL,
  `ponderazioa` float DEFAULT '0.5',
  PRIMARY KEY (`idEzaugarria`),
  KEY `fk_Ezagaugarria_Fasea1_idx` (`idFasea`),
  CONSTRAINT `fk_Ezagaugarria_Fasea1` FOREIGN KEY (`idFasea`) REFERENCES `fasea` (`idFasea`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ezaugarria`
--

LOCK TABLES `ezaugarria` WRITE;
/*!40000 ALTER TABLE `ezaugarria` DISABLE KEYS */;
INSERT INTO `ezaugarria` VALUES (21,26,'kolorea',0,10,0.5),(22,26,'usaina',0,10,0.5),(23,27,'teknika',0,10,0.25),(24,27,'zaporea',0,10,0.5),(25,27,'produktua',0,10,0.25),(26,28,'orokorra',0,10,1);
/*!40000 ALTER TABLE `ezaugarria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fasea`
--

DROP TABLE IF EXISTS `fasea`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fasea` (
  `idFasea` int NOT NULL AUTO_INCREMENT,
  `idTxapelketa` int NOT NULL,
  `izena` varchar(45) NOT NULL,
  `egoera` smallint NOT NULL,
  `hasiera` datetime DEFAULT NULL,
  `amaiera` datetime DEFAULT NULL,
  `irizpidea` varchar(45) NOT NULL,
  PRIMARY KEY (`idFasea`),
  KEY `fk_Faseak_Txapelketa_idx` (`idTxapelketa`),
  CONSTRAINT `fk_Faseak_Txapelketa` FOREIGN KEY (`idTxapelketa`) REFERENCES `txapelketa` (`idTxapelketa`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fasea`
--

LOCK TABLES `fasea` WRITE;
/*!40000 ALTER TABLE `fasea` DISABLE KEYS */;
INSERT INTO `fasea` VALUES (26,74,'fasea1',2,NULL,'2024-12-12 14:00:00','% 75'),(27,74,'fasea2',1,'2024-12-12 14:30:00','2024-12-15 00:00:00','% 60'),(28,74,'Fasea3',0,'2024-12-10 00:00:00','2025-02-08 00:00:00','5');
/*!40000 ALTER TABLE `fasea` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taldea`
--

DROP TABLE IF EXISTS `taldea`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taldea` (
  `idTaldea` int NOT NULL AUTO_INCREMENT,
  `izena` varchar(45) NOT NULL,
  `email` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `telefonoa` int DEFAULT NULL,
  `puntuakGuztira` int DEFAULT NULL,
  `egoera` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`idTaldea`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taldea`
--

LOCK TABLES `taldea` WRITE;
/*!40000 ALTER TABLE `taldea` DISABLE KEYS */;
INSERT INTO `taldea` VALUES (3,'taldea3','taldea3@taldea.com',98765432,42,0),(4,'taldea4','taldea4@taldea.com',109876543,40,0),(8,'taldea8','taldea8@taldea.com',141312111,40,2),(9,'taldea9','taldea9@taldea.com',151413121,40,0),(13,'taldeaAdd','taldeaAdd@taldea.com',456123987,40,2),(16,'sdfhcgfjhbk','fghjnkml,@jkm,g.oc',78887878,2,2);
/*!40000 ALTER TABLE `taldea` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `txapelketa`
--

DROP TABLE IF EXISTS `txapelketa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `txapelketa` (
  `idTxapelketa` int NOT NULL AUTO_INCREMENT,
  `izena` varchar(45) NOT NULL,
  `dataOrdua` datetime NOT NULL,
  `lekua` varchar(256) NOT NULL,
  `egoera` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`idTxapelketa`)
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `txapelketa`
--

LOCK TABLES `txapelketa` WRITE;
/*!40000 ALTER TABLE `txapelketa` DISABLE KEYS */;
INSERT INTO `txapelketa` VALUES (74,'txapelketa1','2024-12-03 00:00:00','Bilbo',1);
/*!40000 ALTER TABLE `txapelketa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `username` varchar(100) NOT NULL,
  `password` varchar(45) NOT NULL,
  `role` enum('admin','referee') NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`username`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('aaa','aaa','referee','aaa@aaa.aaa'),('admin','admin','admin',NULL),('admin1','123','admin',NULL),('epaile1','epaile1','referee',NULL),('epaile1234','1234','referee','epaile@aaaa.com'),('epaile2','789','referee',NULL),('epaile3','abc','referee',NULL),('epaile4','def','referee',NULL),('jajaja','123','referee','ajajaja@ajaja.com'),('paula123','123','admin',NULL),('pepita','1234','referee','pepita@pepita.com'),('peter','peter','admin','peter@peter.com'),('pipi','pipi','referee','pipi@pipi.eus'),('popo','popo','referee','popo@popo.com'),('txomin','txomin','referee','txomin@txomin.com'),('userPost','froga','admin',NULL),('userPost3','froga3','referee',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-12 12:30:35
