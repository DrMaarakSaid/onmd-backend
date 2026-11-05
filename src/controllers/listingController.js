const db = require('../config/database');

exports.createListing = (req, res) => {
    const { seller_id, title, category, description, price_mad, city } = req.body;
    const imageUrl = req.file ? req.file.filename : null;

    if (!seller_id || !title || !city) {
        return res.status(400).json({ message: "Erreur : Titre, ville et vendeur obligatoires." });
    }

    const query = `INSERT INTO listings (seller_id, title, category, description, price_mad, city, image_url) 
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;
    
    db.run(query, [seller_id, title, category, description, price_mad, city, imageUrl], function(err) {
        if (err) {
            return res.status(400).json({ message: "Erreur lors de la publication.", erreur: err.message });
        }
        res.status(201).json({ message: "✅ Annonce publiée avec succès.", listingId: this.lastID });
    });
};

exports.getAllListings = (req, res) => {
    db.all(`SELECT * FROM listings ORDER BY created_at DESC`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: "Erreur lors de la récupération.", erreur: err.message });
        }
        res.json(rows);
    });
};