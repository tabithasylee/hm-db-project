const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("USE wardrobe;", function (err, result) {
    if (err) throw err;
    console.log("Result: " + JSON.stringify(result));
  });
  con.query("SELECT * FROM articles_mega LIMIT 100; ", function (err, result) {
    if (err) throw err;
    console.log("Result: " + JSON.stringify(result));
  });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => console.log(`Listening on port ${port}`))