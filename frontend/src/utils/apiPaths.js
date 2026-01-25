export const BASE_URL = process.env.VITE_BASE_URL || "http://localhost:3000";

export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    SIGNUP: "/api/v1/auth/register",
    GET_USER_INFO: "/api/v1/auth/getUser",
  },
  DASHBOARD: {
    GET_DATA: "/api/v1/dashboard",
  },
  INCOME: {
    ADD_INCOME: "/api/v1/income/add",
    GET_ALL_INCOME: "/api/v1/income/get",
    DELETE_INCOME: (id) => `/api/v1/income/delete/${id}`,
    DOWNLOAD_INCOME: "/api/v1/income/download",
  },
  EXPENSE: {
    ADD_EXPENSE: "/api/v1/expense/add",
    GET_ALL_EXPENSE: "/api/v1/expense/get",
    DELETE_EXPENSE: (id) => `/api/v1/expense/delete/${id}`,
    DOWNLOAD_EXPENSE: "/api/v1/expense/download",
  },
  BUDGET: {
    SET_BUDGET: "/api/v1/budget",
    GET_BUDGET: "/api/v1/budget",
    DELETE_BUDGET: "/api/v1/budget",
    CHECK_BUDGET: "/api/v1/budget/check",
  },
};
