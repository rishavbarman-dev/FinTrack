export const prepareExpenseBarChartData = (data = []) => {
  const chartData = data.map((item) => ({
    category: item.category,
    amount: item.amount,
  }));

  return chartData;
};
