const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.port || 5000;

//!------- middle-wire -------
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.3hz1t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const itemCollection = client.db("furnitureHouse").collection("items");

    app.get("/", (req, res) => {
      res.send("Warehouse Management Server");
    });

    //!------ Show all Items ------
    app.get("/inventory", async (req, res) => {
      const size = parseInt(req.query.itemSize);

      const cursor = itemCollection.find({});
      let items;

      if (size) {
        items = await cursor.limit(size).toArray();
      } else {
        items = await cursor.toArray();
      }

      res.send(items);
    });

    //!------ My added Items using JWT------
    app.get("/myItems", async(req, res) => {
      const tokenInfo = req.headers.authorization;
      const [email, token] = tokenInfo.split(" ");
      const decoded = verifyToken(token);

      if (email === decoded.email) {
        const cursor = itemCollection.find({userEmail: email});
        const result = await cursor.toArray();
        res.send(result);
      } 
      else {
        res.status(403).send({message: 'forbidden access'})
      }
    })
    

    //!------- Show one item details---------
    app.get("/inventory/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await itemCollection.findOne(query);
      res.send(result);
    });

    //!------- Update Quantity ---------
    app.put("/inventory/:id", async (req, res) => {
      const { image, name, description, supplier_name, price, quantity } =
        req.body;
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: name,
          image: image,
          description: description,
          price: price,
          quantity: quantity,
          supplier_name: supplier_name,
        },
      };
      const result = await itemCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });

    //!------- Delete Item ---------
    app.delete("/deleteItem/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await itemCollection.deleteOne(query);
      res.send(result);
    });

    //!------- Add Item ---------
    app.post("/newItem", async (req, res) => {
      const newItem = req.body;
      const result = await itemCollection.insertOne(newItem);
      res.send(result);
    });

    //!------- JWT token ---------
    app.post("/login", async (req, res) => {
      const email = req.body;
      const token = jwt.sign(email, process.env.TOKEN);
      res.send({ token });
    });
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

function verifyToken(token) {
  let email;
  jwt.verify(token, process.env.TOKEN, function (err, decoded) {
    if (err) {
      email = "Email is Invalid";
    }
    if (decoded) {
      email = decoded;
    }
  });

  return email;
}

app.listen(port, () => {
  console.log("listening from port: ", port);
});
