const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Set up middleware to parse the request body as JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL database connection
const connection = mysql.createConnection({
    host: '172.18.0.2',
    user: 'root',
    password: 'my-secret-pw',
    database: 'Feedback',
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
});

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle POST request to /submit
app.post('/submit', (req, res) => {
    const { studentName, rollNumber, course_name,course_feedback } = req.body;

    // Insert data into MySQL database
    const insertQuery = 'INSERT INTO student_feedback (student_name, roll_number, course_name,course_feedback) VALUES (?, ?, ?,?)';
    connection.query(insertQuery, [studentName, rollNumber, course_name,course_feedback], (err, results) => {
        if (err) {
            console.error('Error inserting into MySQL: ' + err.message);
            res.status(500).send('Internal Server Error');
            return;
        }

        console.log('Data has been inserted into MySQL with ID: ' + results.insertId);

        // Send a response to the client
        res.send('Form submitted successfully!');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
