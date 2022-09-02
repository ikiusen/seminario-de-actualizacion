-- Adminer 4.8.1 MySQL 5.5.5-10.3.34-MariaDB-0+deb10u1 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP DATABASE IF EXISTS `access-control-component`;
CREATE DATABASE `access-control-component` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `access-control-component`;

DELIMITER ;;

CREATE PROCEDURE `usp_authenticate_user`(IN `p_user_name` varchar(45), IN `p_user_password` varchar(45))
SELECT users.id FROM users WHERE users.name = p_user_name AND users.password = p_user_password;;

CREATE PROCEDURE `usp_create_action`(IN `p_name` varchar(45), IN `p_description` varchar(128))
INSERT INTO actions (name, description) VALUES (p_name, p_description);;

CREATE PROCEDURE `usp_create_group`(IN `p_name` varchar(45), IN `p_description` varchar(128))
INSERT INTO groups (name, description) VALUES (p_name, p_description);;

CREATE PROCEDURE `usp_create_group_access`(IN `p_group_id` int, IN `p_action_id` int)
INSERT INTO groups_accesses (group_id, action_id) VALUES (p_group_id, p_action_id);;

CREATE PROCEDURE `usp_create_group_member`(IN `p_user_id` int, IN `p_group_id` int)
INSERT INTO groups_members (user_id, group_id) VALUES (p_user_id, p_group_id);;

CREATE PROCEDURE `usp_create_user`(IN `p_name` varchar(45), IN `p_password` varchar(45))
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
        CALL usp_create_group_member(user_id, 3);
    COMMIT;
END;;

CREATE PROCEDURE `usp_create_user_information`(IN `p_user_id` int, IN `p_dni` varchar(45), IN `p_date_of_birth` date)
INSERT INTO users_information (user_id, dni, date_of_birth) values (p_user_id, p_dni, p_date_of_birth);;

CREATE PROCEDURE `usp_delete_action`(IN `p_id` int)
DELETE FROM actions WHERE id = p_id;;

CREATE PROCEDURE `usp_delete_group`(IN `p_id` int)
DELETE FROM groups WHERE id = p_id;;

CREATE PROCEDURE `usp_delete_group_access`(IN `p_group_id` int, IN `p_action_id` int)
DELETE FROM groups_accesses WHERE group_id = p_group_id AND actions_id = p_action_id;;

CREATE PROCEDURE `usp_delete_group_member`(IN `p_user_id` int, IN `p_group_id` int)
DELETE FROM groups_members WHERE user_id = p_user_id AND group_id = p_group_id;;

CREATE PROCEDURE `usp_delete_user`(IN `p_id` int)
DELETE FROM users WHERE id = p_id;;

CREATE PROCEDURE `usp_delete_user_information`(IN `p_user_id` int)
DELETE FROM users_information WHERE user_id = p_user_id;;

CREATE PROCEDURE `usp_get_all_actions`()
SELECT name, description FROM actions;;

CREATE PROCEDURE `usp_get_all_groups`()
SELECT name, description FROM groups;;

CREATE PROCEDURE `usp_get_all_groups_accesses`()
SELECT groups.name, actions.name, actions.description FROM groups
INNER JOIN groups_accesses ON groups.id = groups_accesses.group_id
INNER JOIN actions ON groups_accesses.action.id = actions.id
ORDER BY groups.name ASC;;

CREATE PROCEDURE `usp_get_all_groups_members`()
SELECT users.name, groups.name FROM users 
INNER JOIN groups_members ON users.id = groups_members.user_id
INNER JOIN groups ON groups_members.group_id = groups.id
ORDER BY groups.name ASC;;

CREATE PROCEDURE `usp_get_all_users`()
SELECT name, password FROM users;;

CREATE PROCEDURE `usp_get_all_users_information`()
SELECT users.name, users_information.dni, users_information.date_of_birth
FROM users INNER JOIN users_information ON users.id = users_information.users_id;;

CREATE PROCEDURE `usp_update_action`(IN `p_id` int, IN `p_name` varchar(45), IN `p_description` varchar(128))
UPDATE actions SET name = p_name, description = p_description WHERE id = p_id;;

CREATE PROCEDURE `usp_update_group`(IN `p_id` int, IN `p_new_name` varchar(45), IN `p_new_description` varchar(128))
UPDATE groups SET name = p_new_name, description = p_new_description WHERE id = p_id;;

CREATE PROCEDURE `usp_update_group_access`(IN `p_group_id` int, IN `p_action_id` int, IN `p_new_action_id` int)
UPDATE groups_accesses SET actions_id = p_new_action_id WHERE groups_id = p_group_id AND actions_id = p_action_id;;

CREATE PROCEDURE `usp_update_group_member`(IN `p_user_id` int, IN `p_group_id` int, IN `p_new_user_id` int)
UPDATE groups_members SET user_id = p_new_user_id WHERE group_id = p_group_id AND user_id = p_user_id;;

CREATE PROCEDURE `usp_update_user`(IN `p_id` int, IN `p_name` varchar(45), IN `p_password` varchar(45))
UPDATE users SET name = p_name, password = p_password WHERE id = p_id;;

CREATE PROCEDURE `usp_update_user_information`(IN `p_user_id` int, IN `p_dni` varchar(45), IN `p_date_of_birth` date)
UPDATE users_information SET dni = p_dni, date_of_birth = p_date_of_birth WHERE user_id = p_user_id;;

DELIMITER ;

DROP TABLE IF EXISTS `actions`;
CREATE TABLE `actions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


DROP TABLE IF EXISTS `groups`;
CREATE TABLE `groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `groups` (`id`, `name`, `description`) VALUES
(1,	'Administrator',	'Grupo que habilita todos los permisos'),
(2,	'Nobody',	'Grupo ficticio que no otorga ningún permiso'),
(3,	'Visitor',	'Grupo con permisos restringidos');

DROP TABLE IF EXISTS `groups_accesses`;
CREATE TABLE `groups_accesses` (
  `group_id` int(11) NOT NULL,
  `action_id` int(11) NOT NULL,
  KEY `group_id` (`group_id`),
  KEY `action_id` (`action_id`),
  CONSTRAINT `groups_accesses_ibfk_3` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE,
  CONSTRAINT `groups_accesses_ibfk_4` FOREIGN KEY (`action_id`) REFERENCES `actions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


DROP TABLE IF EXISTS `groups_members`;
CREATE TABLE `groups_members` (
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  KEY `user_id` (`user_id`),
  KEY `group_id` (`group_id`),
  CONSTRAINT `groups_members_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `groups_members_ibfk_4` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `groups_members` (`user_id`, `group_id`) VALUES
(8,	3),
(11,	3),
(14,	3),
(19,	3);

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `users` (`id`, `name`, `password`) VALUES
(8,	'Gabriel',	'asdjfhiaosñghasñg'),
(11,	'Juan',	'2341234123'),
(14,	'Romina',	'214144'),
(19,	'Ezequiel',	'soifhdasñfjhgaf');

DROP TABLE IF EXISTS `users_information`;
CREATE TABLE `users_information` (
  `user_id` int(11) NOT NULL,
  `dni` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `date_of_birth` date NOT NULL,
  UNIQUE KEY `users_id` (`user_id`),
  CONSTRAINT `users_information_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- 2022-09-02 15:00:24
