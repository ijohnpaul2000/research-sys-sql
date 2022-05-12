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
  `yearLevel` varchar(45) NOT NULL,
  `section` varchar(45) NOT NULL,
  `yearPublished` varchar(45) NOT NULL,
  `authors` varchar(255) NOT NULL,
  `panelists` varchar(255) NOT NULL,
  `copies` int NOT NULL,
  `volume` int NOT NULL,
  `grades` float NOT NULL,
  `keywords` varchar(255) NOT NULL,
  `adviser` varchar(255) NOT NULL,
  `chairperson` varchar(255) NOT NULL,
  `dean` varchar(255) NOT NULL,
  `abstract` varchar(10000) NOT NULL,
  PRIMARY KEY (`thesis_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_thesis`
--

LOCK TABLES `tbl_thesis` WRITE;
/*!40000 ALTER TABLE `tbl_thesis` DISABLE KEYS */;
INSERT INTO `tbl_thesis` VALUES (1,'A Chance For A Change: A 3D Animated Film For Election Campaign Etiquette Of The Republic Of The Philippines','Information Technology','4','1','2019','Miracle D. Gumayagay, Jerome P. Ricasa','Harry Kim B. Balois, MIT, Glenn G. Pangilinan',2,6,1,'3D, animation, film, etiquette','Rosalie P. Alejandro, CPE, LPT','Patrick Luis M. Francisco, MIT','Engr. Jordan N. Velasco, REE, RME','A chance for a change is a 3D animated film about election campaign etiquette. The study main goal is to give knowledge and awareness to the voters and also the candidates about what are the common rules and regulation about election campaign etiquette. The story of the movie is about a girl named Maria Dela Cruz decided to go back in the year 2019 to fix all the mistakes that is happening in the year 2045. Lola Anna the grandmother of Maria Dela Cruz tell her story of what\'s happening in th present and they think that the president cheated just to get the position. Maria made a time machine that she used to go back in the year 2019. While she is watching television the persons who\'s running for presidential candidacy were introduced and they are Coco Rapcion Governor of Koraptor City, Berto Dugo incumbent congressman of Marahas City, Promisina Napaco incumbent Mayor of Paco City, James Bituin a veteran actor and lastly is Juan Prinsipyo mayor of Maunlad City. She met the system developer of the PCOS named Steve Jogs. They talked to each other and told Steve Jogs that if he will manipulate the vote count many of them will suffer. The story end when Juan Prinsipyo get the position for being the president. Maria Dela Cruz came back to the future and saw the improvement of the city. The Proposed film, interpreting the real event on the election campaign will be of great help not only to the audience but also to all the inspiring politicians who would want to be a leader of the Philippines someday, it will give them an idea that doing illegal things during the election campaign is also a crime that is punishable by the law of the Republic of the Philippines. The proponents used Filipino language voice over for easy understanding of the viewer. Proponents used Autodesk 3Ds Max for modelling the characters and the environment of the film. Proponents also used Adobe Premiere for additional effects in the Video.');
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

-- Dump completed on 2022-05-12 17:41:02
