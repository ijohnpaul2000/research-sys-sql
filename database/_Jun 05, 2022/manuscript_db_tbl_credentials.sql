-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: manuscript_db
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `tbl_credentials`
--

DROP TABLE IF EXISTS `tbl_credentials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_credentials` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `expiredAt` datetime NOT NULL,
  `createdBy` varchar(45) NOT NULL,
  `role` varchar(45) DEFAULT 'Guest',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_credentials`
--

LOCK TABLES `tbl_credentials` WRITE;
/*!40000 ALTER TABLE `tbl_credentials` DISABLE KEYS */;
INSERT INTO `tbl_credentials` VALUES (1,'bagonanamangguest','$2b$10$pFTWKm5MmAxre9GU1zVpp.ruVUT7IO0jaao8v1rgBZk02.kVxKzlq','2022-05-18 09:55:04','2022-05-19 09:55:04','CEIT_Chairperson(CE)','Guest'),(2,'may20guestcredentials','$2b$10$KYRFCOaMctn3fiTfeLOhl.vy8ML225t1C/ZS6MbqFsfK1BXY8L.UK','2022-05-20 10:23:13','2022-05-21 10:23:13','CEIT_Chairperson(CE)','Guest'),(3,'guestCredentialsNew123','$2b$10$w7TL8x3YNTw28krGYVNYO.92HbMR9GHaKYHJ015YFa5ZtDwbxCAn.','2022-05-20 01:11:04','2022-05-21 01:11:04','CEIT_Chairperson(CE)','Guest'),(4,'almarmapagmahal','$2b$10$aQ7UoZAzG4i/0XtcveILHufZEt66h970q0HDfZH9qTOaOZhu7F4mm','2022-05-20 02:27:57','2022-05-21 02:27:57','CEIT_Dean','Guest');
/*!40000 ALTER TABLE `tbl_credentials` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-05 22:15:24
