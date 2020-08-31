require("dotenv").config();

const express = require("express");
const { MongoClient } = require("mongodb");
const { writePassword, readPassword } = require("./libraries/passwords");
const { encrypt, decrypt } = require("./libraries/crypto");
const bodyParser = require("body-parser");

const client = new MongoClient(process.env.MONGO_URL, {
  useUnifiedTopology: true,
});

const app = express();
app.use(bodyParser.json());

app.use((request, response, next) => {
  console.log(`Request ${request.method} on ${request.url}`);
  next();
});

const port = 3000;

async function main() {
  await client.connect();
  const database = client.db(process.env.MONGO_DB_NAME);
  const masterPassword = process.env.MASTER_PASSWORD;

  app.get("/api/passwords/:name", async (request, response) => {
    try {
      const { name } = request.params;
      const password = await readPassword(name, masterPassword, database);
      if (!password) {
        response.status(404).send(`Password ${name} not found`);
        return;
      }
      response.status(200).send(password);
    } catch (error) {
      console.error(error);
      response.status(500).send(error.message);
    }
  });

  app.post("/api/passwords", async (request, response) => {
    try {
      console.log("POST on /api/passwords");
      const { name, value } = request.body;
      await writePassword(name, value, masterPassword, database);
      response.status(201).send("Password created. Well done!");
    } catch (error) {
      console.error(error);
      response.status(500).send(error.message);
    }
  });
  app.listen(port, () => {
    console.log(`App is listening on http://localhost:${port}`);
  });
}
main();
