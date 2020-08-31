const express = require("express");

function createUsersRouter(database, user) {
  const router = express.Router();
  const collection = database.collection("users");
  router.get("/login/", async (request, response) => {
    const userFound = await collection.findOne(user);
    console.log(userFound);
    if (userFound) {
      response.status(200).send(user);
    } else {
      response.status(404).send("User not found");
    }
  });
  return router;
}

module.exports = createUsersRouter;
