const { decrypt, encrypt } = require("./crypto");

const fs = require("fs").promises;

async function readPasswords() {
  const passwordsJSON = await fs.readFile("./passwords.json", "utf-8");
  const passwords = JSON.parse(passwordsJSON);
  return passwords;
}

async function writePasswords(passwords) {
  const passwordsJSON = JSON.stringify(passwords, null, 2);
  await fs.writeFile("./passwords.json", passwordsJSON);
}

async function readPassword(key) {
  const passwords = await readPasswords();
  const encryptedPassword = passwords[key];
  const decryptedPassword = decrypt(encryptedPassword, masterPassword);
  return decryptedPassword;
}

async function writePassword(key, decryptedPassword, masterPassword) {
  const passwords = await readPasswords();
  passwords[key] = encrypt(decryptedPassword, masterPassword);
  await writePasswords(passwords);
}

exports.readPassword = readPassword;
exports.writePassword = writePassword;
