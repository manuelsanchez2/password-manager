const inquirer = require("inquirer");

const CHOICE_GET = "Check existing password";
const CHOICE_SET = "Create new password";

const initialQuestion = [
  {
    type: "password",
    name: "masterPassword",
    message: "What's your master password?",
  },
];

const operationQuestion = [
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

const questionNewMasterPassword = [
  {
    type: "password",
    name: "newMasterPassword",
    message: "Please enter your new master password",
  },
];

function askStartQuestion() {
  return inquirer.prompt(initialQuestion);
}
function askOperationQuestion() {
  return inquirer.prompt(operationQuestion);
}

function askGetPasswordQuestions() {
  return inquirer.prompt(questionsGet);
}

function askSetPasswordQuestions() {
  return inquirer.prompt(questionsSet);
}

function askForNewMasterPassword() {
  return inquirer.prompt(questionNewMasterPassword);
}

exports.askStartQuestion = askStartQuestion;
exports.askOperationQuestion = askOperationQuestion;
exports.askGetPasswordQuestions = askGetPasswordQuestions;
exports.askSetPasswordQuestions = askSetPasswordQuestions;
exports.askForNewMasterPassword = askForNewMasterPassword;
exports.CHOICE_GET = CHOICE_GET;
exports.CHOICE_SET = CHOICE_SET;
