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
-- Table structure for table `tbl_users`
--

DROP TABLE IF EXISTS `tbl_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(45) NOT NULL,
  `secret_id` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idusers_UNIQUE` (`id`),
  UNIQUE KEY `Username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_users`
--

LOCK TABLES `tbl_users` WRITE;
/*!40000 ALTER TABLE `tbl_users` DISABLE KEYS */;
INSERT INTO `tbl_users` VALUES (1,'CEIT_Chairperson(CE)','$2b$10$Lla2GBGB84O7NAWSIaDXket1Upes4cBKR3fkDuJVLS4tCquSPcrs6','Chairperson','1'),(2,'CEIT_Chairperson(EE)','$2b$10$cIm5nPTI4PitIHF/2OjM1e6ce3yy3TkkC9PpqkaLGSKZcsqR1I.Gu','Chairperson','2'),(3,'CEIT_Chairperson(IT)','$2b$10$35OAYrJdsPxXH211ridv5uahOEM/mE8y2z7TtIQiWI4Ju.3D7uhUC','Chairperson','3'),(4,'CEIT_Dean','$2b$10$gLI6Osx0BKzXd6.a8ofxEu.Le6zj4U2WzdVMqCXOHKvT4GTDF5Gfa','Dean','4'),(18,'bagoulit123','$2b$10$YTdDPzf9Qaaxf74fHhef.OyMTrwXbC4zpo/WLv9EqIxYs.igXT1z6','Chairperson','^2n4Zrt!'),(21,'Chaiperson(Other)','$2b$10$EKg/QFPnFik8DQdg/JT6v.6f5hqZySnWHjLL4rrrr0dPkio9i6MWq','Chairperson','e_C0YVF*O,xW.1N'),(22,'Dean_Winchester','$2b$10$I2A/1DPdE0pBuY4tQ.rEse1x1BQNiwooB/BTKowPB2EX/7oopsxau','Chairperson','*I_x|lU5Q*<MzyS'),(23,'Chairperson_CE1','$2b$10$7.VOEnQ7czdUC2aDmgh1ru595Z.0wWo1wqEqjTGs3vgpMXMSrYamC','Chairperson','6)ht)kl8{2VfYaP'),(24,'Chairperson_IT1','$2b$10$2i/HEXMhiLhr6FlGLzeq8eVLnca65O48otMsrtEl2Ra/KIwh1IObC','Chairperson','Y,W%g9wJ$:Q3o[-'),(27,'CEIT_Deans','$2b$10$VPNUsRimbeoT6/STCGkwy.JPc/ywX6WzOLETaCRgNR0oru9sdfWBK','Dean','_AUK(o=DbLbc:7A'),(28,'CEIT_Almar','$2b$10$HfcPcUgJP0CSkMiFvEdtEeVUj0Hgxct9KRwMC9QJkV6HnwPrqRlpy','Dean','Y}jeW*8SFqvi[eB');
/*!40000 ALTER TABLE `tbl_users` ENABLE KEYS */;
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
