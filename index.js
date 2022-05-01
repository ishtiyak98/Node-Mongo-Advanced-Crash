const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require('mongodb');


const app = express();
const port = process.env.port || 5000;


//!------- middle-wire -------
app.use(express.json());
app.use(cors());

//username: furnitureHouse
//Pass : Akc6Exfk7ME33LCk



const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.3hz1t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const itemCollection = client.db("furnitureHouse").collection("items");

        //!------ Show all Items in HomePage ------
        app.get("/inventory", async(req, res)=>{
            const cursor = itemCollection.find({});
            const items = await cursor.toArray();
            res.send(items);
        })
    }
    finally{
        // await client.close();
    }
}

run().catch(console.dir);



app.get("/", (req, res) => {
    res.send("Warehouse Management Server");
});

app.listen(port, ()=>{
    console.log("listening from port: ", port);
})
