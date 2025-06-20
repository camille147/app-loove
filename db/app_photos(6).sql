-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 20 juin 2025 à 21:53
-- Version du serveur : 9.1.0
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `app_photos`
--

-- --------------------------------------------------------

--
-- Structure de la table `albums`
--

DROP TABLE IF EXISTS `albums`;
CREATE TABLE IF NOT EXISTS `albums` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `visibility` enum('private','public','restricted') DEFAULT 'private',
  `img_profile_album` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `album_access`
--

DROP TABLE IF EXISTS `album_access`;
CREATE TABLE IF NOT EXISTS `album_access` (
  `album_id` int NOT NULL,
  `user_id` int NOT NULL,
  `permission` enum('view','comment','edit') DEFAULT 'view',
  `granted_by` int DEFAULT NULL,
  `granted_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`album_id`,`user_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `photo_id` int NOT NULL,
  `user_id` int NOT NULL,
  `comment` text NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `photo_id` (`photo_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `favori`
--

DROP TABLE IF EXISTS `favori`;
CREATE TABLE IF NOT EXISTS `favori` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `photo_id` int NOT NULL,
  `uploaded_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`photo_id`),
  KEY `photo_id` (`photo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `log`
--

DROP TABLE IF EXISTS `log`;
CREATE TABLE IF NOT EXISTS `log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `action` varchar(100) DEFAULT NULL,
  `details` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `photos`
--

DROP TABLE IF EXISTS `photos`;
CREATE TABLE IF NOT EXISTS `photos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `filename` varchar(255) NOT NULL,
  `description` text,
  `taken_at` date DEFAULT NULL,
  `uploaded_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `alt` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `title` varchar(100) NOT NULL,
  `is_favorite` tinyint(1) NOT NULL DEFAULT '0',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `album_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `photos_user_fk` (`user_id`),
  KEY `fk_album_photo` (`album_id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `photo_album`
--

DROP TABLE IF EXISTS `photo_album`;
CREATE TABLE IF NOT EXISTS `photo_album` (
  `id_photo` int NOT NULL,
  `id_album` int NOT NULL,
  PRIMARY KEY (`id_photo`,`id_album`),
  KEY `fk_album` (`id_album`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `photo_tags`
--

DROP TABLE IF EXISTS `photo_tags`;
CREATE TABLE IF NOT EXISTS `photo_tags` (
  `photo_id` int NOT NULL,
  `tag_id` int NOT NULL,
  PRIMARY KEY (`photo_id`,`tag_id`),
  KEY `tag_id` (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `sharing`
--

DROP TABLE IF EXISTS `sharing`;
CREATE TABLE IF NOT EXISTS `sharing` (
  `id` int NOT NULL AUTO_INCREMENT,
  `album_id` int NOT NULL,
  `user_id` int NOT NULL,
  `permission` enum('read','comment','add') NOT NULL,
  `share_link` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `album_id` (`album_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `tags`
--

DROP TABLE IF EXISTS `tags`;
CREATE TABLE IF NOT EXISTS `tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `tags`
--

INSERT INTO `tags` (`id`, `name`) VALUES
(11, 'create'),
(3, 'Ferrari'),
(14, 'g'),
(12, 'Lando'),
(6, 'Leclerc'),
(13, 'manille'),
(2, 'Max'),
(1, 'Monaco'),
(5, 'Monza'),
(4, 'Podium'),
(10, 'ted'),
(7, 'test');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `role` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `bio` text,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password_hash`, `profile_picture`, `role`, `created_at`, `updated_at`, `bio`, `is_deleted`) VALUES
(1, 'admin1', 'admin1@mail.com', '$2y$12$Y9wUp7QjlvwioRGPnQBo0uim9ySCCZUHOfl.zXG8pE7gJxTAUmV2G', '6853e1a9c44bf7.99917303.png', 0, '2025-06-02 09:41:06', '2025-06-20 23:52:12', 'test bio update n°21548621456214582142orem Ipsum est simplement un texte fictif de l\'industrie de l\'impression et de la composition. Lorem Ipsum est le texte factice standard de l\'industrie depuis les années 1500, quand une imprimante inconnue a pris une cuisine de type et l\'a brouillé pour faire un échantillon de type. Il a survécu non seulement à cinq siècles, mais ', 1),
(5, 'sophie', 'sophie@example.com', '$2y$10$pfPQ0KHFV/KGOJsRvu5H9eSoS5SXiXJro0qK8bewMph2fkHOyI3R2', 'coucou', 0, '2025-06-02 23:47:19', '2025-06-18 16:13:36', 'j', 1),
(7, 'admin', 'antoine@test.com', '$2y$10$83ve2hGEpfbln0dHDglmFuBjDLb1IxqyNbnFUf/GCMJ/OZf8g11JS', '684a8f9aea7276.12252348.jpg', 1, '2025-06-02 23:51:15', '2025-06-20 23:51:46', 'bonjour', 0),
(8, 'Cam', 'cam@mail.com', '$2y$10$8RMWBqgyutoxfTCzNK4JmeH1SLqPL1nRR8G1/jlCyCWQuKCqX3yO2', 'C:\\fakepath\\Capture d\'écran 2025-05-16 102033.png', 0, '2025-06-03 08:56:57', '2025-06-18 11:20:23', 'rted', 0),
(10, 'Sphie', 's@test.com', '$2y$10$y8r8w389mLhQfY1bOZg7S.kSQOaIG53hD/rLGRr/2XfjPwfupS26S', 'C:\\fakepath\\Capture d\'écran 2025-05-09 190807.png', 0, '2025-06-04 10:10:23', '2025-06-18 16:17:03', 'jkf', 1),
(11, 'enory', 'enory@mail.com', '$2y$10$VWtlZxddUrej8KeB9G0kGO6NNDGMFX8K/N0yKtQyf9khWMAAoHsu.', 'C:\\fakepath\\Capture d\'écran 2025-05-09 190741.png', 0, '2025-06-04 15:01:44', '2025-06-18 16:17:13', 'jnyhg', 1),
(12, 'z', 'z@mail.com', '$2y$10$hdJTK4Ge0hpCyCQaG5lNF..ru5FhUy.SwPA8i8WL9IjqA1rgNhffe', 'C:\\fakepath\\2025-06-04 (8).png', 0, '2025-06-05 09:55:03', '2025-06-18 11:20:16', 'nhbg', 0),
(13, 'j', 'hhfr', '$2y$10$NV/XYeK/gdsgNhstabJqNeoas39MDJxHo.xhXll1Ae8BgtbSVjZBS', 'C:\\fakepath\\Capture d\'écran 2025-05-02 175506.png', 0, '2025-06-05 10:09:51', '2025-06-18 11:20:14', 'jyhg', 1),
(14, 'gyjuhgtrfd', 'g@g', '$2y$10$464V/gwxBfpTArBAq15s9uvnZh/sLNVNjj8i572sD.M3mjqWhBZeW', 'C:\\fakepath\\Capture d\'écran 2025-05-06 183825.png', 0, '2025-06-05 11:08:30', '2025-06-18 11:20:10', 'thty', 1),
(16, 'Cams', 'camille@mai.com', '$2y$10$a3e4ngoXdc8kX7FoRG4Q9O9cDS6pwnBwyZImRzBzqdHGNyVajPnay', 'kjhngbfd', 0, '2025-06-06 09:40:59', '2025-06-06 09:40:59', 'bonjour', 0),
(17, 'Soso', 'soso@mai.com', '$2y$10$cNYRux1unjfW4lHJoFRMq.ivRhLziYdbGtRTwhDS63K6Y5BytaOKm', 'kjhngbfd', 1, '2025-06-06 09:42:46', '2025-06-18 10:06:36', 'bonjour', 0),
(18, 'Moustache', 'moustache@mail.com', '$2y$10$x7A1HCCaSpBYmr7tZxR8re8/xTjHiR1iEmRtUD.Nr0iJTqhboo2B6', 'C:\\fakepath\\2025-06-04.png', 0, '2025-06-06 10:01:14', '2025-06-18 11:01:56', 'lkjhgfdghyjukllllllllllllllllllllllllllllllllllllokkkkkkkkkkkkkkkkkk', 1),
(19, 'manille2', 'manille@mailtest.com', '$2y$10$8K0FFMOKrY/MC9eLyMfNr.8YqteuTv75uILp2xypBy/T/GdNltJYC', '6849419a4055e8.56634861.png', 0, '2025-06-11 10:43:06', '2025-06-18 13:35:47', 'i am manille', 1),
(20, 'Annette', 'annette@mailcom', '$2y$10$jzGE6NnJ6wvNuQkvWoatkezn/MalGXE.T4pL4mU5S/8XIgRQRjfe2', '684b522a6e4625.63810488.png', 0, '2025-06-12 10:28:11', '2025-06-18 13:34:23', 'C\'est un prénom d\'origine hébraïque. Annette est dérivé de « hannah » qui veut dire « grâce ».  ', 0),
(21, 'kjuyhtg', 'iuyjhtgr54@hytg', '$2y$10$r5BXNavseIEl2h2N/50gLuXY8Y2tR0PKcoNs.d8qd7tainsjE40A2', '68528ba822fbf4.93719739.png', 0, '2025-06-18 11:49:28', '2025-06-18 18:06:20', 'likujyhtg', 1),
(22, 'plçok_ijèuhygtrf', 'jhgf@gtfd.com', '$2y$10$e7C9Gul8/JTMy5eVhvaLI.T9tZDeXNzhg6CHvcNBp2KQABeNE6MGS', '68528c6167e0b1.81214363.jpg', 1, '2025-06-18 11:52:33', '2025-06-18 11:52:33', 'kijuyhgt', 0),
(23, 'nathan', 'nathan@mail.com', '$2y$10$W9Oym6kR3AIrNhCplucu8.nB2Eooy.MOKOVUFUGc7wArxIRxG0kme', '6852a2a82bc829.39033792.jpg', 1, '2025-06-18 13:27:36', '2025-06-18 13:27:36', 'kijuyhgt', 0),
(24, 'admin test', 'testadmin@mail.com', '$2y$10$JzjWoMAxUWjxAeFTf59/U.GmJT0E8ulqGy4LNuvRyvMGuN6JAwcCu', '6852e34f64e727.69804542.png', 1, '2025-06-18 18:03:27', '2025-06-18 18:03:27', 'test admin', 0),
(25, 'test admin 2', 'test@admin.com', '$2y$10$3kXbO1ASMXE2pKy.dmSgyeuTJgUZ0/rPrzwLkocSRzWgcUOJbvOBK', '6852e4495c2812.42143880.png', 1, '2025-06-18 18:07:37', '2025-06-18 18:07:37', 'test redirection', 0),
(26, 'koijhyugtr', 'hgfd@gdf.com', '$2y$10$zHazRbfIUjrjTogcbt3GRO0GWFfARAz1BMVsXv6NBN5voD9hYcRkO', '68558b27af9181.07910153.webp', 1, '2025-06-20 18:24:07', '2025-06-20 18:24:07', 'ferf', 0);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `albums`
--
ALTER TABLE `albums`
  ADD CONSTRAINT `albums_user_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `album_access`
--
ALTER TABLE `album_access`
  ADD CONSTRAINT `album_access_album_fk` FOREIGN KEY (`album_id`) REFERENCES `albums` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `album_access_user_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_photo_fk` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_user_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `photos`
--
ALTER TABLE `photos`
  ADD CONSTRAINT `fk_album_photo` FOREIGN KEY (`album_id`) REFERENCES `albums` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `photos_user_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `photo_album`
--
ALTER TABLE `photo_album`
  ADD CONSTRAINT `fk_album` FOREIGN KEY (`id_album`) REFERENCES `albums` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_photo` FOREIGN KEY (`id_photo`) REFERENCES `photos` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `photo_tags`
--
ALTER TABLE `photo_tags`
  ADD CONSTRAINT `photo_tags_photo_fk` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `photo_tags_tag_fk` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
