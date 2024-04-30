const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");

const app = express();


// require('dotenv').config()

// medialWare


app.use(cors({
  origin: ["http://localhost:5173"]
}));
app.use(express.json())

//middleware
const port = process.env.PORT || 5001;

// mongodb uri and client and set password and admin

const uri = "mongodb+srv://DrawPrintDreamAdmin:INEwwJsqYjl17d6c@cluster0.oinhkx3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const client = new MongoClient(uri);
// user collection
const database = client.db("ArtAndCraftDB");
const artAndCrafCollection = database.collection("allArtAndCraf");

app.get("/", (req, res) => {
  res.send("Server is running...");
});


async function main() {
  // await client.connect();

  // all Craft and Art
  // all Craft and Art
  app.get("/allCraft", async (req, res) => {
    const data = artAndCrafCollection.find();
    const result = await data.toArray();
    res.send(result);
  });
  // get one with id for viewDetails 
  app.get("/allCraft/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) }
    const result = await artAndCrafCollection.findOne(query);
    res.send(result)
  })

  // get user data
  // app.get("/allCraft/:email",async(req,res)=>{
  //   const email = req.params.email;
  //   const query = {user_email : new ObjectId(email)}
  //   // const result =await artAndCrafCollection.find().toArray();
  //   // res.send(result)
  //   console.log(ema)
  // })

  // add one data
  app.post("/allCraft", async (req, res) => {
    const craftOne = req.body;
    const result = await artAndCrafCollection.insertOne(craftOne);
    res.send(result)
  })

  app.delete("/allCraft/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) }
    const result = await artAndCrafCollection.deleteOne(filter);
    res.send(result)

  })

  // update a data patch
  app.patch('/allCraft/:id', async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    const filter = { _id: new ObjectId(id) }
    const option = { upsert: true };
    const updateDoc = {
      $set: {
        customization: update.customization,
        item_name: update.item_name,
        photo_url: update.photo_url,
        price: update.price,
        processing_time: update.processing_time,
        rating: update.rating,
        short_description: update.short_description,
        stock_status: update.stock_status,
        subcategory_name: update.subcategory_name,
      },
    };

    const result = await artAndCrafCollection.updateOne(filter,updateDoc,option)

    res.send(result)
  
  })

  // all Craft and Art
  // all Craft and Art

  // all category 

  // all category 
  // get category
  app.get("/category/:item", async (req, res) => {
    const item = req.params.item;
    const result = await database.collection(item).find().toArray();
    res.send(result)
  })
  //  post category
  app.post("/category/:item", async (req, res) => {
    const item = req.params.item;
    const newItem = req.body;
    const result = await database.collection(item).insertOne(newItem);
    res.send(result)
  })
  // delete 
  // app.delete("/category/:item/:price", async (req, res) => {
  //    const price = req.params.price;
  //   const filter = { price: new ObjectId(price) }
  //    const item = req.params.item;
  
  //    const result = await database.collection(item).deleteOne(filter);
  //   res.send(result)
  

  // })


  console.log("database susscessfully")
}

main();

app.listen(port, () => {
  console.log(`server is ranning http://localhost:${port}`);
})

