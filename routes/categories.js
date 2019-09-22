const express = require('express');

const { getLoggedUserId } = require('../utils');
const { addCategory, getCategoriesByUserId, deleteCategory, editCategory } = require('../db/database.js');

const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const userId = getLoggedUserId();
    getCategoriesByUserId(db, userId)
      .then(data => {
        res.json({ categories: data });
      })

  });

  router.post("/", (req, res) => {
    addCategory(db, { ...req.body, user_id: getLoggedUserId() })
      .then(data => {
        res.json({ categories: data });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/:id/delete", (req, res) => {
    const userId = getLoggedUserId();
    deleteCategory(db, req.params.id, userId)
    .then( res.send("Success"))
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/:id/edit", (req, res) => {
    const userId = getLoggedUserId();
    editCategory(db,  { ...req.body, user_id: userId, id: req.params.id })
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

