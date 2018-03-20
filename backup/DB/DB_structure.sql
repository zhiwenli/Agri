-- MySQL dump 10.13  Distrib 5.6.31, for linux-glibc2.5 (x86_64)
--
-- Host: localhost    Database: Agri
-- ------------------------------------------------------
-- Server version	5.6.31-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `satellite`
--

DROP TABLE IF EXISTS `satellite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `satellite` (
  `entity_id` int(11) NOT NULL AUTO_INCREMENT,
  `type_id` int(11) NOT NULL DEFAULT '21',
  `status` int(11) NOT NULL DEFAULT '10',
  `create_by` int(11) NOT NULL,
  `last_modify` datetime DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `level` int(11) NOT NULL DEFAULT '30',
  `province` varchar(20) DEFAULT NULL,
  `city` varchar(20) DEFAULT NULL,
  `district` varchar(20) DEFAULT NULL,
  `lat` varchar(15) NOT NULL,
  `lng` varchar(15) NOT NULL,
  `icon` varchar(40) DEFAULT NULL,
  `key_words` varchar(100) DEFAULT NULL COMMENT 'fulltext全文索引',
  `popDialogBox_title` varchar(30) DEFAULT NULL,
  `popDialogBox_govImg` varchar(50) DEFAULT NULL,
  `popDialogBox_govUrl` varchar(500) DEFAULT NULL,
  `popDialogBox_descBg` varchar(50) DEFAULT NULL,
  `popDialogBox_descUrl` varchar(500) DEFAULT NULL,
  `popDialogBox_descText1` varchar(30) DEFAULT NULL,
  `popDialogBox_descText2` varchar(30) DEFAULT NULL,
  `popDialogBox_descIcon` varchar(50) DEFAULT NULL,
  `popDialogBox_2dBarcode` varchar(50) DEFAULT NULL,
  `popDialogBox_barcode` varchar(50) DEFAULT NULL,
  `popDialogBox_logo` varchar(50) DEFAULT NULL,
  `popDialogBox_toolImg1` varchar(50) DEFAULT NULL,
  `popDialogBox_toolText1` varchar(10) DEFAULT NULL,
  `popDialogBox_toolUrl1` varchar(500) DEFAULT NULL,
  `popDialogBox_toolImg2` varchar(50) DEFAULT NULL,
  `popDialogBox_toolText2` varchar(10) DEFAULT NULL,
  `popDialogBox_toolUrl2` varchar(500) DEFAULT NULL,
  `popDialogBox_toolImg3` varchar(50) DEFAULT NULL,
  `popDialogBox_toolText3` varchar(10) DEFAULT NULL,
  `popDialogBox_toolUrl3` varchar(500) DEFAULT NULL,
  `popDialogBox_toolImg4` varchar(50) DEFAULT NULL,
  `popDialogBox_toolText4` varchar(10) DEFAULT NULL,
  `popDialogBox_toolUrl4` varchar(500) DEFAULT NULL,
  `popDialogBox_toolImg5` varchar(50) DEFAULT NULL,
  `popDialogBox_toolText5` varchar(10) DEFAULT NULL,
  `popDialogBox_toolUrl5` varchar(500) DEFAULT NULL,
  `popDialogBox_toolImg6` varchar(50) DEFAULT NULL,
  `popDialogBox_toolText6` varchar(10) DEFAULT NULL,
  `popDialogBox_toolUrl6` varchar(500) DEFAULT NULL,
  `popDialogBox_toolImg7` varchar(100) DEFAULT NULL,
  `popDialogBox_toolText7` varchar(10) DEFAULT NULL,
  `popDialogBox_toolUrl7` varchar(500) DEFAULT NULL,
  `popDialogBox_toolImg8` varchar(50) DEFAULT NULL,
  `popDialogBox_toolText8` varchar(10) DEFAULT NULL,
  `popDialogBox_toolUrl8` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`entity_id`),
  FULLTEXT KEY `my_fulltext_index` (`key_words`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `speciality`
--

DROP TABLE IF EXISTS `speciality`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `speciality` (
  `entity_id` int(11) NOT NULL AUTO_INCREMENT,
  `type_id` int(11) NOT NULL DEFAULT '1',
  `status` int(11) NOT NULL DEFAULT '10',
  `create_by` int(11) NOT NULL,
  `last_modify` datetime DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `level` int(11) NOT NULL DEFAULT '30',
  `province` varchar(20) DEFAULT NULL,
  `city` varchar(20) DEFAULT NULL,
  `district` varchar(20) DEFAULT NULL,
  `lat` varchar(15) NOT NULL,
  `lng` varchar(15) NOT NULL,
  `icon` varchar(40) DEFAULT NULL,
  `key_words` varchar(100) DEFAULT NULL COMMENT 'fulltext全文索引',
  `popDialogBox_title` varchar(30) DEFAULT NULL,
  `popDialogBox_govImg` varchar(50) DEFAULT NULL,
  `popDialogBox_govUrl` varchar(500) DEFAULT NULL,
  `popDialogBox_descBg` varchar(50) DEFAULT NULL,
  `popDialogBox_descUrl` varchar(500) DEFAULT NULL,
  `popDialogBox_descText1` varchar(30) DEFAULT NULL,
  `popDialogBox_descText2` varchar(30) DEFAULT NULL,
  `popDialogBox_descIcon` varchar(50) DEFAULT NULL,
  `popDialogBox_2dBarcode` varchar(50) DEFAULT NULL,
  `popDialogBox_barcode` varchar(50) DEFAULT NULL,
  `popDialogBox_logo` varchar(50) DEFAULT NULL,
  `popDialogBox_toolImg1` varchar(50) DEFAULT NULL,
  `popDialogBox_toolText1` varchar(10) DEFAULT NULL,
  `popDialogBox_toolUrl1` varchar(500) DEFAULT NULL,
  `popDialogBox_toolImg2` varchar(50) DEFAULT NULL,
  `popDialogBox_toolText2` varchar(10) DEFAULT NULL,
  `popDialogBox_toolUrl2` varchar(500) DEFAULT NULL,
  `popDialogBox_toolImg3` varchar(50) DEFAULT NULL,
  `popDialogBox_toolText3` varchar(10) DEFAULT NULL,
  `popDialogBox_toolUrl3` varchar(500) DEFAULT NULL,
  `popDialogBox_toolImg4` varchar(50) DEFAULT NULL,
  `popDialogBox_toolText4` varchar(10) DEFAULT NULL,
  `popDialogBox_toolUrl4` varchar(500) DEFAULT NULL,
  `popDialogBox_toolImg5` varchar(50) DEFAULT NULL,
  `popDialogBox_toolText5` varchar(10) DEFAULT NULL,
  `popDialogBox_toolUrl5` varchar(500) DEFAULT NULL,
  `popDialogBox_toolImg6` varchar(50) DEFAULT NULL,
  `popDialogBox_toolText6` varchar(10) DEFAULT NULL,
  `popDialogBox_toolUrl6` varchar(500) DEFAULT NULL,
  `popDialogBox_toolImg7` varchar(100) DEFAULT NULL,
  `popDialogBox_toolText7` varchar(10) DEFAULT NULL,
  `popDialogBox_toolUrl7` varchar(500) DEFAULT NULL,
  `popDialogBox_toolImg8` varchar(50) DEFAULT NULL,
  `popDialogBox_toolText8` varchar(10) DEFAULT NULL,
  `popDialogBox_toolUrl8` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`entity_id`),
  FULLTEXT KEY `my_fulltext_index` (`key_words`)
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `station`
--

DROP TABLE IF EXISTS `station`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `station` (
  `entity_id` int(11) NOT NULL AUTO_INCREMENT,
  `type_id` int(11) NOT NULL DEFAULT '11',
  `status` int(11) NOT NULL DEFAULT '10',
  `create_by` int(11) NOT NULL,
  `last_modify` datetime DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `level` int(11) NOT NULL DEFAULT '30',
  `province` varchar(20) DEFAULT NULL,
  `city` varchar(20) DEFAULT NULL,
  `district` varchar(20) DEFAULT NULL,
  `lat` varchar(15) NOT NULL,
  `lng` varchar(15) NOT NULL,
  `icon` varchar(40) DEFAULT NULL,
  `key_words` varchar(100) DEFAULT NULL COMMENT 'fulltext全文索引',
  `popDialogBox_title` varchar(30) DEFAULT NULL,
  `popDialogBox_govImg` varchar(50) DEFAULT NULL,
  `popDialogBox_govUrl` varchar(500) DEFAULT NULL,
  `popDialogBox_descBg` varchar(50) DEFAULT NULL,
  `popDialogBox_descUrl` varchar(500) DEFAULT NULL,
  `popDialogBox_descText1` varchar(30) DEFAULT NULL,
  `popDialogBox_descText2` varchar(30) DEFAULT NULL,
  `popDialogBox_descIcon` varchar(50) DEFAULT NULL,
  `popDialogBox_2dBarcode` varchar(50) DEFAULT NULL,
  `popDialogBox_barcode` varchar(50) DEFAULT NULL,
  `popDialogBox_logo` varchar(50) DEFAULT NULL,
  `popDialogBox_toolImg1` varchar(50) DEFAULT NULL,
  `popDialogBox_toolText1` varchar(10) DEFAULT NULL,
  `popDialogBox_toolUrl1` varchar(500) DEFAULT NULL,
  `popDialogBox_toolImg2` varchar(50) DEFAULT NULL,
  `popDialogBox_toolText2` varchar(10) DEFAULT NULL,
  `popDialogBox_toolUrl2` varchar(500) DEFAULT NULL,
  `popDialogBox_toolImg3` varchar(50) DEFAULT NULL,
  `popDialogBox_toolText3` varchar(10) DEFAULT NULL,
  `popDialogBox_toolUrl3` varchar(500) DEFAULT NULL,
  `popDialogBox_toolImg4` varchar(50) DEFAULT NULL,
  `popDialogBox_toolText4` varchar(10) DEFAULT NULL,
  `popDialogBox_toolUrl4` varchar(500) DEFAULT NULL,
  `popDialogBox_toolImg5` varchar(50) DEFAULT NULL,
  `popDialogBox_toolText5` varchar(10) DEFAULT NULL,
  `popDialogBox_toolUrl5` varchar(500) DEFAULT NULL,
  `popDialogBox_toolImg6` varchar(50) DEFAULT NULL,
  `popDialogBox_toolText6` varchar(10) DEFAULT NULL,
  `popDialogBox_toolUrl6` varchar(500) DEFAULT NULL,
  `popDialogBox_toolImg7` varchar(100) DEFAULT NULL,
  `popDialogBox_toolText7` varchar(10) DEFAULT NULL,
  `popDialogBox_toolUrl7` varchar(500) DEFAULT NULL,
  `popDialogBox_toolImg8` varchar(50) DEFAULT NULL,
  `popDialogBox_toolText8` varchar(10) DEFAULT NULL,
  `popDialogBox_toolUrl8` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`entity_id`),
  FULLTEXT KEY `my_fulltext_index` (`key_words`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `email` varchar(50) NOT NULL,
  `pwd` varchar(50) NOT NULL COMMENT 'password',
  `tel` varchar(11) NOT NULL,
  `role` int(11) NOT NULL DEFAULT '100',
  `last_login` datetime NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-12-30 11:22:31
