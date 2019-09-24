const express = require('express');
const classifier = require('./helpers/classificator');
const { getLoggedUserId } = require('../utils');
const { addCategory, getCategoriesByUserId, deleteCategory, updateCategory, getTodosByCategoryId } = require('../db/database.js');

const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const userId = getLoggedUserId(req);
    getCategoriesByUserId(db, userId)
      .then(data => {
        res.json({ categories: data });
      })

  });

  router.get("/:id", (req, res) => {
    getTodosByCategoryId(db, req.cookies.userID, req.params.id)
      .then(data => res.json({data}));
  });

  router.post("/", (req, res) => {
    addCategory(db, { ...req.body, user_id: getLoggedUserId(req) })
      .then(data => {
        res.json({ categories: data });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/sort", (req, res) => {
    const {title} = req.body;
    res.send(classifier.categorize(title).predictedCategory);

  });

  router.post("/:id/delete", (req, res) => {
    const userId = getLoggedUserId(req);
    deleteCategory(db, req.params.id, userId)
    .then( res.send("Success"))
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/:id/edit", (req, res) => {
    const userId = getLoggedUserId(req);
    updateCategory(db,  { ...req.body, user_id: userId, id: req.params.id })
    .then(data => {
      res.json({ categories: data });
    })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  return router;
};

