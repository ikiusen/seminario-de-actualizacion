-- Adminer 4.8.1 MySQL 8.0.29 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP DATABASE IF EXISTS `access-control-component`;
CREATE DATABASE `access-control-component` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `access-control-component`;

DELIMITER ;;

CREATE PROCEDURE `usp-add-user-to-group`(IN `p_user_id` int, IN `p_group_id` int)
INSERT INTO groups_members (user_id, group_id) VALUES (p_user_id, p_group_id);;

CREATE PROCEDURE `usp-authenticate-user`(IN `p_user_name` varchar(45), IN `p_user_password` varchar(45))
SELECT users.id FROM users WHERE users.name = p_user_name AND users.password = p_user_password;;

CREATE PROCEDURE `usp-create-group`(IN `p_name` varchar(45), IN `p_description` varchar(128))
INSERT INTO `groups` (name, description) VALUES (p_name, p_description);;

CREATE PROCEDURE `usp-create-group-member`(IN `p_user_id` int, IN `p_group_id` int)
INSERT INTO groups_members (user_id, group_id) VALUES (p_user_id, p_group_id);;

CREATE PROCEDURE `usp-create-user`(IN `p_name` varchar(45), IN `p_password` varchar(45))
BEGIN
DECLARE user_id INT DEFAULT 0;
DECLARE EXIT HANDLER FOR SQLEXCEPTION
   BEGIN
            ROLLBACK;
            RESIGNAL;
   END;
    START TRANSACTION;
        INSERT INTO users(name, password) VALUES (p_name, p_password);
        SET user_id = LAST_INSERT_ID();
        CALL `usp-create-group-member`(user_id, 3);
    COMMIT;
END;;

CREATE PROCEDURE `usp-delete-group`(IN `p_id` int)
DELETE FROM `groups` WHERE id = p_id;;

CREATE PROCEDURE `usp-delete-user`(IN `p_id` int)
DELETE FROM users WHERE id = p_id;;

CREATE PROCEDURE `usp-get-all-groups`()
SELECT id, name, description FROM `groups`;;

CREATE PROCEDURE `usp-get-all-groups-members`()
SELECT users.name, `groups`.name FROM users 
INNER JOIN groups_members ON users.id = groups_members.user_id
INNER JOIN `groups` ON groups_members.group_id = `groups`.id
ORDER BY `groups`.name ASC;;

CREATE PROCEDURE `usp-get-all-users`()
SELECT id, name FROM users;;

CREATE PROCEDURE `usp-get-group-by-id`(IN `p_id` int)
SELECT name, description FROM `groups` WHERE `groups`.id = p_id;;

CREATE PROCEDURE `usp-get-groups-where-user-is-in`(IN `p_id` int)
SELECT `groups`.id, `groups`.name FROM `groups` 
INNER JOIN groups_members ON `groups`.id = groups_members.group_id 
INNER JOIN users ON groups_members.user_id = users.id
WHERE groups_members.user_id = p_id;;

CREATE PROCEDURE `usp-get-groups-where-user-not-in`(IN `p_id` int)
SELECT `groups`.id, `groups`.name FROM `groups` WHERE `groups`.id NOT IN (
SELECT `groups`.id FROM `groups` 
INNER JOIN groups_members ON `groups`.id = groups_members.group_id 
WHERE groups_members.user_id = p_id);;

CREATE PROCEDURE `usp-get-user-by-id`(IN `p_id` int)
SELECT name FROM users WHERE id = p_id;;

CREATE PROCEDURE `usp-get-users-by-group`(IN `p_id` tinyint)
SELECT users.name FROM users 
INNER JOIN groups_members ON groups_members.user_id = users.id 
INNER JOIN `groups`ON groups_members.group_id = `groups`.id
WHERE `groups`.id = p_id;;

CREATE PROCEDURE `usp-remove-user-from-group`(IN `p_user_id` int, IN `p_group_id` int)
DELETE FROM groups_members WHERE user_id = p_user_id AND group_id = p_group_id;;

CREATE PROCEDURE `usp-update-group`(IN `p_id` int, IN `p_new_name` varchar(45), IN `p_new_description` varchar(128))
UPDATE `groups` SET name = p_new_name, description = p_new_description WHERE id = p_id;;

CREATE PROCEDURE `usp-update-group-member`(IN `p_user_id` int, IN `p_group_id` int, IN `p_new_user_id` int)
UPDATE groups_members SET user_id = p_new_user_id WHERE group_id = p_group_id AND user_id = p_user_id;;

CREATE PROCEDURE `usp-update-user`(IN `p_id` int, IN `p_name` varchar(45), IN `p_password` varchar(45))
UPDATE users SET name = p_name, password = p_password WHERE id = p_id;;

DELIMITER ;

DROP TABLE IF EXISTS `groups`;
CREATE TABLE `groups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(128) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

INSERT INTO `groups` (`id`, `name`, `description`) VALUES
(1,	'Administrator',	'Grupo que habilita todos los permisos'),
(3,	'Visitor',	'Grupo con permisos restringidos'),
(5,	'Nobody',	'Grupo ficticio que no otorga ningún permiso');

DROP TABLE IF EXISTS `groups_members`;
CREATE TABLE `groups_members` (
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  KEY `user_id` (`user_id`),
  KEY `group_id` (`group_id`),
  CONSTRAINT `groups_members_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `groups_members_ibfk_4` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

INSERT INTO `groups_members` (`user_id`, `group_id`) VALUES
(26,	3),
(32,	3),
(31,	3),
(35,	3);

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

INSERT INTO `users` (`id`, `name`, `password`) VALUES
(26,	'Thiago',	'1234'),
(31,	'Gabriela',	'asdasda'),
(32,	'Pedro',	'sadfas'),
(35,	'Jose',	'23123123');

-- 2022-10-04 01:12:39
