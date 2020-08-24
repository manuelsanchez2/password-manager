const inquirer = require("inquirer");

const fs = require("fs").promises;

const initialQuestion = [
  {
    type: "list",
    name: "operation",
    message: "What do you want to do?",
    choices: ["Create new password", "Check existing password"],
  },
];

const checkPasswordQuestions = [
  {
    type: "password",
    name: "password",
    message: "What's your master password",
  },
  {
    type: "input",
    name: "key",
    message: "Which password do you need?",
  },
];

const newPasswordQuestions = [
  {
    type: "password",
    name: "password",
    message: "What's your master password",
  },
  {
    type: "input",
    name: "key",
    message: "Which password do you want to add?",
  },
];

inquirer.prompt(initialQuestion).then(async (answer) => {
  if (answer.operation === "Check existing password") {
    inquirer.prompt(checkPasswordQuestions).then(async (answers) => {
      console.log(`Your master password is ${answers.password}!`);

      if (answers.password === "123") {
        console.log("Password is right");
        const passwordsJSON = await fs.readFile("./passwords.json", "utf8");
        const passwords = JSON.parse(passwordsJSON);
        const service = answers.key;
        if (passwords[service]) {
          console.log(`Your ${answers.key} password is ${passwords[service]}`);
        } else {
          console.log(`There is no register of ${answers.key} yet`);
        }
      } else {
        console.log("Password is wrong");
      }
    });
  } else {
    inquirer.prompt(newPasswordQuestions).then(async (answers) => {
      console.log(`Your master password is ${answers.password}!`);
      if (answers.password === "123") {
        const newPasswordJSON = await fs.writeFile(
          "./passwords.json",
          answers.key,
          { flag: "a+" }
        );
        console.log("New password soon, but first you have to become strong!");
      } else {
        console.log("Problemmm");
      }
    });
  }
});
