const express = require("express");
const cors = require("cors");
require("dotenv").config();


const app = express();
const port = process.env.port || 5000;


//!------- middle-wire -------
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
    res.send("Warehouse Management Server");
});

app.listen(port, ()=>{
    console.log("listening from port: ", port);
})
