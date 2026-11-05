const db = require('../config/database');

// 1. Publier un nouveau contenu (Loi, Actualité, Congrès)
exports.createContent = (req, res) => {
    const { type, title_fr, title_ar, content_fr, content_ar, published_date } = req.body;

    if (!type || !title_fr || !content_fr) {
        return res.status(400).json({ message: "Erreur : Type, titre FR et contenu FR sont obligatoires." });
    }

    const query = `INSERT INTO official_content (type, title_fr, title_ar, content_fr, content_ar, published_date) 
                   VALUES (?, ?, ?, ?, ?, ?)`;
    
    db.run(query, [type, title_fr, title_ar, content_fr, content_ar, published_date], function(err) {
        if (err) {
            return res.status(400).json({ message: "Erreur lors de la publication.", erreur: err.message });
        }
        res.status(201).json({ message: "✅ Contenu officiel publié avec succès.", contentId: this.lastID });
    });
};

// 2. Voir tout le contenu officiel (pour l'application mobile)
exports.getAllContent = (req, res) => {
    db.all(`SELECT * FROM official_content ORDER BY published_date DESC`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: "Erreur lors de la récupération.", erreur: err.message });
        }
        res.json(rows);
    });
};