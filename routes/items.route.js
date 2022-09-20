const express = require("express");
const itemsController = require("../controllers/items.controller");

const router = express.Router();

// router.get("/", (req, res)=>{
//     res.send("all items of inventory")
// });

// router.get("/:id", (req, res)=>{
//     res.send("items found with id")
// });

// router.post("/", (req, res)=>{
//     res.send("items added to inventory")
// });

router
  .route("/")
  .get(itemsController.getAllItems)
  .post(itemsController.saveItem);

module.exports = router;
