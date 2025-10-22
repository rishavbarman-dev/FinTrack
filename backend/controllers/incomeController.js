const xlsx = require("xlsx");
const Income = require("../models/Income.js");

exports.addIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const { source, amount, date } = req.body;

    if (!source || !amount || !date) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const newIncome = new Income({
      userId,
      source,
      amount,
      date: new Date(date),
    });

    await newIncome.save();
    res
      .status(201)
      .json({ message: "Income added successfully", income: newIncome });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.getAllIncome = async (req, res) => {
  const userId = req.user.id;
  try {
    const incomes = await Income.find({ userId }).sort({ date: -1 });
    res.status(200).json({ incomes });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.deleteIncome = async (req, res) => {
  try {
    await Income.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 });

    //Prepare excel data
    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date.toISOString().split("T")[0],
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Incomes");
    xlsx.writeFile(wb, "Incomes.xlsx");
    res.download("Incomes.xlsx");
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
