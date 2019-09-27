const express = require('express');

const { getLoggedUserId } = require('../utils');
const { getTodosByCategoryId, getTodosByUserId, getTodoById, addTodo, deleteTodo, updateTodo } = require('../db/database.js');

const router = express.Router();

module.exports = (db) => {
  // not ready
  // router.get("/", (req, res) => {
  //   const userId = getLoggedUserId();
  //   getTodosByCategoryId(db, userId, categoryId)
  //     .then(data => {
  //       res.json({ categories: data });
  //     })
  // });

  router.get("/", (req, res) => {
    const userId = getLoggedUserId(req);
    getTodosByUserId(db, userId)
      .then(data => {
        res.json({ todo: data });
      })
  });

  router.get("/:id", (req, res) => {
    const userId = getLoggedUserId(req);
    const todoID = req.params.id;
    getTodoById(db, userId, todoID)
      .then(data => {
        res.json({ todo: data });
      })
  });

  router.post("/", (req, res) => {
    const userId = getLoggedUserId(req);
    addTodo(db, req.body, userId)
      .then(data => {
        res.json({ todo: data });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/:id/delete", (req, res) => {
    console.log("in the route /:id/delete, an ID will be deleted");
    const userId = getLoggedUserId(req);
    deleteTodo(db, req.params.id, userId)
      // .then(res.send("Success"))
      .then(() => {
        console.log("success");
        res.send("Success");
      })
      .catch(err => {
        console.log("About to error out", err);
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/:id/edit", (req, res) => {

    const userId = getLoggedUserId(req);

    updateTodo(db, { ...req.body, id: req.params.id }, userId)
      .then(data => {
        res.json({ todo: data });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });



  return router;
};
