const inquirer = require("inquirer");

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

// Con prompt llamamos a la llamada y le decimos que lo que viene se llama respuesta. Va por orden, primero te pregunta la de la contrasena y luego la del nombre.
inquirer.prompt(questions).then((answers) => {
  console.log(`Your password is ${answers.password}!`);
  console.log(`Would you like to know the password of ${answers.key}?`);
  if (answers.password === "123") {
    console.log("Password is right");
  } else {
    console.log("Password is wrong");
  }
});
