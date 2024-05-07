// const mysql = require('mysql');
// const express = require('express')
// const bodyParser = require('body-parser');
// const app = express();
// const PORT =  5000;
// app.use(bodyParser.json());


// const connection = mysql.createConnection({
//   host: 'localhost:3306',
//   user: 'root',
//   password: 'Kh@2427775',
//   database: 'backend'
// });

// app.get('/', (req, res) => {
//     res.send('Hello World!');
//   });

// connection.connect(err => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err);
   
//   }
//   console.log('Connected to MySQL');

// });

// app.post('/api/books', (req, res) => {
//     const { name, author, price } = req.body;
  
//     // SQL query to insert book data into the database
//     const INSERT_QUERY = 'INSERT INTO books (name, author, price) VALUES (?, ?, ?)';
//     connection.query(INSERT_QUERY, [name, author, price], (err, result) => {
//       if (err) {
//         console.error('Error inserting book data:', err);
//         res.status(500).send('Internal server error');
//         return;
//       }
//       console.log('Book data inserted successfully');
//       res.status(201).send('Book data inserted successfully');
//     });
//   });
//   app.listen(PORT, () => 
//   console.log("hello world"));
// const express = require("express")
// const app = express();

// const port = 8000;
// app.get('/', (req, res)=>{
//     res.send("hello world");
// })
// app.listen(port,()=>{
//     console.log("server is connected")
// })

const express = require("express")
const app = express();
const mysql= require("mysql");
const cors = require("cors"); 

app.use(cors());

const connection = mysql.createConnection({
   host: "localhost:3306",
   user: "root",
   password: "Kh@2427775",
   database: "backend"
})

connection.connect(err=>{
    if (err){
        console.log("err connecting to database", err)
    }
    console.log("connected to mysql")

})


  
  app.post('/books', express.json(), (req, res) => {
    const { name, author, date, price } = req.body;
    if (!name || !author || !date || !price) {
      return res.status(400).send("Missing required fields in book data.");
    }
  
    const INSERT_QUERY = `INSERT INTO books (name, author, date, price) VALUES (?, ?, ?, ?)`;
    connection.query(INSERT_QUERY, [name, author, date, price], (err, result) => {
      if (err) {     
        console.error("Error inserting book data:", err);
        return res.status(500).send("Internal server error");
      }
      console.log("Book data inserted successfully:", result.affectedRows);
      res.status(201).send("Book data inserted successfully");
    });
  });


  app.get('/books', (req, res) => {
    const { search } = req.query;
  
    if (!search) {
      return res.status(400).send("Missing search query.");
    }
  
    const SEARCH_QUERY = `
      SELECT * 
      FROM books 
      WHERE name LIKE '%${search}%' OR author LIKE '%${search}%'
    `;
  
    connection.query(SEARCH_QUERY, (err, results) => {
      if (err) {
        console.error("Error searching for books:", err);
        return res.status(500).send("Internal server error");
      }
      res.json(results);
    });
  });
  


const port = 7000;
app.get("/", (req, res)=>{
    res.send("hello i am try to extablish connection with the server ")
});

app.listen(port,()=>{
    console.log("hello world ") 
})