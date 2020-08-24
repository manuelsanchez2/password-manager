const inquirer = require("inquirer");

const fs = require("fs");

const questions = [
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

inquirer.prompt(questions).then((answers) => {
  console.log(`Your master password is ${answers.password}!`);

  if (answers.password === "123") {
    console.log("Password is right");
    let passwordsJSON = fs.readFileSync("./passwords.json", "utf8");
    let passwords = JSON.parse(passwordsJSON);
    let service = answers.key;
    if (passwords[service]) {
      console.log(`Your ${answers.key} password is ${passwords[service]}`);
    } else {
      console.log(`There is no register of ${answers.key} yet`);
    }
  } else {
    console.log("Password is wrong");
  }
});
