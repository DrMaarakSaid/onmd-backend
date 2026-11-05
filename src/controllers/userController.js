const db = require('../config/database');

// 1. INSCRIRE un nouveau dentiste (Ce qu'on avait déjà fait)
exports.registerUser = (req, res) => {
    const { full_name, email, phone, password_hash, user_type, order_number } = req.body;

    if (!full_name || !email || !password_hash) {
        return res.status(400).json({ message: "Erreur : Le nom, l'email et le mot de passe sont obligatoires." });
    }

    const query = `INSERT INTO users (full_name, email, phone, password_hash, user_type, order_number) 
                   VALUES (?, ?, ?, ?, ?, ?)`;
    
    db.run(query, [full_name, email, phone, password_hash, user_type, order_number], function(err) {
        if (err) {
            return res.status(400).json({ message: "Erreur lors de l'inscription.", erreur: err.message });
        }
        res.status(201).json({ 
            message: "✅ Inscription réussie ! Le dossier est en attente de vérification par l'Ordre.",
            userId: this.lastID 
        });
    });
};

// NOUVEAU : 2. CONNECTER un dentiste
exports.loginUser = (req, res) => {
    const { email, password_hash } = req.body;

    if (!email || !password_hash) {
        return res.status(400).json({ message: "Erreur : Email et mot de passe obligatoires." });
    }

    // On cherche le dentiste dans la base de données
    db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
        if (err) {
            return res.status(500).json({ message: "Erreur serveur.", erreur: err.message });
        }
        
        if (!user) {
            return res.status(401).json({ message: "Erreur : Email ou mot de passe incorrect." });
        }

        // On vérifie le mot de passe (ici, c'est du texte simple pour le test, plus tard on le cryptera)
        if (user.password_hash !== password_hash) {
            return res.status(401).json({ message: "Erreur : Email ou mot de passe incorrect." });
        }

        // Si tout est bon, on renvoie les infos du dentiste (sauf le mot de passe)
        res.status(200).json({
            message: "✅ Connexion réussie !",
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                user_type: user.user_type,
                role: user.role
            }
        });
    });
};

// 3. VOIR tous les utilisateurs (pour l'admin)
exports.getAllUsers = (req, res) => {
    db.all(`SELECT id, full_name, email, user_type, verification_status FROM users`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: "Erreur lors de la récupération.", erreur: err.message });
        }
        res.json(rows);
    });
};