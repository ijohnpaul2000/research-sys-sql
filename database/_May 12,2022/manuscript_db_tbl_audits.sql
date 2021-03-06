-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: manuscript_db
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `tbl_audits`
--

DROP TABLE IF EXISTS `tbl_audits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_audits` (
  `id` int NOT NULL AUTO_INCREMENT,
  `accessedBy` varchar(45) NOT NULL,
  `timeIn` varchar(45) NOT NULL,
  `timeOut` varchar(45) NOT NULL,
  `deletedAt` datetime NOT NULL,
  `permittedBy` varchar(45) DEFAULT 'N/A',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_audits`
--

LOCK TABLES `tbl_audits` WRITE;
/*!40000 ALTER TABLE `tbl_audits` DISABLE KEYS */;
INSERT INTO `tbl_audits` VALUES (1,'CEIT_Chairperson(CE)','2022-05-12 03:45:14','2022-05-12 03:49:02','2022-05-19 03:45:14',NULL),(2,'CEIT_Chairperson(CE)','2022-05-12 03:52:41','2022-05-12 03:55:02','2022-05-19 03:52:41',NULL),(3,'Chairperson','2022-05-12 04:07:42','2022-05-12 04:08:51','2022-05-19 04:07:42',NULL),(4,'Chairperson','2022-05-12 04:09:36','2022-05-12 04:09:59','2022-05-19 04:09:36',NULL),(5,'Chairperson','2022-05-12 04:44:01','2022-05-12 04:44:28','2022-05-19 04:44:01',NULL),(6,'Guest','2022-05-12 04:45:57','2022-05-12 04:47:22','2022-05-19 04:45:57','CEIT_Chairperson(CE)');
/*!40000 ALTER TABLE `tbl_audits` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-12 17:41:02
