const inquirer = require("inquirer");
const fs = require("fs").promises;

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
    name: "newPassword",
    message: "Please enter the new password 🙈",
  },
];

async function main() {
  const { masterPassword, operation } = await inquirer.prompt(initialQuestions);

  if (masterPassword === "123") {
    console.log("You have introduced the right Master Password");
    if (operation === CHOICE_GET) {
      console.log("Now you want to know one password, eh?");
      const { key } = await inquirer.prompt(questionsGet);
      try {
        const passwordsJSON = await fs.readFile("./passwords.json", "utf-8");
        const passwords = JSON.parse(passwordsJSON);
        console.log(`Your ${key} password is ${passwords[key]}`);
      } catch (error) {
        console.error("Something went wrong 😑");
      }
    } else if (operation === CHOICE_SET) {
      console.log("Now you are setting a new password");
      const { key, newPassword } = await inquirer.prompt(questionsSet);
      console.log(`Your new password is ${key} = ${newPassword}`);
    }
  } else {
    console.log("This is not the right Master Password");
  }
}

main();
