const { decrypt, encrypt } = require("./crypto");

const fs = require("fs").promises;

async function readPassword(key, masterPassword, database) {
  const collection = database.collection("passwords");
  const password = await collection.findOne({ name: key });
  if (!password) {
    return null;
  }
  const decryptedPassword = decrypt(password.value, masterPassword);
  return decryptedPassword;
}

async function writePassword(key, password, masterPassword, database) {
  const collection = database.collection("passwords");
  const encryptedPassword = encrypt(password, masterPassword);
  await collection.insertOne({ name: key, value: encryptedPassword });
}

async function deletePassword(name, database) {
  const collection = database.collection("passwords");
  await collection.deleteOne({ name: name });
}

async function readMasterPassword() {
  try {
    const masterPassword = await fs.readFile("./masterPassword", "utf-8");
    return masterPassword;
  } catch (error) {
    return null;
  }
}
async function writeMasterPassword(masterPassword) {
  await fs.writeFile("./masterPassword", masterPassword);
}

exports.readPassword = readPassword;
exports.writePassword = writePassword;
exports.deletePassword = deletePassword;
exports.readMasterPassword = readMasterPassword;
exports.writeMasterPassword = writeMasterPassword;
