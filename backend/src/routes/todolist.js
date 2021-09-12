import express from "express";
import client from "../db/postgres.js";

const router = express.Router();

// Get all Todo lists
router.get("/", (req, res) => {
  client.query(`SELECT * FROM todo_list;`, (err, response) => {
    if (err) {
      console.log(`Error getting a todo lists: ${err}`);
      res.status(400).send([]);
    } else {
      res.status(200).json(response.rows);
    }
  });
});

// Create a Todo list
// json body { name }
router.post("/", (req, res) => {
  const query = {
    text: `INSERT INTO todo_list (name) VALUES ($1);`,
    values: [req.body.name],
  };
  client.query(query, (err, response) => {
    if (err) {
      console.log(`Error creating a todo list: ${err}`);
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });
});

// Delete a Todo list
router.delete("/:todoListId", (req, res) => {
  const query = {
    text: `DELETE FROM todo_list WHERE id = $1;`,
    values: [req.params.todoListId],
  };
  client.query(query, (err, response) => {
    if (err) {
      console.log(`Error deleting a todo list: ${err}`);
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });
});

// Get all items
router.get("/:todoListId/items", (req, res) => {
  const query = {
    text: `SELECT * FROM todo_list_item WHERE list_id = $1`,
    values: [req.params.todoListId],
  };
  client.query(query, (err, response) => {
    if (err) {
      console.log(`Error getting a todo list items: ${err}`);
      res.status(400).send([]);
    } else {
      res.status(200).json(response.rows);
    }
  });
});

// Create an item
// json body { name }
router.post("/:todoListId/items", (req, res) => {
  const query = {
    text: `INSERT INTO todo_list_item (list_id, name) VALUES ($1, $2);`,
    values: [req.params.todoListId, req.body.name],
  };
  client.query(query, (err, response) => {
    if (err) {
      console.log(`Error creating a todo list item: ${err}`);
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });
});

// Update item
// json body { isCompleted: bool }
router.put("/:todoListId/items/:itemId", (req, res) => {
  const query = {
    text: `UPDATE todo_list_item SET is_completed = $1 WHERE id = $2;`,
    values: [req.body.isCompleted, req.params.itemId],
  };
  client.query(query, (err, response) => {
    if (err) {
      console.log(`Error updating a todo list item: ${err}`);
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });
});

// Delete an item
router.delete("/:todoListId/items/:itemId", (req, res) => {
  const query = {
    text: `DELETE FROM todo_list_item WHERE id = $1;`,
    values: [req.params.itemId],
  };
  client.query(query, (err, response) => {
    if (err) {
      console.log(`Error deleting a todo list item: ${err}`);
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });
});

export default router;
