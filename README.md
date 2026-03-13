<img width="617" height="315" alt="USEE CASE" src="https://github.com/user-attachments/assets/53d469d2-854d-4903-b24b-84fc7c3a59af" />
![Diagram](images/images.PNG)


# SubLedger API

## Présentation du projet

SubLedger est une API backend développée avec **Node.js, Express et MongoDB** permettant aux utilisateurs de gérer leurs abonnements numériques de manière sécurisée.

L'application inclut :

- Authentification sécurisée avec **JWT**
- Gestion des utilisateurs
- Gestion des abonnements (CRUD)
- Protection des routes
- Gestion des rôles **User / Admin**
- Validation des données

L'objectif du projet est de construire une **API REST sécurisée et structurée** pour la gestion d'abonnements.

---

# Technologies utilisées

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcrypt
- Joi / Express-validator
- Middleware Express
- async / await

---

# Installation du projet

## 1️⃣ Cloner le repository

```bash
git clone https://github.com/ton-username/subledger.git
cd subledger
2️⃣ Installer les dépendances
npm install

3️⃣ Configurer les variables d'environnement

Créer un fichier .env

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

4️⃣ Lancer le serveur
npm run dev


ou

npm start


Le serveur démarre sur :

http://localhost:5000

Fonctionnalités principales
1️⃣ Inscription utilisateur

Un utilisateur peut créer un compte.

Endpoint
POST /auth/register

Body
{
"name": "John Doe",
"email": "john@email.com",
"password": "123456"
}

Contraintes

email unique

mot de passe hashé avec bcrypt

2️⃣ Connexion utilisateur

Permet à un utilisateur de se connecter.

Endpoint
POST /auth/login

Body
{
"email": "john@email.com",
"password": "123456"
}

Réponse

Si les informations sont valides :

{
"token": "JWT_TOKEN"
}


Ce token doit être utilisé pour accéder aux routes protégées.

Middleware d'authentification

Toutes les routes liées aux abonnements utilisent un middleware qui :

vérifie le JWT token

identifie l'utilisateur connecté

bloque l'accès si le token est invalide ou absent

Exemple d'utilisation :

Authorization: Bearer TOKEN

Gestion des abonnements

Chaque abonnement contient :

id
name
price
billingCycle (monthly | yearly)
createdAt
userId

1️⃣ Créer un abonnement
Endpoint
POST /subscriptions

Body
{
"name": "Netflix",
"price": 12,
"billingCycle": "monthly"
}


Conditions :

utilisateur connecté

price > 0

abonnement lié à l'utilisateur connecté

2️⃣ Lister les abonnements
Endpoint
GET /subscriptions


Retourne uniquement les abonnements de l'utilisateur connecté.

3️⃣ Voir un abonnement
Endpoint
GET /subscriptions/:id


Le système vérifie que l'abonnement appartient à l'utilisateur connecté.

4️⃣ Modifier un abonnement
Endpoint
PUT /subscriptions/:id


Conditions :

utilisateur propriétaire de l'abonnement

5️⃣ Supprimer un abonnement
Endpoint
DELETE /subscriptions/:id


Conditions :

uniquement le propriétaire peut supprimer l'abonnement.

Middleware d'autorisation (Roles)

Le système contient deux rôles :

Role	Description
User	Peut gérer ses abonnements
Admin	Peut accéder aux routes administratives

Exemple de route admin :

GET /admin/users


Accessible uniquement aux admins.

Validation des données

La validation est faite avec :

Joi
ou

Express-validator

Exemple de validation

User :

email valide

password requis

Subscription :

name requis

price > 0

billingCycle valide

Les erreurs retournent une réponse JSON claire.

Structure du projet
project
│
├── controllers
│
├── models
│
├── routes
│
├── middleware
│
├── validators
│
├── config
│
├── server.js
│
└── package.json

Sécurité

L'application implémente plusieurs mécanismes de sécurité :

Hashage des mots de passe avec bcrypt

Authentification via JWT

Middleware de protection des routes

Vérification de l'ownership des ressources

Validation des entrées utilisateur

Réponses API

L'API utilise :

JSON

Codes HTTP standards

Exemples :

200 OK
201 Created
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
500 Server Error

Auteur

Projet réalisé dans le cadre d'un exercice FinTech Backend API.


---


