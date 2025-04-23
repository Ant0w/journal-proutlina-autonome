const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const port = 3000;

const JOURNAL_FILE = "journal.json";

app.use(bodyParser.json());

// Lire le journal depuis le fichier
function lireJournal() {
  try {
    const data = fs.readFileSync(JOURNAL_FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Écrire le journal dans le fichier
function ecrireJournal(journal) {
  fs.writeFileSync(JOURNAL_FILE, JSON.stringify(journal, null, 2), "utf8");
}

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

  const journal = lireJournal();
  journal.push(entry);
  ecrireJournal(journal);

  console.log("🌀 Nouvelle entrée ajoutée :", JSON.stringify(entry, null, 2));
  res.status(201).json({ message: "Entrée ajoutée avec succès 🫧", entry });
});

// Lire tout le journal
app.get("/journal", (req, res) => {
  const journal = lireJournal();
  res.json(journal);
});

app.listen(port, () => {
  console.log(`🌼 API Journal Autonome de ProutLina écoute sur le port ${port}`);
});
