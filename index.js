const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const dotenv = require('dotenv').config()

// medialWare
const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use(express.json());
//middleware
const port =process.env.PORT || 5001;

// mongodb uri and client and set password and admin

const uri ="mongodb+srv://DrawPrintDreamAdmin:INEwwJsqYjl17d6c@cluster0.oinhkx3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const client = new MongoClient(uri);
// user collection
const database = client.db("ArtAndCraftDB");
const userCollection = database.collection("allArtAndCraf");

app.get("/", (req, res) => {
  res.send("Server is running...");
});

async function main() {
  await client.connect();

  app.get("/users", async(req, res) => {
    const data = userCollection.find();
    const result =await data.toArray();
    res.send(result);
  });


  console.log("database susscessfully")
}

main();

app.listen(port, () => {
  console.log(`server is ranning https://localhost:${port}`);
})