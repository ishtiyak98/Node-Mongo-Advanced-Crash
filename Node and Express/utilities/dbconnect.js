function dbconnect() {
//   const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.3hz1t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
//   const client = new MongoClient(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverApi: ServerApiVersion.v1,
//   });
console.log("DB connected");
}

module.exports = dbconnect;
