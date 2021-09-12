import express from "express";
import client from "../db/postgres.js";
import log4js from "log4js";

const router = express.Router();
const logger = log4js.getLogger();
logger.level = "all";

// Get all Todo lists
router.get("/", (req, res) => {
  logger.debug("Get all Todo lists");
  client.query(`SELECT * FROM todo_list;`, (err, response) => {
    if (err) {
      logger.error(`Error getting a todo lists: ${err}`);
      res.status(400).send([]);
    } else {
      res.status(200).json(response.rows);
    }
  });
});

// Create a Todo list
// json body { name }
router.post("/", (req, res) => {
  logger.debug("Create a Todo list");
  const query = {
    text: `INSERT INTO todo_list (name) VALUES ($1);`,
    values: [req.body.name],
  };
  client.query(query, (err, response) => {
    if (err) {
      logger.error(`Error creating a todo list: ${err}`);
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });
});

// Delete a Todo list
router.delete("/:todoListId", (req, res) => {
  logger.debug("Delete a Todo list");
  const query = {
    text: `DELETE FROM todo_list WHERE id = $1;`,
    values: [req.params.todoListId],
  };
  client.query(query, (err, response) => {
    if (err) {
      logger.error(`Error deleting a todo list: ${err}`);
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });
});

// Get all Todo list items
router.get("/:todoListId/items", (req, res) => {
  logger.debug("Get all todo list items");
  const query = {
    text: `SELECT * FROM todo_list_item WHERE list_id = $1`,
    values: [req.params.todoListId],
  };
  client.query(query, (err, response) => {
    if (err) {
      logger.error(`Error getting a todo list items: ${err}`);
      res.status(400).send([]);
    } else {
      res.status(200).json(response.rows);
    }
  });
});

// Create an item
// json body { name }
router.post("/:todoListId/items", (req, res) => {
  logger.debug("Create an item");
  const query = {
    text: `INSERT INTO todo_list_item (list_id, name) VALUES ($1, $2);`,
    values: [req.params.todoListId, req.body.name],
  };
  client.query(query, (err, response) => {
    if (err) {
      logger.error(`Error creating a todo list item: ${err}`);
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });
});

// Update a Todo list item
// json body { isCompleted: bool }
router.put("/:todoListId/items/:itemId", (req, res) => {
  logger.debug("Update a Todo list item");
  const query = {
    text:
      `UPDATE todo_list_item SET is_completed = $1 WHERE id = $2 AND list_id = $3;`,
    values: [req.body.isCompleted, req.params.itemId, req.params.todoListId],
  };
  client.query(query, (err, response) => {
    if (err) {
      logger.error(`Error updating a todo list item: ${err}`);
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });
});

// Delete a Todo list item
router.delete("/:todoListId/items/:itemId", (req, res) => {
  logger.debug("Delete a Todo list item");
  const query = {
    text: `DELETE FROM todo_list_item WHERE id = $1 AND list_id = $2;`,
    values: [req.params.itemId, req.params.todoListId],
  };
  client.query(query, (err, response) => {
    if (err) {
      logger.error(`Error deleting a todo list item: ${err}`);
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });
});

export default router;
