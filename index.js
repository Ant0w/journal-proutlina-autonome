const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// Journal local en mémoire (peut être remplacé plus tard par un fichier ou une base)
let journal = [];

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

  // 🔍 Journalisation visible dans les logs Render
  console.log("📝 Nouvelle entrée ajoutée au journal :", JSON.stringify(entry, null, 2));

  res.status(201).json({ message: "Entrée ajoutée avec succès 🌀", entry });
});

// Lire tout le journal
app.get("/journal", (req, res) => {
  res.json(journal);
});

app.listen(port, () => {
  console.log(`🌼 API Journal Autonome de ProutLina écoute sur le port ${port}`);
});
