const calculateBudget = (operations) => {
  let totalBudget = 0;

  operations.forEach((operation) => {
    if (operation.type === "INCOME") {
      totalBudget += Number(operation.amount);
    } else {
      totalBudget -= Number(operation.amount);
    }
  });
  return totalBudget;
};

export { calculateBudget };
