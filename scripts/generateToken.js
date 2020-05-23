const fs = require("fs").promises;
const path = require("path");
const fetch = require("node-fetch");
const inquirer = require("inquirer");
const chalk = require("chalk");
const base64 = require("base-64");

let input = {};
const tokens = {};

inquirer
  .prompt([
    {
      name: "username",
      message:
        "username => Patron id. This could be a CPR number or id card number:"
    },
    {
      name: "password",
      message:
        "password => Password. This could be the PIN-code of the patron:",
      type: "password"
    },
    {
      name: "agency",
      message:
        "agency => The agency number of the patron library organization. Example: 710100 for Copenhagen libraries:"
    },
    {
      name: "client_id",
      message:
        "client_id => Client id. The id of the client application which is acting on behalf of the patron:"
    },
    {
      name: "client_secret",
      message:
        "client_secret => Client secret. The secret matching the client id:",
      type: "password"
    }
  ])
  .then(function collectAnswers(answers) {
    input = answers;
  })
  .then(function fetchUserToken() {
    const body = Object.keys(input).reduce((acc, key) => {
      return `${acc}&${key}=${input[key]}`;
    }, "grant_type=password");
    return fetch("https://login.bib.dk/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body
    });
  })
  .then(function parseRaw(raw) {
    return raw.json();
  })
  .then(function giveFeedback(response) {
    console.info(chalk.blue("!") + ` user token: ${response.access_token}`);
    tokens.user = response.access_token;
  })
  .then(function fetchLibraryToken() {
    const body = `grant_type=password&username=@DK-${input.agency}&password=@DK-${input.agency}`;
    return fetch("https://auth.dbc.dk/oauth/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${base64.encode(
          `${input.client_id}:${input.client_secret}`
        )}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body
    });
  })
  .then(function parseRaw(raw) {
    return raw.json();
  })
  .then(function giveFeedback(response) {
    console.info(chalk.blue("!") + ` library token: ${response.access_token}`);
    tokens.library = response.access_token;
  })
  .then(function writeTokenFile() {
    return fs.writeFile(
      path.resolve(__dirname, "../.tokens"),
      JSON.stringify(tokens),
      "utf8"
    );
  })
  .then(function onEnd() {
    console.info(
      chalk.blue("!") + ".tokens file added to the root of the project."
    );
  })
  .catch(function onError(error) {
    console.error(error);
  });
