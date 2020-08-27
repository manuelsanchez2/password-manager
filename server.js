const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`);
});

app.get("/", (request, response) => {
  console.log("Request /");
  response.send("Request succeeded");
});
