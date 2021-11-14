const express = require('express')
const { MongoClient } = require('mongodb');
require('dotenv').config()
const cors = require('cors')
const app = express()
const port =process.env.PORT || 5000
app.use(cors());
const ObjectId = require("mongodb").ObjectId;
app.use(express.json())
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qoa3n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
    try {
        await client.connect();
        const database = client.db("niche");
        const productsCollection= database.collection("products");
        const orderCollection =database.collection("orders");
        const reviewsCollection =database.collection("reviews");
        const blogsCollection =database.collection("blogs");
        const usersCollection =database.collection("users");
        console.log('connected')
            //Get API
            app.get("/products",async(req,res)=>{
                const cursor=productsCollection.find({});
                const products =await cursor.toArray();
                res.send(products);
            })
        //post api
        app.post("/products",async(req,res)=>{
            const products =req.body;
            const result = await productsCollection.insertOne(products);
            res.json(result)
        })
        app.get("/products/:id",async(req,res)=>{
            const id=req.params.id;
            console.log(id)
            const query ={_id:ObjectId(id)};
            const result = await productsCollection.findOne(query);
            res.send(result)
          })
          //post order to get order 
            app.post("/orders",async(req,res)=>{
                const orders =req.body;
                const result = await  orderCollection.insertOne(orders);
                res.json(result)
            })
          //post review to get review 
            app.post("/reviews",async(req,res)=>{
                const orders =req.body;
                const result = await  reviewsCollection.insertOne(orders);
                res.json(result)
            })
               //Get API
               app.get("/reviews",async(req,res)=>{
                const cursor=reviewsCollection.find({});
                const products =await cursor.toArray();
                res.send(products);
            })
             //post blogsto get blogs
             app.post("/blogs",async(req,res)=>{
              const blogs=req.body;
              const result = await  blogsCollection.insertOne(blogs);
              res.json(result)
          })
           //Get blogs
           app.get("/blogs",async(req,res)=>{
            const cursor=blogsCollection.find({});
            const products =await cursor.toArray();
            res.send(products);
        })
        app.get("/blogs/:id",async(req,res)=>{
          const id=req.params.id;
          console.log(id)
          const query ={_id:ObjectId(id)};
          const result = await blogsCollection.findOne(query);
          res.send(result)
        })
          //post user to get user
          app.post("/users",async(req,res)=>{
            const users=req.body;
            const result = await  usersCollection.insertOne(users);
            res.json(result)
        })
      } finally {
        // await client.close();
      }
}
run().catch(console.dir);
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening :${port}`)
})