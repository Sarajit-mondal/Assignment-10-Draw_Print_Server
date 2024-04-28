const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

// medialWare
const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use(express.json());

const port =process.env.PORT || 5001;

// mongodb uri and client
const uri =
  "mongodb+srv://bdsarajit499:bdsarajit123@cluster0.qhafzaz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);
// user collection
const database = client.db("userDB");
const userCollection = database.collection("users");

app.get("/", (req, res) => {
  res.send("Server is running...");
});

async function main() {
  await client.connect();

  app.get("/users", (req, res) => {
    const data = userCollection.find();
    const result = data.toArray();
    res.send("user get");
  });
}

main();

app.listen(port, () => {
  console.log(`server is ranning https://localhost:${port}`);
})