const inquirer = require("inquirer");

const CHOICE_GET = "Check existing password";
const CHOICE_SET = "Create new password";

const initialQuestions = [
  {
    type: "password",
    name: "masterPassword",
    message: "What's your master password?",
  },
  {
    type: "list",
    name: "operation",
    message: "What do you want to do?",
    choices: [CHOICE_SET, CHOICE_GET],
  },
];

const questionsGet = [
  {
    type: "input",
    name: "key",
    message: "Which password do you need?",
  },
];

const questionsSet = [
  {
    type: "input",
    name: "key",
    message: "Which password do you want to add?",
  },
  {
    type: "password",
    name: "password",
    message: "Please enter the new password 🙈",
  },
];

function askStartQuestions() {
  return inquirer.prompt(initialQuestions);
}

function askGetPasswordQuestions() {
  return inquirer.prompt(questionsGet);
}

function askSetPasswordQuestions() {
  return inquirer.prompt(questionsSet);
}

exports.askStartQuestions = askStartQuestions;
exports.askGetPasswordQuestions = askGetPasswordQuestions;
exports.askSetPasswordQuestions = askSetPasswordQuestions;
exports.CHOICE_GET = CHOICE_GET;
exports.CHOICE_SET = CHOICE_SET;
