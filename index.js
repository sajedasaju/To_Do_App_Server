const express = require("express");
var cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
require('dotenv').config()
const port = 5000;

app.use(cors());
app.use(express.json());

const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5jfnpxa.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});


async function run() {
  try {
    await client.connect();
    console.log("connection done");
    const studentCollection = client.db("toDoApp").collection("students");
    // create a document to insert


    app.post("/student", async(req, res) => {
      const allStudents = req.body;
      console.log(allStudents);
      const result = await studentCollection.insertOne(allStudents);
      res.send(result);
    });
   
    app.get("/allStudent", async(req, res) => {
      const query = {}
      const result = await studentCollection.find(query).toArray();
      res.send(result);
    });
    
  }
   finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
