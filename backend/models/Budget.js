import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    lastAlertSent: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Budget = mongoose.model("Budget", BudgetSchema);
export default Budget;
