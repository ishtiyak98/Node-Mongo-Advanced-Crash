const express = require("express");
const cors = require("cors");
require("dotenv").config();
const dbconnect = require("./utilities/dbconnect");
const itemRoutes = require("./routes/items.route");
const viewCont = require("./middleware/viewCount");
const limiter = require("./middleware/limiter");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const port = process.env.PORT || 5000;

//!------- middle-wire -------
app.use(express.json());
app.use(cors());
// app.use(viewCont);
// app.use(limiter);

dbconnect();

app.use("/api/v1/items", itemRoutes);

function tokenVerify(token) {
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
};

app.get("/", (req, res) => {
  res.send("Warehouse Management Server");
});

app.all("*", (req, res) => {
  res.send("no route found");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log("listening from port: ", port);
});

process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  app.close(()=>{
    process.exit(1);
  });
});