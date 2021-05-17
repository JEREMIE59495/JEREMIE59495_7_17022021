-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 17 mai 2021 à 07:10
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `employees`
--

DROP TABLE IF EXISTS `employees`;
CREATE TABLE IF NOT EXISTS `employees` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` text NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `employees`
--

INSERT INTO `employees` (`id`, `first_name`, `last_name`, `email`, `password`, `isAdmin`) VALUES
(1, 'Thery', 'Jérémie', 'thery.jeremie@yahoo.fr', '$2b$05$7Jiyfasg5mHeVZxYOBVuzuDSwGcmchCd3UpgrTCaYF7fdSfUrBgSa', 1),
(2, 'morgan', 'christophe', 'morgan.C@ net.fr', '$2b$05$bQC06Xru5.1P3fHgzRSx0ewco6Pawg.LAlRlU3KA0T0L8V5LJ1AAC', 0),
(3, 'machin', 'Paul', 'local@exemple.de', '$2b$05$e2Swa0DlU8fEkZ5QeCW/P.NEVSxVt5x.6lNi5fz4oCyQZ4TAZbs5O', 0);

-- --------------------------------------------------------

--
-- Structure de la table `groupelist`
--

DROP TABLE IF EXISTS `groupelist`;
CREATE TABLE IF NOT EXISTS `groupelist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_group` varchar(30) NOT NULL,
  `id_groupe` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `groupelist`
--

INSERT INTO `groupelist` (`id`, `name_group`, `id_groupe`) VALUES
(1, 'Fil d\'actualité', 'Génér_1615563480250'),
(2, 'Logistique', 'Logis_1615563509329'),
(3, 'Comptabilité', 'Compt_1615563584459'),
(4, 'Transport', 'Trans_1615563651638'),
(5, 'Employé', 'Emplo_1615638852936');

-- --------------------------------------------------------

--
-- Structure de la table `publication`
--

DROP TABLE IF EXISTS `publication`;
CREATE TABLE IF NOT EXISTS `publication` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL,
  `comment` text NOT NULL,
  `id_groupe` varchar(30) NOT NULL,
  `auteur` varchar(30) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `publication`
--

INSERT INTO `publication` (`id`, `title`, `comment`, `id_groupe`, `auteur`, `image`) VALUES
(1, 'lorem ipsum', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum', 'Génér_1615563480250', 'jérémie', NULL),
(2, 'lorem ipsum 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum', 'Génér_1615563480250', 'jérémie', NULL),
(3, 'Définition comptabilité', 'La comptabilité est un ensemble de conventions1 et de règles qui consistent à recueillir et compiler des données liées aux événements et aux opérations financières, afin de présenter dans une unité monétaire, la situation financière et les activités économiques d\'une entité permettant aux utilisateurs de ce système d\'information de comparer et analyser ces informations comptables et de prendre des décisions', 'Compt_1615563584459', 'jérémie', NULL),
(4, 'Nouvelle employée', 'Voici Julie une nouvelle employée', 'Emplo_1615638852936', 'julie', NULL),
(5, 'Logistique', 'La logistique est l\'activité qui a pour objet de gérer les flux physiques, et les données (informatives, douanières et financières) s\'y rapportant, dans le but de mettre à disposition les ressources correspondant à des besoins (plus ou moins) déterminés en respectant les conditions économiques et légales prévues, le degré de qualité de service attendu, les conditions de sécurité et de sûreté réputées satisfaisantes.', 'Logis_1615563509329', 'jérémie', NULL),
(6, 'Utilité de la logistique', 'La logistique constitue un service à part entière dans la plupart des entreprises de moyenne et grande taille.\n\nCette fonction transversale aux autres services est stratégique et influence considérablement l’activité de l’entreprise. Ce dossier vous explique à quoi correspond la logistique en entreprise, quelle est son importance et vous présente en quoi consiste la gestion de la logistique en entreprise.', 'Logis_1615563509329', 'jérémie', NULL),
(7, 'Information', 'Les transports exceptionnels destinés à l’approvisionnement et à l’acheminement des matériels pour les secours des zones sinistrées du département des Alpes-Maritimes sont autorisés à circuler tous les week-ends pour une durée indéterminée sur l’ensemble du réseau routier et autoroutier des départements de la Zone de Défense et de Sécurité Sud, par dérogation à l’arrêté du 4 mai 2006 modifié relatif aux transports exceptionnels de marchandises.', 'Trans_1615563651638', 'jérémie', 'http://localhost:8080/uploads/1617953521178_convoi.jpg'),
(8, 'Circulation Allemagne', 'Les poids lourds de + 7,5t de même que les semi-remorques n’ont pas le droit de circuler de 00 heure à 22h les dimanches et jours fériés. Cette disposition s’applique à l’ensemble du réseau routier allemand.\nNe sont pas concernés par ces restrictions les transports de denrées périssables (y compris les transports à vide correspondants).\n\nA ces restrictions générales vient s’ajouter, en juillet et en août, une restriction de circulation les samedis, de 7h à 20h sur certaines autoroutes et, dans une moindre mesure, sur des tronçons de routes fédérales chargés pendant les vacances scolaires d’été.', 'Trans_1615563651638', 'jérémie', 'http://localhost:8080/uploads/1617953513048_autoroute.jpg'),
(9, 'Rappel de conduite en Belgique', 'Interdiction générale de dépasser pour les véhicules de plus de 3,5t lorsque seules 2 voies de circulation sont disponibles.\nInterdiction de dépasser en cas de précipitations pour les véhicules de plus de 7,5t ;\nExtension aux véhicules de plus de 3,5t de l’interdiction d’emprunter la 3e voie d’une chaussée autoroutière (mesure déjà applicable pour les véhicules de plus de 7,5t).\n\nL’interdiction de dépasser (dépassement par la gauche) s’applique aux véhicules attelés, aux véhicules à moteur à deux roues ou aux véhicules de plus de deux roues.\n\nElle est signalée par le panneau F107 et se termine au panneau F109 :', 'Trans_1615563651638', 'jérémie', 'http://localhost:8080/uploads/1617896670207_camion.jpg'),
(10, 'Loi anti-gaspillage', 'Le texte durcit les sanctions prononçables à l’encontre des industriels et des distributeurs de l’agroalimentaire (dépassant certains seuils). Tout d’abord, comme le droit les y oblige (article L. 541-15-6 du code de l’environnement), le fait de ne pas conclure de convention de dons de denrées alimentaires avec des associations, fait désormais encourir une contravention de cinquième classe de l’ordre de 1500 euros (et non de troisième classe comme actuellement). La loi ajoute cette obligation pour « les opérateurs de commerce de gros alimentaire dont le chiffre d’affaires annuel est supérieur à cinquante millions d’euros ».', 'Compt_1615563584459', 'julie', NULL),
(11, 'Chèque vacance', 'Il est utilisable toute l\'année pour des prestations en France (y compris les départements et régions d\'Outre-Mer) et à destination des pays de l\'Union Européenne.\n\nLe Chèque-Vacances est valable 2 ans en plus de son année d\'émission (un chèque émis en 2019 est valable jusqu\'au 31/12/2021). À l\'issue de sa période de validité, si vous n\'avez pas utilisé tous vos chèques vous pouvez demander leur échange : consultez les informations pratiques sur l\'échange, la perte ou le vol.', 'Génér_1615563480250', 'julie', 'http://localhost:8080/uploads/1617953350177_cheque_vacance.jpg'),
(12, 'COVID-19', 'Pour empêcher la propagation de la COVID-19, suivez ces recommandations : Lavez-vous fréquemment les mains. Utilisez du savon et de l\'eau, ou une solution hydroalcoolique. Tenez-vous à distance de toute personne qui tousse ou éternue. Portez un masque lorsque la distanciation physique n\'est pas possible. Évitez de vous toucher les yeux, le nez ou la bouche. En cas de toux ou d\'éternuement, couvrez-vous le nez et la bouche avec le pli du coude ou avec un mouchoir.', 'Génér_1615563480250', 'Jérémie', 'http://localhost:8080/uploads/1617953237844_cov19.jpg');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
