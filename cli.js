const inquirer = require("inquirer");

const question = [
  {
    type: "password",
    name: "password",
    message: "What's your password",
  },
  {
    type: "input",
    name: "name",
    message: "What's yourname",
  },
  {
    type: "number",
    name: "siblings",
    message: "How many brothers or sisters do you have?",
  },
];

// Con prompt llamamos a la llamada y le decimos que lo que viene se llama respuesta. Va por orden, primero te pregunta la de la contrasena y luego la del nombre.
inquirer.prompt(question).then((answers) => {
  console.log(`Your password is ${answers.password}!`);
  console.log(`Your name is ${answers.name}!`);
  console.log(`Your name is ${answers.siblings}!`);
});
