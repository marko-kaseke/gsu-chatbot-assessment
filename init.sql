/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.8.2-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: smartassistdb
-- ------------------------------------------------------
-- Server version	11.8.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `message` text DEFAULT NULL,
  `response` text DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  `version` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `chat` VALUES
(25,'hi','Hi! How can I assist you today?','2026-04-09 23:56:14',0),
(26,'im good','Hey! How can I help you today?','2026-04-09 23:56:45',0),
(27,'your policies','Please go ahead and ask your question!','2026-04-09 23:57:24',0),
(28,'do you refund','Do you refund?\n\nAccording to our Knowledge Base: \"You can request a refund within 30 days of purchase.\"','2026-04-09 23:58:57',0),
(29,'ok','Let\'s get started!\n\nWhat would you like to know or talk about?','2026-04-10 00:00:08',0),
(30,'hi','Hi! Nice to chat with you. How can I assist you today?','2026-04-10 00:04:23',0),
(31,'who are you','I am GSU SmartAssist, an intelligent university chatbot for Gwanda State University designed to assist students, staff, and prospective applicants with institutional information such as admissions, programs, fees, academic calendar, library services, ICT support, and general enquiries.','2026-04-10 00:05:03',0),
(32,'ok bye','Bye!','2026-04-10 00:05:43',0),
(33,'hi','Hi!','2026-04-10 03:51:09',0),
(34,'hi','Hi! How can I help you today?','2026-04-10 04:23:33',0),
(35,'hi','Hi!','2026-04-10 04:25:35',0),
(36,'hi','Hi! How can I help you today?','2026-04-13 10:37:50',0),
(37,'who are you','A new acquaintance! I\'m an AI chatbot, here to assist you with any questions or concerns related to Gwanda State University. I don\'t have personal experiences or emotions, but I can provide helpful information based on the knowledge base we\'ve been given. What would you like to know?','2026-04-13 10:39:36',0);
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `knowledgebase`
--

DROP TABLE IF EXISTS `knowledgebase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `knowledgebase` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(100) DEFAULT NULL,
  `question` text DEFAULT NULL,
  `answer` text DEFAULT NULL,
  `keywords` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`keywords`)),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `knowledgebase`
--

LOCK TABLES `knowledgebase` WRITE;
/*!40000 ALTER TABLE `knowledgebase` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `knowledgebase` VALUES
(14,'hhh','What are the general requirements for undergraduate admission to Gwanda State University?',' zxd dxzddd','[\"Zimbabwe\",\"Gwanda State University\",\"university admission\",\"A-Level\",\"undergraduate\",\"requirements\"]'),
(16,'yymky','tykmtykmyt','tykmyktyktk','[\"tyktykytkty\"]');
/*!40000 ALTER TABLE `knowledgebase` ENABLE KEYS */;
UNLOCK TABLES;
commit;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2026-04-13 13:10:43
