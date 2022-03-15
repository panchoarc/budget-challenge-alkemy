const validOperation = {
  concept: "test",
  description: "test",
  amount: 1,
  type: "INCOME",
  date: "2020-01-01",
};

const invalidOperation = {
  name: "test",
  description: "test",
  amount: "asd",
  type: "INCOME",
};

const updatingData = {
  concept: "updated",
  amount: 5000,
  date: "2022-02-26",
};

module.exports = {
  validOperation,
  invalidOperation,
  updatingData,
};
