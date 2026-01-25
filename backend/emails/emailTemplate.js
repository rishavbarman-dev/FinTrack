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
  Hr,
} from "@react-email/components";

export default function emailTemplate({
  username = "Rishav",
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
          // Header
          React.createElement(
            "div",
            { style: styles.header },
            React.createElement(
              Heading,
              { style: styles.title },
              "Monthly Financial Report"
            ),
            React.createElement(Text, { style: styles.subtitle }, data.month)
          ),
          // Greeting
          React.createElement(
            Text,
            { style: styles.greeting },
            `Hello ${username},`
          ),
          React.createElement(
            Text,
            { style: styles.intro },
            "Here's your comprehensive financial summary for the month."
          ),
          React.createElement(Hr, { style: styles.divider }),
          // Key Metrics Summary
          React.createElement(
            Section,
            { style: styles.metricsGrid },
            React.createElement(
              "div",
              { style: styles.metricCard },
              React.createElement(
                Text,
                { style: styles.metricLabel },
                "Total Income"
              ),
              React.createElement(
                Text,
                { style: styles.metricValue },
                `₹${(data?.insights?.totalIncome ?? 0).toLocaleString()}`
              )
            ),
            React.createElement(
              "div",
              { style: styles.metricCard },
              React.createElement(
                Text,
                { style: styles.metricLabel },
                "Total Expenses"
              ),
              React.createElement(
                Text,
                { style: styles.metricValue },
                `₹${(data?.insights?.totalExpense ?? 0).toLocaleString()}`
              )
            ),
            React.createElement(
              "div",
              { style: { ...styles.metricCard, ...styles.savingsCard } },
              React.createElement(
                Text,
                { style: styles.metricLabel },
                "Net Savings"
              ),
              React.createElement(
                Text,
                {
                  style: {
                    ...styles.metricValue,
                    color:
                      (data?.insights?.netSavings ?? 0) >= 0
                        ? "#10b981"
                        : "#ef4444",
                  },
                },
                `₹${(data?.insights?.netSavings ?? 0).toLocaleString()}`
              )
            )
          ),
          // Expenses Breakdown
          (data?.expenses?.length ?? 0) > 0
            ? React.createElement(
                React.Fragment,
                null,
                React.createElement(
                  Heading,
                  { style: styles.sectionTitle },
                  "💳 Expenses by Category"
                ),
                React.createElement(
                  Section,
                  { style: styles.breakdownContainer },
                  data.expenses.map((e) =>
                    React.createElement(
                      "div",
                      { style: styles.breakdownItem, key: e._id },
                      React.createElement(
                        "div",
                        { style: styles.breakdownLeft },
                        React.createElement(
                          Text,
                          { style: styles.categoryName },
                          e._id
                        )
                      ),
                      React.createElement(
                        Text,
                        { style: styles.categoryAmount },
                        `₹${e.total.toLocaleString()}`
                      )
                    )
                  )
                )
              )
            : null,
          // Income Breakdown
          (data?.incomes?.length ?? 0) > 0
            ? React.createElement(
                React.Fragment,
                null,
                React.createElement(
                  Heading,
                  { style: styles.sectionTitle },
                  "💰 Income by Source"
                ),
                React.createElement(
                  Section,
                  { style: styles.breakdownContainer },
                  data.incomes.map((i) =>
                    React.createElement(
                      "div",
                      { style: styles.breakdownItem, key: i._id },
                      React.createElement(
                        "div",
                        { style: styles.breakdownLeft },
                        React.createElement(
                          Text,
                          { style: styles.categoryName },
                          i._id
                        )
                      ),
                      React.createElement(
                        Text,
                        {
                          style: { ...styles.categoryAmount, color: "#10b981" },
                        },
                        `₹${i.total.toLocaleString()}`
                      )
                    )
                  )
                )
              )
            : null,
          // AI Insights
          data?.insights?.aiInsight
            ? React.createElement(
                React.Fragment,
                null,
                React.createElement(Hr, { style: styles.divider }),
                React.createElement(
                  "div",
                  { style: styles.insightBox },
                  React.createElement(
                    Text,
                    { style: styles.insightTitle },
                    "Financial Insights"
                  ),
                  React.createElement(
                    Text,
                    { style: styles.insightText },
                    data.insights.aiInsight
                  )
                )
              )
            : null,
          // Footer
          React.createElement(
            Text,
            { style: styles.footer },
            "Keep up the great work managing your finances!"
          )
        )
      )
    );
  }

  if (type === "budget-alert") {
    const percentageUsed = data?.percentageUsed ?? 0;
    const remaining = (data?.budgetAmount ?? 0) - (data?.totalExpense ?? 0);
    const isWarning = percentageUsed >= 80;
    const isDanger = percentageUsed >= 100;

    return React.createElement(
      Html,
      null,
      React.createElement(Head, null),
      React.createElement(Preview, null, "Budget Alert - Action Required"),
      React.createElement(
        Body,
        { style: styles.body },
        React.createElement(
          Container,
          { style: styles.container },
          // Alert Header
          React.createElement(
            "div",
            { style: { ...styles.header, ...styles.alertHeader } },
            React.createElement(
              Heading,
              {
                style: {
                  ...styles.title,
                  color: isDanger
                    ? "#ef4444"
                    : isWarning
                      ? "#f59e0b"
                      : "#007b83",
                },
              },
              `${isDanger ? "🚨" : isWarning ? "⚠️" : "📊"} Budget Alert`
            )
          ),
          // Greeting
          React.createElement(
            Text,
            { style: styles.greeting },
            `Hello ${username},`
          ),
          // Alert Message
          React.createElement(
            "div",
            {
              style: {
                ...styles.alertBox,
                backgroundColor: isDanger
                  ? "#fee2e2"
                  : isWarning
                    ? "#fef3c7"
                    : "#dbeafe",
                borderLeft: `4px solid ${isDanger ? "#ef4444" : isWarning ? "#f59e0b" : "#3b82f6"}`,
              },
            },
            React.createElement(
              Text,
              {
                style: {
                  ...styles.alertText,
                  color: isDanger
                    ? "#991b1b"
                    : isWarning
                      ? "#92400e"
                      : "#1e40af",
                },
              },
              `You've used ${percentageUsed.toFixed(1)}% of your monthly budget.${
                isDanger
                  ? " You have exceeded your budget limit!"
                  : isWarning
                    ? " You're approaching your budget limit."
                    : ""
              }`
            )
          ),
          // Budget Overview
          React.createElement(
            Section,
            { style: styles.budgetGrid },
            React.createElement(
              "div",
              { style: styles.budgetCard },
              React.createElement(
                Text,
                { style: styles.budgetLabel },
                "Monthly Budget"
              ),
              React.createElement(
                Text,
                { style: styles.budgetValue },
                `₹${(data?.budgetAmount ?? 0).toLocaleString()}`
              )
            ),
            React.createElement(
              "div",
              { style: styles.budgetCard },
              React.createElement(
                Text,
                { style: styles.budgetLabel },
                "Spent So Far"
              ),
              React.createElement(
                Text,
                { style: { ...styles.budgetValue, color: "#ef4444" } },
                `₹${(data?.totalExpense ?? 0).toLocaleString()}`
              )
            ),
            React.createElement(
              "div",
              { style: { ...styles.budgetCard, ...styles.remainingCard } },
              React.createElement(
                Text,
                { style: styles.budgetLabel },
                "Remaining"
              ),
              React.createElement(
                Text,
                {
                  style: {
                    ...styles.budgetValue,
                    color: remaining >= 0 ? "#10b981" : "#ef4444",
                  },
                },
                `₹${Math.abs(remaining).toLocaleString()}`
              )
            )
          ),
          // Progress Bar
          React.createElement(
            Section,
            { style: styles.progressSection },
            React.createElement(
              Text,
              { style: styles.progressLabel },
              "Budget Usage"
            ),
            React.createElement(
              "div",
              { style: styles.progressBar },
              React.createElement("div", {
                style: {
                  ...styles.progressFill,
                  width: `${Math.min(percentageUsed, 100)}%`,
                  backgroundColor: isDanger
                    ? "#ef4444"
                    : isWarning
                      ? "#f59e0b"
                      : "#10b981",
                },
              })
            ),
            React.createElement(
              Text,
              { style: styles.progressText },
              `${percentageUsed.toFixed(1)}% used`
            )
          ),
          // Action Message
          React.createElement(
            "div",
            { style: styles.actionBox },
            React.createElement(
              Text,
              { style: styles.actionText },
              isDanger
                ? "💡 Consider reviewing your expenses and adjusting your spending to stay within budget."
                : isWarning
                  ? "💡 Keep an eye on your spending for the rest of the month."
                  : "✅ You're managing your budget well. Keep it up!"
            )
          ),
          // Footer
          React.createElement(
            Text,
            { style: styles.footer },
            "Stay on track with your financial goals!"
          )
        )
      )
    );
  }
}

const styles = {
  body: {
    backgroundColor: "#f0f4f8",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    margin: 0,
    padding: "40px 20px",
  },
  container: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
    margin: "0 auto",
    padding: "0",
    maxWidth: "600px",
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#007b83",
    padding: "32px 40px",
    textAlign: "center",
  },
  alertHeader: {
    backgroundColor: "#f8fafc",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#ffffff",
    margin: "0 0 8px 0",
    lineHeight: "1.2",
  },
  subtitle: {
    fontSize: "16px",
    color: "#e0f2f3",
    margin: "0",
    fontWeight: "500",
  },
  greeting: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1f2937",
    margin: "32px 40px 8px 40px",
  },
  intro: {
    fontSize: "15px",
    lineHeight: "24px",
    color: "#6b7280",
    margin: "0 40px 24px 40px",
  },
  divider: {
    borderColor: "#e5e7eb",
    margin: "32px 40px",
  },
  metricsGrid: {
    display: "flex",
    gap: "16px",
    padding: "0 40px",
    marginBottom: "32px",
  },
  metricCard: {
    flex: 1,
    backgroundColor: "#f9fafb",
    padding: "20px 16px",
    borderRadius: "8px",
    textAlign: "center",
    border: "1px solid #e5e7eb",
    marginBottom: "16px",
  },
  savingsCard: {
    backgroundColor: "#f0fdf4",
    border: "1px solid #bbf7d0",
  },
  metricLabel: {
    fontSize: "13px",
    color: "#6b7280",
    margin: "0 0 8px 0",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    fontWeight: "600",
  },
  metricValue: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#007b83",
    margin: "0",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1f2937",
    margin: "32px 40px 16px 40px",
  },
  breakdownContainer: {
    padding: "0 40px",
    marginBottom: "24px",
  },
  breakdownItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 20px",
    backgroundColor: "#f9fafb",
    borderRadius: "8px",
    marginBottom: "8px",
    border: "1px solid #e5e7eb",
  },
  breakdownLeft: {
    flex: 1,
  },
  categoryName: {
    fontSize: "15px",
    fontWeight: "500",
    color: "#374151",
    margin: "0",
    gap: "8px",
  },
  categoryAmount: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#ef4444",
    margin: "0",
  },
  insightBox: {
    backgroundColor: "#eff6ff",
    padding: "24px",
    borderRadius: "8px",
    margin: "0 40px 32px 40px",
    border: "1px solid #bfdbfe",
  },
  insightTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#1e40af",
    margin: "0 0 12px 0",
  },
  insightText: {
    fontSize: "14px",
    lineHeight: "22px",
    color: "#1e3a8a",
    margin: "0",
  },
  footer: {
    fontSize: "14px",
    color: "#9ca3af",
    textAlign: "center",
    padding: "32px 40px",
    margin: "0",
  },
  alertBox: {
    padding: "20px",
    borderRadius: "8px",
    margin: "24px 40px",
  },
  alertText: {
    fontSize: "15px",
    lineHeight: "24px",
    margin: "0",
  },
  budgetGrid: {
    display: "flex",
    gap: "16px",
    padding: "0 40px",
    marginTop: "32px",
  },
  budgetCard: {
    flex: 1,
    backgroundColor: "#f9fafb",
    padding: "20px 16px",
    borderRadius: "8px",
    textAlign: "center",
    border: "1px solid #e5e7eb",
    marginBottom: "16px",
  },
  remainingCard: {
    backgroundColor: "#f0fdf4",
    border: "1px solid #bbf7d0",
  },
  budgetLabel: {
    fontSize: "13px",
    color: "#6b7280",
    margin: "0 0 8px 0",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    fontWeight: "600",
  },
  budgetValue: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#007b83",
    margin: "0",
  },
  progressSection: {
    padding: "32px 40px",
  },
  progressLabel: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
    margin: "0 0 8px 0",
  },
  progressBar: {
    width: "100%",
    height: "12px",
    backgroundColor: "#e5e7eb",
    borderRadius: "6px",
    overflow: "hidden",
    marginBottom: "8px",
  },
  progressFill: {
    height: "100%",
    transition: "width 0.3s ease",
    borderRadius: "6px",
  },
  progressText: {
    fontSize: "13px",
    color: "#6b7280",
    margin: "0",
    textAlign: "right",
  },
  actionBox: {
    backgroundColor: "#fef3c7",
    padding: "20px",
    borderRadius: "8px",
    margin: "0 40px 32px 40px",
    border: "1px solid #fde68a",
  },
  actionText: {
    fontSize: "14px",
    lineHeight: "22px",
    color: "#78350f",
    margin: "0",
  },
};
