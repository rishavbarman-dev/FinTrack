/* eslint-disable no-undef */
import { Resend } from "resend";
import { render } from "@react-email/render";
import React from "react";
import dotenv from "dotenv";
import emailTemplate from "../../emails/EmailTemplate.js";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBudgetAlertEmail({ to, username, data }) {
  try {
    // Convert JSX to HTML using React Email
    const emailHtml = await render(
      React.createElement(emailTemplate, {
        username,
        type: "budget-alert",
        data,
      })
    );

    const { data: result, error } = await resend.emails.send({
      from: "FinTrack <onboarding@resend.dev>",
      to,
      subject: "Your Budget Alert - FinTrack",
      html: emailHtml,
    });

    if (error) {
      console.error("Email sending failed:", error);
      return null;
    }

    console.log("Email sent successfully:", result);
    return result;
  } catch (err) {
    console.error("Unexpected error while sending email:", err);
  }
}

export async function sendMonthlyReportEmail({ to, username, data }) {
  try {
    const normalizedData = {
      month: data.month,
      expenses: data.stats?.expenses ?? [],
      incomes: data.stats?.incomes ?? [],
      insights: data.insights ?? {},
    };

    const emailHtml = await render(
      React.createElement(emailTemplate, {
        username,
        type: "monthly-report",
        data: normalizedData,
      })
    );

    const { data: result, error } = await resend.emails.send({
      from: "FinTrack <onboarding@resend.dev>",
      to,
      subject: `Your Monthly Report - ${data.month}`,
      html: emailHtml,
    });

    if (error) {
      console.error("Monthly report email failed:", error);
      return null;
    }

    console.log("Monthly report email sent successfully:", result);
    return result;
  } catch (err) {
    console.error("Unexpected error while sending monthly report:", err);
  }
}
