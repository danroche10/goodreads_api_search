import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//Heroku Step 3

app.listen(process.env.PORT || 5000, () =>
  console.log(`Your soccer server is running on port ${PORT}`)
);

if (process.env.NODE_ENV === "production") {
  // Exprees will serve up production assets
  app.use(express.static("frontend/build"));

  // Express serve up index.html file if it doesn't recognize route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

console.log("hello");
