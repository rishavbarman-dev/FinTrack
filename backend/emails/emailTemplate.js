import React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export default function emailTemplate({
  username = "",
  type = "monthly-report",
  data = {},
}) {
  console.log("📦 Email data received:", JSON.stringify(data, null, 2));
  if (type === "monthly-report") {
    return React.createElement(
      Html,
      null,
      React.createElement(Head, null),
      React.createElement(Preview, null, `Monthly Report - ${data.month}`),
      React.createElement(
        Body,
        { style: styles.body },
        React.createElement(
          Container,
          { style: styles.container },
          React.createElement(
            Heading,
            { style: styles.title },
            `Monthly Report - ${data.month}`
          ),
          React.createElement(
            Text,
            { style: styles.text },
            `Hello ${username}, here’s your monthly summary:`
          ),
          React.createElement(
            Section,
            { style: styles.statsContainer },
            (data?.expenses?.length ?? 0) > 0
              ? data.expenses.map((e) =>
                  React.createElement(
                    "div",
                    { style: styles.stat, key: e._id },
                    React.createElement(
                      Text,
                      { style: styles.text },
                      `Expense: ${e._id}`
                    ),
                    React.createElement(
                      Text,
                      { style: styles.heading },
                      e.total
                    )
                  )
                )
              : React.createElement(
                  Text,
                  { style: styles.text },
                  "No expenses recorded"
                )
          ),
          React.createElement(
            Section,
            { style: styles.statsContainer },
            (data?.incomes?.length ?? 0) > 0
              ? data.incomes.map((i) =>
                  React.createElement(
                    "div",
                    { style: styles.stat, key: i._id },
                    React.createElement(
                      Text,
                      { style: styles.text },
                      `Income: ${i._id}`
                    ),
                    React.createElement(
                      Text,
                      { style: styles.heading },
                      i.total
                    )
                  )
                )
              : React.createElement(
                  Text,
                  { style: styles.text },
                  "No incomes recorded"
                )
          ),
          React.createElement(
            Text,
            { style: styles.text },
            `Total Expense: ${data?.insights?.totalExpense ?? 0}, Total Income: ${data?.insights?.totalIncome ?? 0}, Net Savings: ${data?.insights?.netSavings ?? 0}`
          )
        )
      )
    );
  }

  if (type === "budget-alert") {
    return React.createElement(
      Html,
      null,
      React.createElement(Head, null),
      React.createElement(Preview, null, "Budget Alert"),
      React.createElement(
        Body,
        { style: styles.body },
        React.createElement(
          Container,
          { style: styles.container },
          React.createElement(Heading, { style: styles.title }, "Budget Alert"),
          React.createElement(
            Text,
            { style: styles.text },
            `Hello ${username},`
          ),
          React.createElement(
            Text,
            { style: styles.text },
            `You’ve used ${(data?.percentageUsed ?? 0).toFixed(1)}% of your monthly budget.`
          ),
          React.createElement(
            Section,
            { style: styles.statsContainer },
            React.createElement(
              "div",
              { style: styles.stat },
              React.createElement(
                Text,
                { style: styles.text },
                "Budget Amount,"
              ),
              React.createElement(
                Text,
                { style: styles.heading },
                data?.budgetAmount
              )
            ),
            React.createElement(
              "div",
              { style: styles.stat },
              React.createElement(
                Text,
                { style: styles.text },
                "Spent So Far,"
              ),
              React.createElement(
                Text,
                { style: styles.heading },
                data?.totalExpense
              )
            ),
            React.createElement(
              "div",
              { style: styles.stat },
              React.createElement(Text, { style: styles.text }, "Remaining"),
              React.createElement(
                Text,
                { style: styles.heading },
                data?.budgetAmount - data?.totalExpense
              )
            )
          )
        )
      )
    );
  }
}

const styles = {
  body: {
    backgroundColor: "#f4f9f9",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    margin: 0,
    padding: "20px 0",
    color: "#333333",
  },
  container: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    margin: "0 auto",
    padding: "30px 40px",
    maxWidth: "500px",
    textAlign: "left",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#007b83",
    textAlign: "center",
    marginBottom: "20px",
  },
  text: {
    fontSize: "15px",
    lineHeight: "22px",
    color: "#444444",
    margin: "8px 0",
  },
  statsContainer: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#f0fbfc",
    padding: "15px 10px",
    borderRadius: "6px",
    marginTop: "20px",
    textAlign: "center",
  },
  stat: {
    flex: 1,
    margin: "0 5px",
  },
  heading: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#007b83",
    marginTop: "6px",
  },
};
