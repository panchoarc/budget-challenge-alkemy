const db = require("../models");
const OperationsEntity = "operations";

const getLast10Operations = async (req, res) => {
  try {
    const operations = await db[OperationsEntity].findAll({
      where: { userId: req.users.userId },
      limit: 10,
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json({ operations });
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was a problem retrieving the data" });
  }
};

const getOperation = async (req, res) => {
  try {
    const validatedId = parseInt(req.params.id, 10);
    const operation = await db[OperationsEntity].findOne({
      where: { id: validatedId, userId: req.users.userId },
    });
    if (!operation) {
      return res.status(404).json({ message: "Operation not found" });
    }
    return res.status(200).json({ operation });
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was a problem retrieving the data" });
  }
};

const createOperation = async (req, res) => {
  const { type, amount, concept, date } = req.body;
  const { userId } = req.users;

  try {
    const validatedAmount = parseFloat(amount);
    const newOperation = await db[OperationsEntity].create({
      concept,
      amount: validatedAmount,
      type,
      date,
      userId,
    });
    return res.status(201).json({
      message: "Operation created successfully",
      operation: newOperation,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "There was a problem creating the operation" });
  }
};

const updateOperation = async (req, res) => {
  const { amount, concept, date } = req.body;
  const { userId } = req.users;

  const validatedId = parseInt(req.params.id, 10);
  try {
    const operation = await db[OperationsEntity].findOne({
      where: { id: validatedId, userId },
    });
    if (!operation) {
      return res.status(404).json({ message: "Operation not found" });
    }
    const updatedOperation = await operation.update({
      amount,
      concept,
      date,
    });
    return res.status(200).json({
      message: "Operation updated successfully",
      operation: updatedOperation,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was a problem updating the operation" });
  }
};
const deleteOperation = async (req, res) => {
  const { userId } = req.users;

  try {
    const validatedId = parseInt(req.params.id, 10);
    const operation = await db[OperationsEntity].findOne({
      where: { id: validatedId, userId },
    });
    if (!operation) {
      return res.status(404).json({ message: "Operation not found" });
    }
    await operation.destroy();
    return res.status(200).json({ message: "Operation deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was a problem deleting the operation" });
  }
};
const operationsController = {
  getLast10Operations,
  getOperation,
  createOperation,
  updateOperation,
  deleteOperation,
};

module.exports = operationsController;
