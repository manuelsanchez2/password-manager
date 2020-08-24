const {
  CHOICE_SET,
  CHOICE_GET,
  askStartQuestions,
  askGetPasswordQuestions,
  askSetPasswordQuestions,
} = require("./libraries/questions");

const fs = require("fs").promises;

async function main() {
  const { masterPassword, operation } = await askStartQuestions;

  if (masterPassword === "123") {
    console.log("You have introduced the right Master Password");
    if (operation === CHOICE_GET) {
      console.log("Now you want to know one password, eh?");
      const { key } = await askGetPasswordQuestions;
      try {
        const passwordsJSON = await fs.readFile("./passwords.json", "utf-8");
        const passwords = JSON.parse(passwordsJSON);
        console.log(`Your ${key} password is ${passwords[key]}`);
      } catch (error) {
        console.error("Something went wrong 😑");
      }
    } else if (operation === CHOICE_SET) {
      console.log("Now you are setting a new password");
      const { key, newPassword } = await askSetPasswordQuestions;
      console.log(`Your new password is ${key} = ${newPassword}`);
    }
  } else {
    console.log("This is not the right Master Password");
  }
}

main();
