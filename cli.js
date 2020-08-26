const fs = require("fs").promises;
const { readPassword, writePassword } = require("./libraries/passwords");
const {
  CHOICE_SET,
  CHOICE_GET,
  askStartQuestions,
  askGetPasswordQuestions,
  askSetPasswordQuestions,
} = require("./libraries/questions");

async function main() {
  const { masterPassword, operation } = await askStartQuestions();

  if (masterPassword === "123") {
    console.log("You have introduced the right Master Password");
    if (operation === CHOICE_GET) {
      console.log("Now you want to know one password, eh?");
      const { key } = await askGetPasswordQuestions();
      try {
        const password = await readPassword(key);

        console.log(`Your ${key} password is ${password}`);
      } catch (error) {
        console.error("Something went wrong 😑");
      }
    } else if (operation === CHOICE_SET) {
      console.log("Now you are setting a new password");
      const { key, password } = await askSetPasswordQuestions();
      await writePassword(key, password, masterPassword);
      console.log(`New Password set`);
    }
  } else {
    console.log("This is not the right Master Password");
  }
}

main();
