const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
    password: "root",
});

con.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');
    con.query('USE wardrobe;', function (err, result) {
        if (err) throw err;
        console.log('Result: ' + JSON.stringify(result));
    });
    // con.query("SELECT * FROM articles_mega LIMIT 100; ", function (err, result) {
    //   if (err) throw err;
    //   console.log("Result: " + JSON.stringify(result));
    // });
});

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/articles', async (req, res) => {
    con.query('USE wardrobe;', function (err, result) {
        if (err) {
            console.log(err);
            res.status(404).send({ error: 'failure accessing database' });
        }
    });
    con.query('SELECT * FROM articles LIMIT 10; ', function (err, result) {
        if (err) {
            console.log(err);
            res.status(404).send({ error: 'failure getting article items' });
        } else {
            res.status(200).send(JSON.stringify(result));
        }
    });
});

app.get('/customers', async (req, res) => {
    con.query('USE wardrobe;', function (err, result) {
        if (err) {
            console.log(err);
            res.status(404).send({ error: 'failure accessing database' });
        }
    });
    con.query('SELECT * FROM customers LIMIT 10; ', function (err, result) {
        if (err) {
            console.log(err);
            res.status(404).send({ error: 'failure getting customer items' });
        } else {
            res.status(200).send(JSON.stringify(result));
        }
    });
});

app.get('/transactions', async (req, res) => {
    con.query('USE wardrobe;', function (err, result) {
        if (err) {
            console.log(err);
            res.status(404).send({ error: 'failure accessing database' });
        }
    });
    con.query('SELECT * FROM transactions LIMIT 10; ', function (err, result) {
        if (err) {
            console.log(err);
            res.status(404).send({ error: 'failure getting transaction items' });
        } else {
            res.status(200).send(JSON.stringify(result));
        }
    });
});

// ROUTES FOR SEARCH TABLES

// for customer_article_summary table
app.get('/articlesummary', async (req, res) => {
    con.query('USE wardrobe;', function (err, result) {
        if (err) {
            console.log(err);
            res.status(404).send({ error: 'failure accessing database' });
        }
    });
    con.query(`CALL get_customer_article_summary("${req.query.customerId}", "${req.query.attribute}");`, function (err, result) {
        if (err) {
            console.log(err);
            res.status(404).send({ error: 'failure getting article items' });
        } else {
            res.status(200).send(JSON.stringify(result));
        }
    });
});

app.get('/customertransactions', async (req, res) => {
    con.query('USE wardrobe;', function (err, result) {
        if (err) {
            console.log(err);
            res.status(404).send({ error: 'failure accessing database' });
        }
    });
    con.query(`CALL get_customer_transactions("${req.query.customerId}");`, function (err, result) {
        if (err) {
            console.log(err);
            res.status(404).send({ error: 'failure getting article items' });
        } else {
            res.status(200).send(JSON.stringify(result));
        }
    });
});

/**
 * demographic comparison procedure
 * @param {req.query.productId} - string
 * @param {req.query.attribiute} - string
 * */
app.get('/demographiccomparison', async (req, res) => {
    con.query('USE wardrobe;', function (err, result) {
        if (err) {
            console.log(err);
            res.status(404).send({ error: 'failure accessing database' });
        }
    });
    con.query(`CALL compare_article_customer_demographic("${req.query.productId}", "${req.query.attribute}");`, function (err, result) {
        if (err) {
            console.log(err);
            res.status(404).send({ error: 'failure getting article items' });
        } else {
            res.status(200).send(JSON.stringify(result));
        }
    });
});

/**
 * article transactions procedure
 * @param {req.query.articleId} - string
 * */
 app.get('/articletransactions', async (req, res) => {
    con.query('USE wardrobe;', function (err, result) {
        if (err) {
            console.log(err);
            res.status(404).send({ error: 'failure accessing database' });
        }
    });
    con.query(`CALL transactions_from_article("${req.query.articleId}");`, function (err, result) {
        if (err) {
            console.log(err);
            res.status(404).send({ error: 'failure getting article items' });
        } else {
            res.status(200).send(JSON.stringify(result));
        }
    });
});

// ROUTES FOR VIEWS

app.get('/decomposed/articlesproducttype', async (req, res) => {
    con.query('USE wardrobe;', function (err, result) {
        if (err) {
            console.log(err);
            res.status(404).send({ error: 'failure accessing database' });
        }
    });
    con.query('SELECT * FROM articles_product_type_view; ', function (err, result) {
        if (err) {
            console.log(err);
            res.status(404).send({ error: 'failure getting items' });
        } else {
            res.status(200).send(JSON.stringify(result));
        }
    });
});


// ROUTES FOR INSERT

/**
 * insert an article
 * @param {req.body.article_id} - string
 * @param {req.body.product_code} - string
 * @param {req.body.prod_name} - string
 * @param {req.body.product_type_no} - int
 * @param {req.body.graphical_appearance_no} - string
 * @param {req.body.colour_group_code} - int
 * @param {req.body.perceived_colour_value_id} - int
 * @param {req.body.perceived_colour_master_id} - int
 * @param {req.body.department_no} - int
 * @param {req.body.index_code} - string
 * @param {req.body.index_group_no} - int
 * @param {req.body.section_no} - int
 * @param {req.body.garment_group_no} - int
 * @param {req.body.detail_desc} - string
 */
app.post('/article', async (req, res) => {
    con.query('USE wardrobe;', function (err, result) {
        if (err) {
            console.log(err);
            res.status(404).send({ error: 'failure accessing database' });
        }
    });
    con.query(
        `CALL insert_article("${req.body.article_id}", "${req.body.product_code}", "${req.body.prod_name}", ${req.body.product_type_no}, "${req.body.graphical_appearance_no}", ${req.body.colour_group_code}, ${req.body.perceived_colour_value_id}, ${req.body.perceived_colour_master_id}, ${req.body.department_no}, "${req.body.index_code}", ${req.body.index_group_no}, ${req.body.section_no}, ${req.body.garment_group_no}, "${req.body.detail_desc}");`,
        function (err, result) {
            if (err) {
                res.status(404).send({ error: `${err}` });
            } else {
                res.status(200).send({result: JSON.stringify(result)});
            }
        }
    );
});


/**
 * insert a customer
 * @param {req.body.customer_id} - string
 * @param {req.body.fn} - string
 * @param {req.body.active} - string
 * @param {req.body.club_member_status} - string
 * @param {req.body.fashion_news_frequency} - string
 * @param {req.body.age} - int
 * @param {req.body.postal_code} - str
 */
 app.post('/customer', async (req, res) => {
  con.query('USE wardrobe;', function (err, result) {
      if (err) {
          console.log(err);
          res.status(404).send({ error: 'failure accessing database' });
      }
  });
  con.query(
      `CALL insert_customer("${req.body.customer_id}", "${req.body.fn}", "${req.body.active}", "${req.body.club_member_status}", "${req.body.fashion_news_frequency}", ${req.body.age}, "${req.body.postal_code}");`,
      function (err, result) {
          if (err) {
              res.status(404).send({ error: `${err}` });
          } else {
              res.status(200).send({result: JSON.stringify(result)});
          }
      }
  );
});

/**
 * insert a transaction
 * @param {req.body.t_dat} - date string YYYY-MM-DD
 * @param {req.body.customer_id} - string
 * @param {req.body.article_id} - string
 * @param {req.body.price} - int
 * @param {req.body.sales_channel_id} - string
 */
 app.post('/transaction', async (req, res) => {
  con.query('USE wardrobe;', function (err, result) {
      if (err) {
          console.log(err);
          res.status(404).send({ error: 'failure accessing database' });
      }
  });
  con.query(
      `CALL insert_transaction(CAST("${req.body.t_dat}" AS DATE), "${req.body.customer_id}", "${req.body.article_id}", "${req.body.price}", "${req.body.sales_channel_id}");`,
      function (err, result) {
          if (err) {
              res.status(404).send({ error: `${err}` });
          } else {
              res.status(200).send({result: JSON.stringify(result)});
          }
      }
  );
});


// ROUTES FOR UPDATE

/**
 * update an article
 * @param {req.body.article_id} - string
 * @param {req.body.product_code} - string
 * @param {req.body.prod_name} - string
 * @param {req.body.product_type_no} - int
 * @param {req.body.graphical_appearance_no} - string
 * @param {req.body.colour_group_code} - int
 * @param {req.body.perceived_colour_value_id} - int
 * @param {req.body.perceived_colour_master_id} - int
 * @param {req.body.department_no} - int
 * @param {req.body.index_code} - string
 * @param {req.body.index_group_no} - int
 * @param {req.body.section_no} - int
 * @param {req.body.garment_group_no} - int
 * @param {req.body.detail_desc} - string
 */
 app.put('/article', async (req, res) => {
    con.query('USE wardrobe;', function (err, result) {
        if (err) {
            console.log(err);
            res.status(404).send({ error: 'failure accessing database' });
        }
    });
    con.query(
        `CALL update_article("${req.body.article_id}", "${req.body.product_code}", "${req.body.prod_name}", ${req.body.product_type_no}, "${req.body.graphical_appearance_no}", ${req.body.colour_group_code}, ${req.body.perceived_colour_value_id}, ${req.body.perceived_colour_master_id}, ${req.body.department_no}, "${req.body.index_code}", ${req.body.index_group_no}, ${req.body.section_no}, ${req.body.garment_group_no}, "${req.body.detail_desc}");`,
        function (err, result) {
            if (err) {
                res.status(404).send({ error: `${err}` });
            } else {
                res.status(200).send({result: JSON.stringify(result)});
            }
        }
    );
});


/**
 * update a customer
 * @param {req.body.customer_id} - string
 * @param {req.body.fn} - string
 * @param {req.body.active} - string
 * @param {req.body.club_member_status} - string
 * @param {req.body.fashion_news_frequency} - string
 * @param {req.body.age} - int
 * @param {req.body.postal_code} - str
 */
 app.put('/customer', async (req, res) => {
  con.query('USE wardrobe;', function (err, result) {
      if (err) {
          console.log(err);
          res.status(404).send({ error: 'failure accessing database' });
      }
  });
  con.query(
      `CALL update_customer("${req.body.customer_id}", "${req.body.fn}", "${req.body.active}", "${req.body.club_member_status}", "${req.body.fashion_news_frequency}", ${req.body.age}, "${req.body.postal_code}");`,
      function (err, result) {
          if (err) {
              res.status(404).send({ error: `${err}` });
          } else {
              res.status(200).send({result: JSON.stringify(result)});
          }
      }
  );
});

/**
 * update a transaction
 * @param {req.body.id} - int
 * @param {req.body.t_dat} - date string YYYY-MM-DD
 * @param {req.body.customer_id} - string
 * @param {req.body.article_id} - string
 * @param {req.body.price} - int
 * @param {req.body.sales_channel_id} - string
 */
 app.put('/transaction', async (req, res) => {
  con.query('USE wardrobe;', function (err, result) {
      if (err) {
          console.log(err);
          res.status(404).send({ error: 'failure accessing database' });
      }
  });
  con.query(
      `CALL update_transaction(${req.body.id}, CAST("${req.body.t_dat}" AS DATE), "${req.body.customer_id}", "${req.body.article_id}", "${req.body.price}", "${req.body.sales_channel_id}");`,
      function (err, result) {
          if (err) {
              res.status(404).send({ error: `${err}` });
          } else {
              res.status(200).send({result: JSON.stringify(result)});
          }
      }
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
