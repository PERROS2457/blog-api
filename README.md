# 📘 API Blog - Backend (INF222 EC1)

## 📌 Description
Cette API permet de gérer des articles de blog.  
Elle a été développée avec Node.js et Express dans le cadre du cours INF222.

---

## 🚀 Installation

1. Cloner le projet :

git clone https://github.com/PERROS2457/blog-api.git
cd blog-api

2.Installer les dépendances :

npm install

3. Lancer le serveur

   node index.js

4. URL de base
   http://localhost:3000


📂 Structure des données
Un article contient :

id
titre
contenu
auteur
categorie
tags
date

📌 Endpoints 🧪 Tests
Les tests ont été effectués avec Postman.  mais afin d'avoir une utilisation plus simple, une page web a été mise sur pied : https://blog-api-sp33.onrender.com/

🔹 Créer un article

POST /api/articles

{
  "titre": "Titre",
  "contenu": "Contenu",
  "auteur": "Auteur",
  "categorie": "Tech",
  "tags": ["node", "api"]
}
🔹 Récupérer tous les articles

GET /api/articles

🔹 Récupérer un article par ID

GET /api/articles/{id}

🔹 Modifier un article

PUT /api/articles/{id}

🔹 Supprimer un article

DELETE /api/articles/{id}

🔹 Rechercher un article

GET /api/articles/search?query=mot

💾 Persistance des données

Les données sont stockées dans un fichier articles.json, ce qui permet de conserver les informations même après redémarrage du serveur.
