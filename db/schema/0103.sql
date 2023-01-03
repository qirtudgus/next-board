-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: next_board_schema
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `board_table`
--

DROP TABLE IF EXISTS `board_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board_table` (
  `idx` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) COLLATE utf8mb4_bin NOT NULL DEFAULT '제목입니다',
  `content` varchar(500) COLLATE utf8mb4_bin NOT NULL DEFAULT '내용',
  `date` varchar(45) COLLATE utf8mb4_bin NOT NULL DEFAULT '0000-00-00',
  `userId` varchar(45) COLLATE utf8mb4_bin NOT NULL DEFAULT 'guest',
  `viewCount` varchar(45) COLLATE utf8mb4_bin NOT NULL DEFAULT '0',
  `commentCount` varchar(45) COLLATE utf8mb4_bin DEFAULT '0',
  `likeCount` varchar(45) COLLATE utf8mb4_bin NOT NULL DEFAULT '0',
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=178 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board_table`
--

LOCK TABLES `board_table` WRITE;
/*!40000 ALTER TABLE `board_table` DISABLE KEYS */;
INSERT INTO `board_table` VALUES (70,'제목인데요','내용인데요','2020-05-11','qirtudgus','0','0','0'),(71,'안녕하세요 자바스크립트는 너무나 어렵지만 너무나 재밌습니다','안녕하세요 자바스크립트는 너무나 어렵지만 너무나 재밌습니다','2020-02-11','qirtudgus','0','0','0'),(72,'안녕하세요 자바스크립트는 너무나 어렵지만 너무나 재밌습니다','안녕하세요 자바스크립트는 너무나 어렵지만 너무나 재밌습니다','2020-02-11','qirtudgus','0','0','0'),(73,'안녕하세요 자바스크립트는 너무나 어렵지만 너무나 재밌습니다','안녕하세요 자바스크립트는 너무나 어렵지만 너무나 재밌습니다','2020-05-11','qirtudgus','0','0','0'),(74,'안녕하세요 자바스크립트는 너무나 어렵지만 너무나 재밌습니다','안녕하세요 자바스크립트는 너무나 어렵지만 너무나 재밌습니다','2020-05-11','qirtudgus','0','0','0'),(75,'안녕하세요 자바스크립트는 너무나 어렵지만 너무나 재밌습니다','안녕하세요 자바스크립트는 너무나 어렵지만 너무나 재밌습니다','2020-05-11','qirtudgus','0','0','0'),(76,'안녕하세요 자바스크립트는 너무나 어렵지만 너무나 재밌습니다','안녕하세요 자바스크립트는 너무나 어렵지만 너무나 재밌습니다','2020-05-11','qirtudgus','0','0','0'),(77,'안녕하세요 자바스크립트는 너무나 어렵지만 너무나 재밌습니다','안녕하세요 자바스크립트는 너무나 어렵지만 너무나 재밌습니다','2020-05-11','qirtudgus','0','0','0'),(78,'안녕하세요 자바스크립트는 너무나 어렵지만 너무나 재밌습니다','안녕하세요 자바스크립트는 너무나 어렵지만 너무나 재밌습니다','2020-05-11','qirtudgus','0','0','0'),(79,'안녕하세요 자바스크립트는 너무나 어렵지만 너무나 재밌습니다','안녕하세요 자바스크립트는 너무나 어렵지만 너무나 재밌습니다','2020-05-11','qirtudgus','0','0','0'),(80,'안녕하세요 자바스크립트는 너무나 어렵지만 너무나 재밌습니다','안녕하세요 자바스크립트는 너무나 어렵지만 너무나 재밌습니다','2020-05-11','qirtudgus','0','0','0'),(81,'안녕하세요 자바스크립트는 너무나 어렵지만 너무나 재밌습니다','안녕하세요 자바스크립트는 너무나 어렵지만 너무나 재밌습니다','2020-05-11','qirtudgus','0','0','0'),(82,'안녕하세요 자바스크립트는 너무나 어렵지만 너무나 재밌습니다','안녕하세요 자바스크립트는 너무나 어렵지만 너무나 재밌습니다','2020-08-11','qirtudgus','0','0','0'),(83,'ㅁㅁ','내용','0000-00-00','guest','0','0','0'),(84,'ㅁㅁ','내용','0000-00-00','guest','0','0','0'),(85,'ㅁㅁ','내용','0000-00-00','guest','0','0','0'),(86,'ㅁㅁ','내용','0000-00-00','guest','0','0','0'),(87,'ㅁㅁ','내용','0000-00-00','guest','0','0','0'),(88,'ㅁㅁㅁ','내용','0000-00-00','guest','0','0','0'),(89,'ㅁㅁㅁ','내용','0000-00-00','guest','0','0','0'),(90,'ㅁㅁ','내용','0000-00-00','guest','0','0','0'),(91,'ㅁㅁ','내용','0000-00-00','guest','0','0','0'),(92,'ㅁㅁ','내용','0000-00-00','guest','0','0','0'),(93,'ㅁㅁ','내용','0000-00-00','guest','0','0','0'),(94,'ㅁㅁ','내용','0000-00-00','guest','0','0','0'),(95,'ㅁ','내용','0000-00-00','guest','0','0','0'),(96,'ㅁㅁ','내용','0000-00-00','guest','0','0','0'),(97,'ㅁ','내용','0000-00-00','guest','0','0','0'),(98,'ㅁㅁ','내용','0000-00-00','guest','0','0','0'),(99,'ㅁㅁ','내용','0000-00-00','guest','0','0','0'),(100,'ㅁ','내용','0000-00-00','guest','0','0','0'),(101,'ㅁㅁㅁ','내용','0000-00-00','guest','0','0','0'),(102,'ㅁㅁ','내용','0000-00-00','guest','0','0','0'),(103,'ㅁ','내용','0000-00-00','guest','0','0','0'),(104,'ㅁㅁ','내용','0000-00-00','guest','0','0','0'),(105,'ㅁㅁ','내용','0000-00-00','guest','0','0','0'),(106,'ㅁ','내용','0000-00-00','guest','0','0','0'),(107,'ㅁㅁ','내용','0000-00-00','guest','0','0','0'),(108,'ㅁ','내용','0000-00-00','guest','0','0','0'),(109,'ㅁㅁ','내용','0000-00-00','guest','0','0','0'),(110,'ㅁㅁ','내용','0000-00-00','guest','0','0','0'),(111,'ㅁㅁㅁㅁ','내용','0000-00-00','guest','0','0','0'),(112,'ㅁㅁ','내용','0000-00-00','guest','0','0','0'),(113,'ㅁ','내용','0000-00-00','guest','0','0','0'),(114,'ㅁㅁㅁㅁ','내용','0000-00-00','guest','0','0','0'),(115,'ㅁㅁ','내용','0000-00-00','guest','0','0','0'),(116,'ㅁ','내용','0000-00-00','guest','0','0','0'),(117,'ㅁㅁ','내용','0000-00-00','guest','0','0','0'),(118,'ㅁㅁ','내용','0000-00-00','guest','0','0','0'),(119,'ㅁㅁ','내용','0000-00-00','guest','0','0','0'),(120,'ㅁ','내용','0000-00-00','guest','0','0','0'),(121,'ㅁㅁ','내용','0000-00-00','guest','0','0','0'),(122,'ㅁ','내용','0000-00-00','guest','0','0','0'),(123,'ㅁㅁㅁ','내용','0000-00-00','guest','0','0','0'),(124,'ㅁ','내용','0000-00-00','guest','0','0','0'),(125,'ㅁㅁ','내용','0000-00-00','guest','0','0','0'),(126,'ㅁㅁ','내용','0000-00-00','guest','0','0','0'),(127,'ㅁ','내용','0000-00-00','guest','0','0','0'),(128,'ㅁㅁ','내용','0000-00-00','guest','0','0','0'),(129,'ㅁ','내용','0000-00-00','guest','0','0','0'),(130,'ㅁㅁ','내용','0000-00-00','guest','0','0','0'),(131,'ㅁㅁ','내용','0000-00-00','guest','0','0','0'),(132,'ㅁ','내용','0000-00-00','guest','0','0','0'),(133,'ㅁㅁ','내용','0000-00-00','guest','0','0','0'),(134,'ㅁㅁ','내용','0000-00-00','guest','0','0','0'),(135,'ㅁㅁ','내용','0000-00-00','guest','0','0','0'),(136,'ㅁㅁ','내용','0000-00-00','guest','0','0','0'),(137,'ㅁ','내용','0000-00-00','guest','0','0','0'),(138,'ㅁㅁㅁㅁ','내용','0000-00-00','guest','0','0','0'),(139,'ㅁ','내용','0000-00-00','guest','0','0','0'),(140,'ㅁㅁ','내용','0000-00-00','guest','0','0','0'),(141,'ㅁㅁ','내용','0000-00-00','guest','0','0','0'),(142,'ㅁ','내용','0000-00-00','guest','0','0','0'),(143,'ㅁㅁ','내용','0000-00-00','guest','0','0','0'),(144,'ㅁ','내용','0000-00-00','guest','0','0','0'),(145,'ㅁㅁ','내용','0000-00-00','guest','0','0','0'),(146,'ㅁㅁ','내용','0000-00-00','guest','0','0','0'),(147,'ㅁㅁ','내용','0000-00-00','guest','0','0','0'),(148,'ㅁ','내용','0000-00-00','guest','0','0','0'),(149,'ㅁ','내용','0000-00-00','guest','0','0','0'),(150,'ffkoesafjoasfeo','ffkoesafjoasfeo','0000-00-00','guest','0','0','0'),(151,'ffkoesafjoasfeo','내용','0000-00-00','guest','0','0','0'),(152,'ffkoesafjoasfeo','내용','0000-00-00','guest','0','0','0'),(153,'ffkoesafjoasfeo','내용','0000-00-00','guest','0','0','0'),(154,'ffkoesafjoasfeo','내용','0000-00-00','guest','0','0','0'),(155,'ffkoesafjoasfeo','내용','0000-00-00','guest','0','0','0'),(156,'ffkoesafjoasfeo','내용','0000-00-00','guest','0','0','0'),(157,'ffkoesafjoasfeo','내용','0000-00-00','guest','0','0','0'),(158,'ffkoesafjoasfeo','내용','0000-00-00','guest','0','0','0'),(159,'ffkoesafjoasfeo','내용','0000-00-00','guest','0','0','0'),(160,'ffkoesafjoasfeo','내용','0000-00-00','guest','0','0','0'),(161,'ffkoesafjoasfeo','내용','0000-00-00','guest','0','0','0'),(162,'ffkoesafjoasfeo','내용','0000-00-00','guest','0','0','0'),(163,'ffkoesafjoasfeo','내용','0000-00-00','guest','0','0','0'),(164,'ffkoesafjoasfeo','내용','0000-00-00','guest','0','0','0'),(165,'ffkoesafjoasfeo','내용','0000-00-00','guest','1','0','0'),(166,'ffkoesafjoasfeo','내용','0000-00-00','guest','1','0','0'),(167,'ffkoesafjoasfeo','내용','0000-00-00','guest','1','0','0'),(168,'ffkoesafjoasfeo','내용','0000-00-00','guest','4','0','0'),(169,'제목입니다','내용','0000-00-00','guest','18','0','0'),(175,'11','2g','2023-01-02 03:36:19','qirtudgus1','75','0','0'),(177,'zzzz','ggggggg','2023-01-02 05:02:13','q','12','0','0');
/*!40000 ALTER TABLE `board_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_table`
--

DROP TABLE IF EXISTS `user_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_table` (
  `idx` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(45) COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(45) COLLATE utf8mb4_bin NOT NULL,
  `password` varchar(200) COLLATE utf8mb4_bin NOT NULL,
  `salt` varchar(200) COLLATE utf8mb4_bin NOT NULL,
  `refreshToken` varchar(500) COLLATE utf8mb4_bin NOT NULL DEFAULT 'notFound',
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_table`
--

LOCK TABLES `user_table` WRITE;
/*!40000 ALTER TABLE `user_table` DISABLE KEYS */;
INSERT INTO `user_table` VALUES (23,'qr2ir2qk','박성ㅎㅎㅁ','cb1add3308d1fcd2b63ee300e6c46c6fa3ec844250511cb51d96353cbb443b0f','eae8418afc1ab67ddb07c7e35ea5356c','notFound'),(24,'qirtudgus','박성현','00dbb0dbda90d2da721df5e49db982d6d6804e2b5ba5734313c00383db3b0756','d54026262f8c26a1b3717e84779cb71d','notFound'),(25,'q','박성현','6e1541b22ad5295a849c7fc26e3264e38b7e98dba87a00e6a30794a341aa5de1','605916f7953570a6ed2bb02607e31688','eyJhbGciOiJIUzI1NiJ9.eyJpZCI6InEiLCJpYXQiOjE2NzIwOTU0MTAsImV4cCI6MTY3MjA5NTQxNX0.crSjZ9XlaWIGZvJoOjFtSJ3GUILA3OaeaShtJCBTJQo'),(26,'qirtudgus1','박성현','aa033d5dcdd56f0c5b988b114c78abde0d207fc7b7985ce9e96f22bfa4a6ec5c','ad325df065ab997f2c1559e46abcea17','notFound');
/*!40000 ALTER TABLE `user_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-03 13:18:25
