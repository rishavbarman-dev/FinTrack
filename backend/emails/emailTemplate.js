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
  type = "budget-alert",
  data = {},
}) {
  if (type === "monthly-report") {
    // Empty template using React.createElement syntax
    return React.createElement(React.Fragment, null);
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
