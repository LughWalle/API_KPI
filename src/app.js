const serverless = require("serverless-http");
const express = require("express");
const { findAll } = require("./model/employeesModel");
const { calcularHeadcountETurnoverPorMes } = require("./utils/calculateMetrics");

const app = express();

app.get("/employees", async (_req, res) => {
  const employees = await findAll();
  console.log(employees.body);
  console.log(calcularHeadcountETurnoverPorMes(employees.body));
  return res.status(employees.statusCode).json(employees.body);
});

app.get("/turnover", async (req, res, next) => {
  const employees = await findAll();
  const turnover = calcularHeadcountETurnoverPorMes(employees.body, 'TO');
  return res.status(employees.statusCode).json(turnover);
});

app.get("/headcount", async (req, res, next) => {
  const employees = await findAll();
  const headcount = calcularHeadcountETurnoverPorMes(employees.body, 'HC');
  return res.status(employees.statusCode).json(headcount);
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
