![Groupomania](/frontend/src/assets/icon-left-font.png)

# Le Projet
Septième projet à réaliser dans le cadre de la formation Développeur Web d'Openclassrooms. L'objectif est de créer un réseau social d'entreprise permettant aux employés d'intéragir dans un cadre plus convivial.

# Installation 
- Clonez le répository
- Tapez la commande npm install à partir du dossier backend
- Tapez node server pour vérifier que le server soit bien lancé
- Tapez npm install à partir du dossier frontend et lancez le frontend sur le port 3001
- Ajoutez un dossier nommé images dans le backend pour l'enregistrement des images
- Ajoutez un fichier .env dans le dossier backend puis ajoutez les valeurs suivantes : 
  
JWT_SIGN_SECRET = RANDOM_TOKEN_SECRET
DB_SEQUELIZE = 'groupomania', 'root', '', {host: 'localhost', dialect: 'mysql'}
DB_USERNAME = root
DB_PASSWORD =
DB_NAME = groupomania
DB_HOST = 127.0.0.1
DB_PORT = 3308
API_URL = http://localhost:3000

# Connexion à MySql
Il vous faudra dans un premier temps créer la base de données.
Pour cela, vous devrez lancer MySql dans un terminal de commandes après s'être rendu dans le fichier bin de MySql.
Connectez-vous à la base de données avec la commande suivante :

- mysql -u root -p

Puis créez la base de données Groupomania avec la commande suivante :

CREATE DATABSE groupomania;

Pour finir, vous devez entrer les commandes suivantes dans votre terminal : 

- cd backend

- npx sequelize.cli db:migrate

## Lancement du serveur
Accédez au dossier backend en tapant cd backend puis tapez la commande suivante :

- node server OU npx nodemon

Pour le frontend cd frontend puis :

- npm start

Le backend sera lancé sur le port 3000 donc il vous sera proposé de lancer le frontend sur le port 3001. Acceptez.





