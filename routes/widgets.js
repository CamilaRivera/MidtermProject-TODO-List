/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

const fetchMovie = require('./helpers/fetchMovie');
const fetchFood = require('./helpers/fetchFood');
const fetchBook = require('./helpers/fetchBook');
const fetchProduct = require('./helpers/fetchProduct');

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM widgets`;
    console.log(query);
    db.query(query)
      .then(data => {
        const widgets = data.rows;
        res.json({ widgets });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post('/movieInfo', (req, res) => {
    fetchMovie(req, res);
  });

  router.post('/movie', (req, res) => {
    fetchMovie(req, res);
  });


  router.post('/foodInfo', (req, res) => {
    fetchFood(req, res);
  });

  router.post('/food', (req, res) => {
    fetchFood(req, res);
  });

  router.post('/bookInfo', (req, res) => {
    fetchBook(req, res);
  });

  router.post('/book', (req, res) => {
    fetchBook(req, res);
  });
  
  router.post('/productInfo', (req, res) => {
    fetchProduct(req, res);
  });

  router.post('/product', (req, res) => {
    fetchProduct(req, res);
  });

  return router;
};
