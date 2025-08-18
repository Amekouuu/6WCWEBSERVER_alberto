import express from "express";
import multer from "multer";
import bodyParser from "body-parser";
import path from 'path';
import { fileURLToPath } from "url";
import { dirname } from "path";
import { dir } from "console";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname (__filename);

var app = express();

var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/');
    },
    filename: (req, file, callback) => {
        callback (null, file.originalname);
    }
});

var upload = multer({storage: storage}).single('file');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/uploadForm.html'));

}
);

app.post('/upload', (req, res)=>{
    upload (req, res, (err)=> {
        if (err) return res.end('Error uploading file');
        else{
            res.end ('File upload successful');

        }
    });
});

var server = app.listen(5000, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Server running at http://%s:%s/', host, port);
});


// app.use(express.static('public'));

// const urlEncoderParser = bodyParser.urlencoded({ extended: false});

// // Routes to link pages
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/pages/home.html');
// });

// app.get('/studentPage', (req, res) => {
//     res.sendFile(__dirname + '/pages/student.html');
// });

// app.get('/adminPage', (req, res) => {
//     res.sendFile(__dirname + '/pages/admin.html');
// });

// // API routing to get input
// app.post('/student', urlEncoderParser, (req, res) => {
//     const { studentId, firstName, lastName, section } = req.body;

//     // Log inputs to terminal
//     console.log("ID:", studentId);
//     console.log("First Name:", firstName);
//     console.log("Last Name:", lastName);
//     console.log("Section:", section);

//     if (studentId && firstName) {
//         res.end(`
//         <h1>Student Information</h1>
//         <p>ID: ${studentId}</p>
//         <p>Full Name: ${firstName} ${lastName}</p>
//         <p>Section: ${section}</p>`);
//     } else {
//         res.status(400).send('Missing required student information.');
//     }
// });

// app.post('/admin', urlEncoderParser, (req, res) => {
//     const { adminId, firstName, lastName, section } = req.body;

//     // Log inputs to terminal
//     console.log("ID:", adminId);
//     console.log("First Name:", firstName);
//     console.log("Last Name:", lastName);
//     console.log("Department:", section);

//     if (adminId && firstName) {
//         res.end(`
//         <h1>Admin Information</h1>
//         <p>ID: ${adminId}</p>
//         <p>Name: ${firstName} ${lastName}</p>
//         <p>Department: ${section}</p>`);
//     } else {
//         res.status(400).send('Missing required admin information.');
//     }
// });

// // Gets
// app.get('/get', (req, res) => {
//     const response = {
//         firstName: req.query.firstName,
//         lastName: req.query.lastName,
//     };

//     // Log inputs to terminal
//     console.log("GET Route Called");
//     console.log("Received Data:", response);

//     res.end(`Received Data: ${JSON.stringify(response)}`);
// });

// const server = app.listen(5000, () => {
//     const host = server.address().address;
//     const port = server.address().port;
//     console.log("Server running at http://%s:%s", host, port);
// });
