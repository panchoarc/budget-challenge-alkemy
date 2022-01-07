const { connection } = require("../config/database");

const operationsController = {};

operationsController.getLast10Operations = async (req, res) => {
  return connection
    .promise()
    .query(
      "SELECT * FROM operations WHERE users_id = ? ORDER BY date DESC LIMIT 10",
      [req.users.id]
    )
    .then((operations) => {
      console.log(operations[0].length);
      res.json(operations[0]);
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ message: "There was a problem retrieving the data" });
    });
};

operationsController.getOperation = async (req, res) => {
  return connection
    .promise()
    .query("SELECT * FROM operations WHERE users_id = ? AND id = ?", [
      req.users.id,
      req.params.id,
    ])
    .then((operations) => {
      console.log(operations[0].length);
      res.json({ operation: operations[0] });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ message: "There was a problem retrieving the data" });
    });
};

operationsController.createOperation = async (req, res) => {
  console.log(req.body);
  const { type, amount, concept, date } = req.body;
  const { id } = req.users;

  return connection
    .promise()
    .execute(
      "INSERT INTO operations (concept, amount,date ,type, users_id) VALUES (?, ?, ?, ?,?)",
      [concept, amount, new Date(date), type, id]
    )
    .then((operation) => {
      console.log(operation[0]);
      res
        .status(201)
        .json({ message: "Operation created", operation: operation });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ message: "There was a problem creating the operation" });
    });
};

operationsController.updateOperation = async (req, res) => {
  const { id } = req.params;
  const { amount, concept, date } = req.body;
  const { id: userId } = req.users;

  return connection
    .promise()
    .execute(
      "UPDATE operations SET concept = ?, amount = ?, date = ? WHERE id = ? AND users_id = ?",
      [concept, amount, new Date(date), id, userId]
    )
    .then(() => {
      res.json({ message: "Operation updated" });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ message: "There was a problem updating the operation" });
    });
};

operationsController.deleteOperation = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.users;

  return connection
    .promise()
    .execute("DELETE FROM operations WHERE id = ? AND users_id = ?", [
      id,
      userId,
    ])
    .then((operation) => {
      res.status(200).json({ message: "Operation deleted" });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ message: "There was a problem deleting the operation" });
    });
};

module.exports = operationsController;
