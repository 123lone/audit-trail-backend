import express from "express";
import cors from "cors";
import fs from "fs";
import { v4 as uuid } from "uuid";

const app = express();
app.use(express.json());
app.use(cors());

const DATA_FILE = "versions.json";

// Load versions
function loadVersions() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE));
}

// Save versions
function saveVersions(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Diff Logic
function getDiff(oldText, newText) {
  const oldWords = oldText.split(/\s+/);
  const newWords = newText.split(/\s+/);

  return {
    added: newWords.filter(w => !oldWords.includes(w)),
    removed: oldWords.filter(w => !newWords.includes(w))
  };
}

app.post("/save-version", (req, res) => {
  const { previous, current } = req.body;
  const versions = loadVersions();
  const diff = getDiff(previous, current);

  const entry = {
    id: uuid(),
    timestamp: new Date().toLocaleString(),
    addedWords: diff.added,
    removedWords: diff.removed,
    oldLength: previous.length,
    newLength: current.length
  };

  versions.push(entry);
  saveVersions(versions);

  res.json({ success: true, entry });
});

app.get("/versions", (req, res) => {
  res.json(loadVersions());
});

app.listen(5000, () =>
  console.log("🚀 Backend Running → http://localhost:5000")
);
