require("dotenv").config();

const express = require("express");
const { MongoClient } = require("mongodb");
const { writePassword } = require("./libraries/passwords");
const { encrypt } = require("./libraries/crypto");
const bodyParser = require("body-parser");

const client = new MongoClient(process.env.MONGO_URL);

const app = express();
app.use(bodyParser.json());

const port = 3000;

async function main() {
  await client.connect();
  const database = client.db(process.env.MONGO_DB_NAME);
  const masterPassword = process.env.MASTER_PASSWORD;

  app.listen(port, () => {
    console.log(`App is listening on http://localhost:${port}`);
  });

  app.post("/api/passwords", async (request, response) => {
    console.log("POST on /api/passwords");
    const { name, value } = request.body;
    const encryptedPassword = encrypt(value, masterPassword);
    await writePassword(name, encryptedPassword, database);
    response.status(201).send("Password created. Well done!");
  });
}
main();
