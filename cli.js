const fs = require("fs").promises;
require("dotenv").config();

const {
  readPassword,
  writePassword,
  readMasterPassword,
  writeMasterPassword,
} = require("./libraries/passwords");
const {
  CHOICE_SET,
  CHOICE_GET,
  askStartQuestion,
  askOperationQuestion,
  askForNewMasterPassword,
  askGetPasswordQuestions,
  askSetPasswordQuestions,
} = require("./libraries/questions");
const { createHash, verifyHash } = require("./libraries/crypto.js");

const { MongoClient } = require("mongodb");

console.log(process.env);

const client = new MongoClient(process.env.MONGO_URL);

async function main() {
  try {
    await client.connect();

    const database = client.db(process.env.MONGO_DB_NAME);

    const originalMasterPassword = await readMasterPassword();

    if (!originalMasterPassword) {
      const { newMasterPassword } = await askForNewMasterPassword();
      const hashedMasterPassword = await createHash(newMasterPassword);
      await writeMasterPassword(hashedMasterPassword);
      console.log("Master Password is set");
      return;
    }

    const { masterPassword } = await askStartQuestion();
    const comparedPassword = await verifyHash(
      masterPassword,
      originalMasterPassword
    );
    if (!comparedPassword) {
      console.log("This is not the right Master Password");
      return;
    }

    const { operation } = await askOperationQuestion();

    console.log("You have introduced the right Master Password");
    if (operation === CHOICE_GET) {
      console.log("Now you want to know one password, eh?");
      const { key } = await askGetPasswordQuestions();
      try {
        const password = await readPassword(key, masterPassword, database);
        console.log(`Your ${key} password is ${password}`);
      } catch (error) {
        console.error("Something went wrong 😑", error);
      }
    } else if (operation === CHOICE_SET) {
      console.log("Now you are setting a new password");
      const { key, password } = await askSetPasswordQuestions();
      await writePassword(key, password, masterPassword, database);
      console.log(`New Password set`);
    }
  } finally {
    await client.close();
  }
}

main();
