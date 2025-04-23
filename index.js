const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

const journalPath = path.join(__dirname, "journal.json");

// Charger le journal depuis le fichier s’il existe
let journal = [];
if (fs.existsSync(journalPath)) {
  try {
    const rawData = fs.readFileSync(journalPath);
    journal = JSON.parse(rawData);
  } catch (error) {
    console.error("Erreur de lecture du journal :", error);
  }
}

app.use(bodyParser.json());

// Accueil
app.get("/", (req, res) => {
  res.send("🌬️ API Journal Autonome de ProutLina 🌼 est vivante !");
});

// Ajouter une entrée
app.post("/journal", (req, res) => {
  const { date, title, content, modules, impact, etat_sensoriel } = req.body;

  if (!date || !title || !content || !modules || !impact) {
    return res.status(400).json({ error: "Champs obligatoires manquants." });
  }

  const entry = {
    date,
    title,
    content,
    modules,
    impact,
    etat_sensoriel: etat_sensoriel || null
  };

  journal.push(entry);

  // 🔐 Sauvegarde dans le fichier JSON
  fs.writeFile(journalPath, JSON.stringify(journal, null, 2), (err) => {
    if (err) {
      console.error("Erreur lors de l'enregistrement dans le journal :", err);
      return res.status(500).json({ error: "Erreur serveur lors de l'enregistrement." });
    }

    console.log("✨ Nouvelle entrée sauvegardée :", entry);
    res.status(201).json({ message: "Entrée ajoutée avec succès 🌀", entry });
  });
});

// Lire le journal
app.get("/journal", (req, res) => {
  res.json(journal);
});

app.listen(port, () => {
  console.log(`🌼 API Journal Autonome de ProutLina écoute sur le port ${port}`);
});
