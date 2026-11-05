const db = require('../config/database');

// Voir tous les dentistes en attente de validation
exports.getPendingUsers = (req, res) => {
    db.all(`SELECT id, full_name, email, phone, user_type, order_number, verification_status FROM users WHERE verification_status = 'pending'`, [], (err, rows) => {
        if (err) return res.status(500).json({ erreur: err.message });
        res.json(rows);
    });
};

// Valider un dentiste
exports.approveUser = (req, res) => {
    const userId = req.params.id;
    db.run(`UPDATE users SET verification_status = 'verified' WHERE id = ?`, [userId], function(err) {
        if (err) return res.status(500).json({ erreur: err.message });
        res.json({ message: `✅ Le dentiste n°${userId} a été validé avec succès.` });
    });
};

// Voir toutes les annonces (pour modération)
exports.getAllListingsAdmin = (req, res) => {
    db.all(`SELECT * FROM listings ORDER BY created_at DESC`, [], (err, rows) => {
        if (err) return res.status(500).json({ erreur: err.message });
        res.json(rows);
    });
};

// Valider une annonce
exports.approveListing = (req, res) => {
    const listingId = req.params.id;
    db.run(`UPDATE listings SET status = 'published' WHERE id = ?`, [listingId], function(err) {
        if (err) return res.status(500).json({ erreur: err.message });
        res.json({ message: `✅ L'annonce n°${listingId} est maintenant publiée.` });
    });
};