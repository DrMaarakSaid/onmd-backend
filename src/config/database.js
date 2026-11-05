const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// On indique où sera rangé le fichier de la base de données (dans le dossier backend)
const dbPath = path.resolve(__dirname, '../../database.sqlite');

// On ouvre le classeur (la base de données)
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("❌ Erreur d'ouverture de la base de données :", err.message);
    } else {
        console.log("✅ Base de données connectée avec succès (classeur ouvert).");
        creerLesTables();
    }
});

// La fonction qui crée les "tiroirs" (tables) pour ranger les infos
function creerLesTables() {
    db.serialize(() => {
        // Tiroir 1 : Les Utilisateurs (Dentistes, Étudiants, Admins)
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                full_name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                phone TEXT NOT NULL,
                password_hash TEXT NOT NULL,
                user_type TEXT NOT NULL,
                order_number TEXT,
                verification_status TEXT DEFAULT 'pending',
                role TEXT DEFAULT 'user',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Tiroir 2 : Les Annonces de la Bourse
        db.run(`
            CREATE TABLE IF NOT EXISTS listings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                seller_id INTEGER NOT NULL,
                title TEXT NOT NULL,
                category TEXT NOT NULL,
                description TEXT,
                price_mad INTEGER,
                city TEXT NOT NULL,
                image_url TEXT,
                status TEXT DEFAULT 'pending',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (seller_id) REFERENCES users(id)
            )
        `);

        // Tiroir 3 : Le Contenu Officiel (Lois, Actualités, Congrès)
        db.run(`
            CREATE TABLE IF NOT EXISTS official_content (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                type TEXT NOT NULL,
                title_fr TEXT NOT NULL,
                title_ar TEXT,
                content_fr TEXT NOT NULL,
                content_ar TEXT,
                published_date TEXT
            )
        `);

        console.log("✅ Les 3 tiroirs (tables) sont prêts et rangés.");
    });
}

// On exporte le classeur pour que le reste de l'application puisse l'utiliser
module.exports = db;