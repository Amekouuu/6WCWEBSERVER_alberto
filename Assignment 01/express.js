import express from "express";
import multer from "multer";
import bodyParser from "body-parser";
import path from 'path';
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname (__filename);
const app = express();
const urlEncoderParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));

// Multer configuration for file upload
var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

var upload = multer({ storage: storage }).single('file');

// Routes to serve pages
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pages/home.html');
});

app.get('/studentPage', (req, res) => {
    res.sendFile(__dirname + '/pages/student.html');
});

app.get('/adminPage/', (req, res) => {
    res.sendFile(__dirname + '/pages/admin.html');
});

app.get('/admin/upload', (req, res) => {
  res.sendFile(__dirname + '/pages/uploadForm.html');
});

// API route for student info submission
app.post('/student', urlEncoderParser, (req, res) => {
    const { studentId, firstName, lastName, section } = req.body;

    // Log all form data
    console.log("Student Form Data:", req.body);

    if (studentId && firstName) {
        res.end(`
        <h1>Student Information</h1>
        <p>ID: ${studentId}</p>
        <p>Full Name: ${firstName} ${lastName}</p>
        <p>Section: ${section}</p>`);
    } else {
        res.status(400).send('Missing required student information.');
    }
});

// API route for admin info submission
app.post('/admin', urlEncoderParser, (req, res) => {
    const { adminId, firstName, lastName, section } = req.body;

    // Log all form data
    console.log("Admin Form Data:", req.body);

    if (adminId && firstName) {
        res.end(`
        <h1>Admin Information</h1>
        <p>ID: ${adminId}</p>
        <p>Name: ${firstName} ${lastName}</p>
        <p>Department: ${section}</p>`);
    } else {
        res.status(400).send('Missing required admin information.');
    }
});

// API route for file upload with additional form data
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).send('Error uploading file');
        }

        // Log the uploaded file and form data
        const username = req.body.username;
        const uploadedFile = req.file; 

        if (!uploadedFile) {
            return res.status(400).send('No file uploaded');
        }

        console.log("Upload Form Data:", req.body);
        console.log(`Username: ${username}`);
        console.log(`File Path: ${uploadedFile.path}`);
        console.log(`File Name: ${uploadedFile.originalname}`);

        res.end('File and form uploaded successfully');
    });
});

// Simple GET route for testing purposes
app.get('/get', (req, res) => {
    const response = {
        firstName: req.query.firstName,
        lastName: req.query.lastName,
    };

    // Log inputs from the GET route
    console.log("GET Route Called");
    console.log("Received Data:", response);

    res.end(`Received Data: ${JSON.stringify(response)}`);
});

// Start the server
const server = app.listen(5000, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log("Server running at http://%s:%s", host, port);
});
