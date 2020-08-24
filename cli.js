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

inquirer
  .prompt(initialQuestions)
  .then(async ({ masterPassword, operation }) => {
    if (masterPassword === "123") {
      console.log("You have introduced the right Master Password");
      if (operation === CHOICE_GET) {
        console.log("Now you want to know one password, eh?");
        inquirer.prompt(questionsGet).then(async ({ key }) => {
          try {
            const passwordsJSON = await fs.readFile(
              "./passwords.json",
              "utf-8"
            );
            const passwords = JSON.parse(passwordsJSON);
            console.log(`Your ${key} password is ${passwords[key]}`);
          } catch (error) {
            console.error("Something went wrong 😑");
            // What to do now?
          }
        });
      } else if (operation === CHOICE_SET) {
        console.log("Now you are setting a new password");
        inquirer.prompt(questionsSet).then(async ({ key, newPassword }) => {
          console.log(`Your new password is ${key} = ${newPassword}`);
        });
      }
    } else {
      console.log("This is not the right Master Password");
    }
  });

// inquirer.prompt(initialQuestions).then(async (answer) => {
//   if (answer.operation === CHOICE_GET) {
//     inquirer.prompt(getPasswordQuestions).then(async (answers) => {
//       console.log(`Your master password is ${answers.password}!`);

//       if (answers.password === "123") {
//         console.log("Password is right");
//         const passwordsJSON = await fs.readFile("./passwords.json", "utf8");
//         const passwords = JSON.parse(passwordsJSON);
//         const service = answers.key;
//         if (passwords[service]) {
//           console.log(`Your ${answers.key} password is ${passwords[service]}`);
//         } else {
//           console.log(`There is no register of ${answers.key} yet`);
//         }
//       } else {
//         console.log("Password is wrong");
//       }
//     });
//   } else {
//     inquirer.prompt(setPasswordQuestions).then(async (answer) => {
//       console.log(`Your master password is ${answer.password}!`);
//       if (answers.password === "123") {
//         const passwordsJSON = await fs.readFile("./passwords.json", "utf8");
//         const newPasswordJSON = await fs.writeFile(
//           "./passwords.json",
//           answers.key
//         );
//         console.log("New password soon, but first you have to become strong!");
//       } else {
//         console.log("Problemmm");
//       }
//     });
//   }
// });
