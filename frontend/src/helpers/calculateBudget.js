const calculateBudget = (operations) => {
  const total = operations.reduce((acc, el) => {
    if (el.type === "INCOME") {
      acc += el.amount;
    } else {
      acc -= el.amount;
    }
    return acc;
  }, 0);
  return total;
};

export { calculateBudget };
