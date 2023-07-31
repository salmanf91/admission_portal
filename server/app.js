const express = require('express');
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'admission_portal'
})

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

const app = express();

app.get('/createdb', (req,res) => {
    let sql = 'CREATE DATABASE admission_portal';
    db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Database created...');
    });
});

//Create Program Table
app.get('/program', (req, res) => {
    let sql = `CREATE TABLE IF NOT EXISTS program (
        program_id int(11) NOT NULL AUTO_INCREMENT,
        program_name varchar(150) NOT NULL,
        status tinyint(2) NOT NULL,
        PRIMARY KEY (program_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;`;
      
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Program table created...');
    });
});

//Create Course Table
app.get('/course', (req, res) => {
    let sql = `CREATE TABLE IF NOT EXISTS course (
        course_id int(11) NOT NULL AUTO_INCREMENT,
        course_name varchar(150) NOT NULL,
        status tinyint(2) NOT NULL,
        program_id int(11) NOT NULL,
        PRIMARY KEY (course_id),
        FOREIGN KEY (program_id) REFERENCES program(program_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;`;
      
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Course table created...');
    });
});

app.get('/postProgram', (req, res) => {
    let sql = `INSERT INTO program (program_id, program_name, status) VALUES
    (1, 'Engineering', 1),
    (2, 'Physiotherapy', 1),
    (3, 'Pharmacy', 1);`;
      
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Program Data Inserted...');
    });
});

app.get('/getProgram', (req, res) => {
    let sql = `Select * from program;`;
      
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Error fetching data from the database.' });
        } else {
            console.log(result);
            res.json(result); // Send the fetched data as JSON
        }
    });
});

app.get('/postCourse', (req, res) => {
    let sql = `INSERT INTO course (course_id, course_name, status, program_id) VALUES
    (1, 'Biotechnology', 1, 1),
    (2, 'Civil', 1, 1),
    (3, 'Computer Science & Engineering', 1, 1),
    (4, 'Electrical & Electronics', 1, 1),
    (5, 'Electronics & Communication', 1, 1),
    (6, 'Mechanical', 1, 1),
    (7, 'BPT', 1, 2),
    (8, 'Msc in Physiotherapy', 1, 2),
    (9, 'BPharm', 1, 3),
    (10, 'Dpharm', 1, 3);`;
      
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Course Data Inserted...');
    });
});

app.get('/getCourse/:programId', (req, res) => {
    const programId = req.params.programId;
    let sql = `Select * from course WHERE program_id = ?;`;
      
    db.query(sql, [programId], (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Error fetching data from the database.' });
        } else {
            console.log(result);
            res.json(result); // Send the fetched data as JSON
        }
    });
});

app.listen('3000', ()=> {
    console.log("Server is running on port 3000")
});