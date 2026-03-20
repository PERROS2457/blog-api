const express = require('express');
const app = express();
const PORT = 3000;
const fs = require('fs');

// Lire les données
const lireArticles = () => {
    const data = fs.readFileSync('articles.json');
    return JSON.parse(data);
};

// Écrire les données
const sauvegarderArticles = (data) => {
    fs.writeFileSync('articles.json', JSON.stringify(data, null, 2));
};

app.use(express.json());

// Stockage temporaire
let articles = [];
let id = 1;

// Route test
app.get('/', (req, res) => {
    res.send('API Blog fonctionne ');
});



				// Rechercher des articles
app.get('/api/articles/search', (req, res) => {
    const articles = lireArticles();
    const query = req.query.query;

    if (!query) {
        return res.status(400).json({ message: "Paramètre manquant" });
    }

    const resultats = articles.filter(article =>
        article.titre.toLowerCase().includes(query.toLowerCase()) ||
        article.contenu.toLowerCase().includes(query.toLowerCase())
    );

    res.status(200).json(resultats);
});

				// Récupérer tous les articles
app.get('/api/articles', (req, res) => {
    const articles = lireArticles();
    res.status(200).json(articles);
});

				// Récupérer un article par ID
app.get('/api/articles/:id', (req, res) => {
    const articles = lireArticles();
    const articleId = parseInt(req.params.id);

    const article = articles.find(a => a.id === articleId);

    if (!article) {
        return res.status(404).json({ message: "Article non trouvé" });
    }

    res.status(200).json(article);
});

				//Créer un article

app.post('/api/articles', (req, res) => {
    const { titre, contenu, auteur, categorie, tags } = req.body;

    if (!titre || !contenu || !auteur) {
        return res.status(400).json({ message: "Champs obligatoires manquants" });
    }

    const articles = lireArticles();

    const nouvelArticle = {
        id: Date.now(),
        titre,
        contenu,
        auteur,
        categorie,
        tags,
        date: new Date()
    };

    articles.push(nouvelArticle);
    sauvegarderArticles(articles);

    res.status(201).json({
        message: "Article créé avec succès",
        article: nouvelArticle
    });
});

				//Modifier un article
app.put('/api/articles/:id', (req, res) => {
    const articles = lireArticles();
    const articleId = parseInt(req.params.id);

    const { titre, contenu, categorie, tags } = req.body;

    const article = articles.find(a => a.id === articleId);

    if (!article) {
        return res.status(404).json({ message: "Article non trouvé" });
    }

    // Mise à jour
    if (titre) article.titre = titre;
    if (contenu) article.contenu = contenu;
    if (categorie) article.categorie = categorie;
    if (tags) article.tags = tags;

    sauvegarderArticles(articles);

    res.status(200).json({
        message: "Article modifié avec succès",
        article
    });
});

				//Supprimer un article
app.delete('/api/articles/:id', (req, res) => {
    const articles = lireArticles();
    const articleId = parseInt(req.params.id);

    const index = articles.findIndex(a => a.id === articleId);

    if (index === -1) {
        return res.status(404).json({ message: "Article non trouvé" });
    }

    articles.splice(index, 1);

    sauvegarderArticles(articles);

    res.status(200).json({
        message: "Article supprimé avec succès"
    });
});

	// Lancer serveur
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
