const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./src/config/database');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// On autorise l'accès aux images du dossier uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const userRoutes = require('./src/routes/userRoutes');
app.use('/api/users', userRoutes); 

const listingRoutes = require('./src/routes/listingRoutes');
app.use('/api/listings', listingRoutes); 

const contentRoutes = require('./src/routes/contentRoutes');
app.use('/api/content', contentRoutes); 

const adminRoutes = require('./src/routes/adminRoutes');
app.use('/api/admin', adminRoutes); 

app.get('/', (req, res) => {
    res.json({ message: "Serveur ONMD en ligne !" });
});

app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(`✅ SERVEUR ONMD DÉMARRÉ`);
    console.log(`📍 Le serveur écoute sur le port : ${PORT}`);
    console.log(`=========================================`);
});