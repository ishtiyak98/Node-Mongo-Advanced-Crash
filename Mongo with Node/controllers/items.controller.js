// module.exports.getAllItems = (req, res, next) => {
//   const { ip, query, params, body, headers } = req;
//   res.send("ALL Items Found");
//   //   res.download(__dirname + "/items.controller.js" )
// };

const items = [
  {
    id: 1,
    name: "Hammer1",
  },
  {
    id: 2,
    name: "Hammer2",
  },
  {
    id: 3,
    name: "Hammer3",
  },
];

module.exports.getAllItems = (req, res, next) => {
  const { count, page } = req.query;
  res.json(items);
};

module.exports.saveItem = (req, res) => {
  items.push(req.body);
  res.status(200).send({
    success: true,
    message: "success",
    data: items,
  });
};

module.exports.getItemDetails = (req, res) => {
  const { id } = req.params;
  const item = items.find((item) => item.id === Number(id));
  if (item) {
    res.send(item);
  } else {
    res.send("item not found");
  }
};

module.exports.updateItem = (req, res) => {};
