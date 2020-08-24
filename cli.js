// import readlineSync from 'readline-sync'
let readlineSync = require("readline-sync");

console.log("Hi my friends");

let password = readlineSync.question(`Which is your password?`, {
  hideEchoBack: true,
});
console.log(password);

(readlineSync = require("readline-sync")),
  (animals = ["Lion", "Elephant", "Crocodile", "Giraffe", "Hippo"]),
  (index = readlineSync.keyInSelect(animals, "Which animal?"));
console.log("Ok, " + animals[index] + " goes to your room.");
