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
-- Table structure for table `tbl_thesis`
--

DROP TABLE IF EXISTS `tbl_thesis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_thesis` (
  `thesis_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `course` varchar(45) NOT NULL,
  `section` varchar(45) NOT NULL,
  `yearPublished` varchar(45) NOT NULL,
  `authors` varchar(45) NOT NULL,
  `panelists` varchar(45) NOT NULL,
  `copies` int NOT NULL,
  `volume` int NOT NULL,
  `grades` float NOT NULL,
  `keywords` varchar(45) NOT NULL,
  `adviser` varchar(45) NOT NULL,
  `chairperson` varchar(45) NOT NULL,
  `dean` varchar(45) NOT NULL,
  `abstract` varchar(10000) NOT NULL,
  PRIMARY KEY (`thesis_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_thesis`
--

LOCK TABLES `tbl_thesis` WRITE;
/*!40000 ALTER TABLE `tbl_thesis` DISABLE KEYS */;
INSERT INTO `tbl_thesis` VALUES (2,'aasas','Information Technology','3-1','2022','3232','3dadad',3,3,3,'qeqeq','eqeqeq','ffdfdf','fdfdf','fdfdfdf'),(3,'adadad','Information Technology','3-1','2014','adadad','adadad',1,2,2,'Ss','sSs','SsS','sSsS','ZCZSFSF'),(4,'sdsds','Information Technology','3-1','2022','sdsdsd','sdsssdsd',23,23,3,'adDDddD','dDdDdDd','ddDdDd','ddddd','DDdDDD'),(5,'sample title','Information Technology','3-1','2022','adaa','adaad',3,3,3,'qeqe','qeqeqeq','eqeqeqe','qeqeqe','qeqeqqeq'),(6,'addad','Information Technology','3-1','2022','adda','adadd',1,2,2,'2ewewwe','wwewe','ewweew','wewewe','ewewe'),(7,'asasasa','Information Technology','3-1','2022','sasas','sasasa',2,2,2,'dadd','dd','sdsd','sdsd','dsds'),(8,'sss','Information Technology','3-1','2022','ssss','sss',1,2,2,'sss','ssss','sss','ssss','ssssss'),(9,'xasas','Information Technology','3-1','2022','sas','asas',1,1,1,'sa','sasas','asas','asas','sasa'),(10,'sss','Information Technology','3-1','2022','ss','sss',1,1,1,'ss','sss','sss','sss','sssssss'),(11,'sss','Information Technology','3-1','2022','sss','ssss',1,1,1,'sss','ssss','sss','sss','sssss'),(12,'ddd','Information Technology','3-1','2022','dddd','dddd',1,1,1,'wwww','wwww','wwww','wwww','wwwww'),(13,'ssss','Information Technology','3-1','2022','sss','ssss',2,2,2,'sss','ssss','ssss','ssss','sssss'),(14,'ddd','Information Technology','3-1','2022','ddd','dddd',1,1,1,'1weeewe','ewewe','eewwe','wewewe','ewewewe'),(15,'swww','Information Technology','3-1','2022','www','wwww',1,1,1,'wqw','wqwqw','qwqw','qwqw','wqwqw'),(16,'asasasas','Information Technology','3-1','2020','asasas','asasasas',1,2,3,'e','e','e','e','eee'),(17,'eee','Information Technology','3-1','2022','eeee','eeee',1,1,1,'111','11','222','222','www'),(18,'sass','Information Technology','3-1','2022','asasa','sassa',1,1,1,'sasas','sasas','asasasas','sasas','sasasassas'),(19,'asas','Information Technology','3-1','2022','sasas','assas',1,1,1,'awewe','wewewe','wewewe','wewewew','ewewewe'),(20,'ssss','Information Technology','3-1','2022','sss','qqqq',1,1,1,'wasasas','asasas','asasa','asasa','asaasa'),(21,'aas','Information Technology','3-1','2022','asas','asasasas',1,11,1,'asass','assasaas','sasaas','sasasasa','asassaas'),(22,'sss','Information Technology','3-1','2022','ssss','ssss',1,1,1,'sss','sss','sss','sss','www'),(23,'aaa','Information Technology','3-1','2022','ssss','sss',1,1,1,'sasas','sasa','asas','asas','asas');
/*!40000 ALTER TABLE `tbl_thesis` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-29 16:35:41
