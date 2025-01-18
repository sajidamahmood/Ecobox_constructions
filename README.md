# Ecobox Constructions

Ecobox Constructions est une application web conçue pour la gestion de projets de construction, les services et les membres de l'équipe, permettant aux utilisateurs de gérer les estimations, les factures et d'autres détails clés des projets. Ce projet est construit avec React.js pour le frontend et Laravel pour le backend.


# Tableau de bord administrateur.
- Gestion des utilisateurs : Voir, ajouter, mettre à jour et supprimer des comptes utilisateurs.
- Gestion des projets : Créer, attribuer et suivre les projets de construction.
- **Contrôle d'accès basé sur les rôles** : Attribuer des rôles et des autorisations spécifiques aux utilisateurs.
- Paramètres du système : Gérer les configurations et les paramètres globaux de l'application.

## Stack technologique
- Frontend : React.js
- Backend : Laravel
- Base de données : Sqlite
- Authentification : Laravel Authentication & React

## Installation

4. Configuration du backend (Laravel) :
   - Accédez au dossier backend :
    
     cd backend
    
   - Installez les dépendances :
    
     composer install
    
   - Configurez les variables d'environnement :
    
     .env
    
     - Assurez-vous que le fichier `.env` est configuré pour SQLite :
      
       DB_CONNECTION=sqlite
       DB_DATABASE=C:/wamp64/www/construction/backend/database.sqlite  
   
    
   - Exécutez les migrations de base de données :
    
     php artisan migrate
     
   - Démarrez le serveur de développement Laravel :
     
     php artisan serve
   


### Prérequis
- [Node.js](https://nodejs.org/) installé pour exécuter le frontend.
- [PHP](https://www.php.net/) et [Composer](https://getcomposer.org/) pour exécuter le backend.

### Étapes pour exécuter localement

1. Clonez le référentiel :
   
   git clone https://github.com/sajidamahmood/Ecobox_constructions.git



3. Configuration du frontend (React.js) :

   - Accédez au dossier frontend :
    
     cd frontend
    
   - Installez les dépendances :
    
     npm install
    
   - Configurez les variables d'environnement :
     - Créez un fichier `.env` à la racine du dossier `frontend` 
    
       touch .env
       
     - Ajoutez les variables d'environnement suivantes au fichier `.env` :
       
      REACT_APP_API_BASE_URL=http://127.0.0.1:8000/api 

   - Démarrez le serveur de développement React :
          
npm run dev


### Formulaire de contact
L'application comprend un formulaire de contact intégré avec [Mailtrap.io](https://mailtrap.io/) pour tester la fonctionnalité d'envoi d'e-mails pendant le développement.

 Fonctionnalités
- **Validation** : Validation du formulaire implémentée à l'aide de React Hook Form.
- **Envoi d'e-mails** : Les e-mails sont envoyés via Mailtrap.io à des fins de test.

#### Configuration du formulaire de contact
1. **Configuration du backend** :
   - Dans mon fichier `.env` Laravel, configurez Mailtrap.io en tant que conducteur de messagerie :
     

    MAIL_MAILER=smtp
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=657815d4b702b4
MAIL_PASSWORD=e5a87ecc79bfb5


2. **Configuration du frontend** :
   - Assurez-vous que le formulaire de contact du frontend envoie une requête POST à l'API Laravel qui gère la soumission du formulaire :
     
      const response = await axiosInstance.post("http://127.0.0.1:8000/api/send-contact-mail", formData);
      setStatus("Email envoyé avec succès !");
      setFormData({
        name: "",
        email: "",
        phone: "",
        postalCode: "",
        description: "",
      });
3. Tester les e-mails :
   - Utilisez le compte Mailtrap.io pour vérifier que les e-mails envoyés depuis le formulaire de contact sont reçus dans votre boîte de réception Mailtrap.

4. Endpoint du formulaire de contact
- Les données du formulaire de contact sont envoyées à l'API endpoint `/api/contact`, qui traite la requête et envoie un e-mail via Mailtrap.io.


## Déploiement

Suivez ces étapes pour déployer l'application Ecobox Constructions dans un environnement de production.

### 1. Configuration de l'environnement
- **Frontend** :
 Créez un fichier `.env` dans le dossier `frontend` et configurez l'URL de l'API de production :
  
  REACT_APP_API_URL=https://your-production-backend.com/api

APP_ENV=production
APP_KEY=your_application_key
APP_DEBUG=false
APP_URL=https://your-production-url.com

DB_CONNECTION=mysql
DB_HOST=mysql-2940c906-mudasarsajida-b3dd.d.aivencloud.com
DB_PORT=16370
DB_DATABASE=defultdb
DB_USERNAME=avnadmin
DB_PASSWORD=avns_nf4tbH9UUaQBsM8cxQ8

Installer les dépendances

cd frontend
npm install
npm run build

Cela générera une version optimisée de l'application React dans le répertoire `frontend/build`.

Sécurité
Utilisation de HTTPS pour une communication sécurisée.
Définissez APP_DEBUG=false dans le fichier .env du backend pour désactiver le mode débogage.