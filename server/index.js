const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

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
  // con.query("SELECT * FROM articles_mega LIMIT 100; ", function (err, result) {
  //   if (err) throw err;
  //   console.log("Result: " + JSON.stringify(result));
  // });
});

app.use(cors({origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/articles", async (req, res) => {
  con.query("USE wardrobe;", function (err, result) {
    if (err) {
      console.log(err)
      res.status(404).send({ error: "failure accessing database" });
    }
  });
  con.query("SELECT * FROM articles LIMIT 10; ", function (err, result) {
    if (err) {
      console.log(err)
      res.status(404).send({ error: "failure getting article items" });
    } else {
      res.status(200).send(JSON.stringify(result));
    }
  });
});

app.get("/customers", async (req, res) => {
  con.query("USE wardrobe;", function (err, result) {
    if (err) {
      console.log(err)
      res.status(404).send({ error: "failure accessing database" });
    }
  });
  con.query("SELECT * FROM customers LIMIT 10; ", function (err, result) {
    if (err) {
      console.log(err)
      res.status(404).send({ error: "failure getting customer items" });
    } else {
      res.status(200).send(JSON.stringify(result));
    }
  });
});

app.get("/transactions", async (req, res) => {
  con.query("USE wardrobe;", function (err, result) {
    if (err) {
      console.log(err)
      res.status(404).send({ error: "failure accessing database" });
    }
  });
  con.query("SELECT * FROM transactions LIMIT 10; ", function (err, result) {
    if (err) {
      console.log(err)
      res.status(404).send({ error: "failure getting transaction items" });
    } else {
      res.status(200).send(JSON.stringify(result));
    }
  });
});

// for customer_article_summary table
app.get("/articlesummary", async (req, res) => {
  console.log(req.query );
  con.query("USE wardrobe;", function (err, result) {
    if (err) {
      console.log(err)
      res.status(404).send({ error: "failure accessing database" });
    }
  });
  con.query(`CALL get_customer_article_summary("${req.query.customerId}", "${req.query.attribute}");`, function (err, result) {
    if (err) {
      console.log(err)  
      res.status(404).send({ error: "failure getting article items" });
    } else {
      res.status(200).send(JSON.stringify(result));
    }
  });
});

app.get("/transactionsummary", async (req, res) => {
  console.log(req.query );
  con.query("USE wardrobe;", function (err, result) {
    if (err) {
      console.log(err)
      res.status(404).send({ error: "failure accessing database" });
    }
  });
  con.query(`CALL get_customer_transactions("${req.query.customerId}");`, function (err, result) {
    if (err) {
      console.log(err)  
      res.status(404).send({ error: "failure getting article items" });
    } else {
      res.status(200).send(JSON.stringify(result));
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`))