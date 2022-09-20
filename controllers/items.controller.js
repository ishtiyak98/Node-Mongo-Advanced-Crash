module.exports.getAllItems = (req, res, next) => {
  const { ip, query, params, body, headers } = req;
  console.log(ip, query, params, body, headers);
  //   res.send("ALL Items Found");
  res.download(__dirname + "/items.controller.js" )
};

module.exports.saveItem = (req, res) => {
  res.send("items added to inventory");
};
