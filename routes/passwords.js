require("dotenv").config();
const express = require("express");
const { readPassword, writePassword } = require("../libraries/passwords");
const jwt = require("jsonwebtoken");

function createPasswordsRouter(database, masterPassword) {
  const router = express.Router();

  router.get("/:name", async (request, response) => {
    try {
      const { name } = request.params;
      const { authToken } = request.cookies;
      const { email } = jwt.verify(authToken, process.env.JWT_SECRET);
      console.log(email);
      console.log(`Allow access to ${email}`);

      if (!email) {
        return response.status(403).send("No access!");
      }
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

      const existingPassword = await readPassword(
        name,
        masterPassword,
        database
      );
      if (existingPassword) {
        response.status(409).send("Password already exists");
        return;
      }

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
