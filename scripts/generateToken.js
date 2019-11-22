const fs = require("fs").promises;
const path = require("path");
const fetch = require("node-fetch");
const inquirer = require("inquirer");
const chalk = require("chalk");

inquirer
  .prompt([
    {
      name: "username",
      message: "Username (CPR)"
    },
    {
      name: "password",
      message: "Password (four digits)",
      type: "password"
    },
    {
      name: "agency",
      message: "Agency"
    },
    {
      name: "client_id",
      message: "Client id"
    },
    {
      name: "client_secret",
      message: "Client secret",
      type: "password"
    }
  ])
  .then(function parseAnswers(answers) {
    const result = Object.keys(answers).reduce((acc, key) => {
      return `${acc}&${key}=${answers[key]}`;
    }, "");
    return result;
  })
  .then(function fetchToken(body) {
    return fetch("https://login.bib.dk/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `grant_type=password${body}`
    });
  })
  .then(function parseRaw(raw) {
    return raw.json();
  })
  .then(function giveFeedback(response) {
    console.info(chalk.blue("!") + " " + response.access_token);
    return response.access_token;
  })
  .then(function writeTokenFile(token) {
    return fs.writeFile(path.resolve(__dirname, "../.token"), token, "utf8");
  })
  .then(function onEnd() {
    console.info(
      chalk.blue("!") + " .token file added to the root of the project."
    );
  })
  .catch(function onError(error) {
    console.error(error);
  });
