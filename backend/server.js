const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure folders exist
const dataDir = path.join(__dirname, 'data');
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// JSON file paths
const documentsFile = path.join(dataDir, 'documents.json');

// Load or initialize documents data
function loadDocuments() {
    if (!fs.existsSync(documentsFile)) return [];
    const data = fs.readFileSync(documentsFile);
    return JSON.parse(data);
}
function saveDocuments(documents) {
    fs.writeFileSync(documentsFile, JSON.stringify(documents, null, 2));
}

// ---------- Document Upload Setup ----------
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// ---------- Routes ----------

// Upload new document
app.post('/api/documents/upload', upload.single('file'), (req, res) => {
    const { expiryDate } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    const newDoc = {
        id: Date.now(),
        name: file.originalname,
        path: file.filename,
        uploadedAt: new Date().toISOString(),
        expiryDate,
        status: 'active'
    };

    const documents = loadDocuments();
    documents.push(newDoc);
    saveDocuments(documents);

    res.status(201).json({ message: 'Upload successful', document: newDoc });
});

// Get all documents
app.get('/api/documents', (req, res) => {
    const documents = loadDocuments();
    res.json(documents);
});

// Delete document
app.delete('/api/documents/:id', (req, res) => {
    const documentId = parseInt(req.params.id);
    let documents = loadDocuments();
    const doc = documents.find(doc => doc.id === documentId);

    if (!doc) return res.status(404).json({ error: 'Document not found' });

    const filePath = path.join(uploadDir, doc.path);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    documents = documents.filter(doc => doc.id !== documentId);
    saveDocuments(documents);

    res.json({ message: 'Document deleted successfully' });
});

// Download document
app.get('/api/documents/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(uploadDir, filename);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'File not found' });
    }

    res.download(filePath);
});

// ---------- Start Server ----------
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
