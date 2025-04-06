const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const DOCUMENTS_FILE = './data/documents.json';

// Create documents directory if it doesn't exist
const documentsDir = './uploads/documents';
if (!fs.existsSync(documentsDir)) fs.mkdirSync(documentsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, documentsDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

const readJSON = () => JSON.parse(fs.readFileSync(DOCUMENTS_FILE, 'utf-8') || '[]');
const writeJSON = (data) => fs.writeFileSync(DOCUMENTS_FILE, JSON.stringify(data, null, 2));

// Get all documents
router.get('/', (req, res) => {
  const docs = readJSON();
  res.json(docs);
});

// Upload a new document
router.post('/upload', upload.single('file'), (req, res) => {
  const { staffId, category, expiryDate } = req.body;
  const file = req.file;

  if (!file) return res.status(400).json({ message: 'File upload failed.' });

  const docs = readJSON();
  const newDoc = {
    id: Date.now(),
    staffId,
    category,
    fileName: file.filename,
    originalName: file.originalname,
    filePath: file.path,
    uploadDate: new Date().toISOString(),
    expiryDate,
    versions: [],
  };

  docs.push(newDoc);
  writeJSON(docs);
  res.json({ message: 'Document uploaded successfully.', document: newDoc });
});

// Get document by staff
router.get('/staff/:staffId', (req, res) => {
  const docs = readJSON();
  const staffDocs = docs.filter(doc => doc.staffId === req.params.staffId);
  res.json(staffDocs);
});

// Add a new version of a document
router.post('/version/:id', upload.single('file'), (req, res) => {
  const { id } = req.params;
  const file = req.file;
  const docs = readJSON();
  const doc = docs.find(d => d.id == id);

  if (!doc || !file) return res.status(404).json({ message: 'Document not found or file missing.' });

  doc.versions.push({
    versionId: Date.now(),
    fileName: file.filename,
    originalName: file.originalname,
    filePath: file.path,
    uploadDate: new Date().toISOString(),
  });

  writeJSON(docs);
  res.json({ message: 'New version added.', document: doc });
});

module.exports = router;
