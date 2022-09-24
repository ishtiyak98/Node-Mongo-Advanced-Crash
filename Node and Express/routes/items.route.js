const express = require("express");
const itemsController = require("../controllers/items.controller");
const limiter = require("../middleware/limiter");
const viewCont = require("../middleware/viewCount");

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

// router.route("/:id").get(limiter, viewCont, itemsController.getItemDetails);
router
  .route("/:id")
  .get(itemsController.getItemDetails)
  .patch(itemsController.updateItem);

module.exports = router;
