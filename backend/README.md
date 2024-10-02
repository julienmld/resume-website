
# Backend - Projet SpringBoot

Bienvenue à la racine d'un projet **SpringBoot** utilisant la version **3.2.6**.

## Pré-requis

Avant de commencer le développement, assurez-vous d'avoir installé les éléments suivants sur votre machine :

- **Java JDK 17.0.11**
- **Maven** dans une **version récente**


## Développement

Pour générer l'artefact du projet au format **zip**, suivez les étapes ci-dessous :

1. Positionnez-vous à la racine du projet.
2. Exécutez la commande suivante :  
   ```bash
   mvn clean install
   ```
   
L'artefact **zip** sera généré dans le dossier `target`.

## Déploiement

L'application SpringBoot est déployée via **AWS Lambda**, une solution serverless. Grâce à AWS Lambda, vous n'avez pas à vous soucier de la gestion des serveurs, mais uniquement du code.

Pour déployer l'application :

1. Générez l'artefact du projet (cf. section Développement).
2. Téléchargez-le sur **AWS Lambda** via la console AWS.

## Sécurité

Deux outils AWS sont utilisés pour sécuriser l'application : **AWS IAM** et **AWS Secret Manager**.

### AWS IAM (Identity and Access Management)

**AWS IAM** permet de gérer les utilisateurs et les groupes ayant accès à la base de données, qui est ici gérée par **AWS DynamoDB**. IAM génère des clés d'accès (clé secrète et clé publique) que le backend utilise pour interagir avec DynamoDB. 

Cependant, pour éviter de compromettre la sécurité, il est déconseillé de stocker ces clés directement dans le code source. C'est ici qu'intervient le second outil de sécurité.

### AWS Secrets Manager

**AWS Secrets Manager** permet de stocker et gérer en toute sécurité les informations sensibles telles que les mots de passe ou les clés d'accès. Cela permet d'éviter d'inclure des informations critiques en clair dans le code source, tout en vous permettant de partager ce projet de manière transparente sur des plateformes publiques comme GitHub.
