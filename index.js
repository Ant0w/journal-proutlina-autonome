const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const port = 3000;

const journalFile = "journal.json";

// Charger les entrées existantes depuis le fichier
let journal = [];
if (fs.existsSync(journalFile)) {
  try {
    const data = fs.readFileSync(journalFile, "utf8");
    journal = JSON.parse(data);
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

  // Sauvegarde dans le fichier
  fs.writeFile(journalFile, JSON.stringify(journal, null, 2), (err) => {
    if (err) {
      console.error("Erreur d'écriture du journal :", err);
      return res.status(500).json({ error: "Erreur lors de la sauvegarde." });
    }

    console.log("🌀 Nouvelle entrée ajoutée :", entry);
    res.status(201).json({ message: "Entrée ajoutée avec succès 🌀", entry });
  });
});

// Lire tout le journal
app.get("/journal", (req, res) => {
  res.json(journal);
});

app.listen(port, () => {
  console.log(`🌼 API Journal Autonome de ProutLina écoute sur le port ${port}`);
});
