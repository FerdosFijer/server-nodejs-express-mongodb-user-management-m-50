const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.port || 5000;

// middleware or port 
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://simpleCrudUser-module-50:nbpXrlVkWGjZnYfe@cluster0.lchjpbi.mongodb.net/?appName=Cluster0`;
// mongodb+srv://simpleCrudUser-module-50:nbpXrlVkWGjZnYfe@cluster0.lchjpbi.mongodb.net/?appName=Cluster0 // simpleCrudUser-module-50 // nbpXrlVkWGjZnYfe

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const run = async () => {
  try {
    await client.connect();

    const db = client.db('simpleCrudUser-module-50');
    const userCollection = db.collection("users");

    app.get('/users', async (req, res) =>{
        const cursor = userCollection.find({});
        const result = await cursor.toArray();
        res.send(result);
})

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/',(req, res) =>{
    res.send('Hello from Crud server with mongodb') 
})
app.listen(port, () => {
    console.log(`Simple crud Mongodb is running ${port}`);
    
})