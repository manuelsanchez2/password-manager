const express = require("express");
const { readPassword, writePassword } = require("../libraries/passwords");

const bodyParser = require("body-parser");

function createPasswordsRouter(database, masterPassword) {
  const router = express.Router();

  router.get("/:name", async (request, response) => {
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

  router.post("/", async (request, response) => {
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

  return router;
}

module.exports = createPasswordsRouter;
