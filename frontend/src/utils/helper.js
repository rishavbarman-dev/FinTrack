import moment from "moment";

export const prepareExpenseBarChartData = (data = []) => {
  const chartData = data.map((item) => ({
    category: item.category,
    amount: item.amount,
  }));

  return chartData;
};

export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort(
    (a, b) => moment(a.date).toDate() - moment(b.date).toDate()
  );

  return sortedData.map((item) => ({
    month: moment(item.date).format("Do YYYY"),
    amount: Number(item.amount) || 0,
    source: item.source,
  }));
};

export const prepareExpenseLineChartData = (data = []) => {
  const sortedData = [...data].sort(
    (a, b) => moment(a.date).toDate() - moment(b.date).toDate()
  );

  return sortedData.map((item) => ({
    month: moment(item?.date).format("Do MMM"),
    amount: Number(item?.amount) || 0,
    category: item?.category,
  }));
};
