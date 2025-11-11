const express = require('express')
const cors = require('cors')
const admin = require("firebase-admin");
const serviceAccount = require("./serviceKey.json");
const app = express()
require("dotenv").config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { verifyToken } = require('./middleware/authMiddleware');
const port = 5000
app.use(cors())
app.use(express.json())


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.9ay2t5q.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    
    const db = client.db('cleaner-db')
    const cleanerCollection = db.collection('cleaner')

    // Get all services
    app.get('/cleaner', async (req, res) => {
      try {
        const result = await cleanerCollection.find().toArray()
        res.send(result)
      } catch (error) {
        res.status(500).send({ error: 'Failed to fetch services' })
      }
    })

    
    // Create new service
    app.post('/cleaner',  async (req, res) => {
      try {
        const service = req.body
        const result = await cleanerCollection.insertOne(service)
        res.send(result)
      } catch (error) {
        res.status(500).send({ error: 'Failed to create service' })
      }
    })

    // Update service
    app.patch('/cleaner/:id', async (req, res) => {
      try {
        const id = req.params.id
        const updates = req.body
        const filter = { _id: new ObjectId(id) }
        const updateDoc = {
          $set: updates
        }
        const result = await cleanerCollection.updateOne(filter, updateDoc)
        res.send(result)
      } catch (error) {
        res.status(500).send({ error: 'Failed to update service' })
      }
    })

    // Delete service
    app.delete('/cleaner/:id', async (req, res) => {
      try {
        const id = req.params.id
        const query = { _id: new ObjectId(id) }
        const result = await cleanerCollection.deleteOne(query)
        res.send(result)
      } catch (error) {
        res.status(500).send({ error: 'Failed to delete service' })
      }
    })

    // Health check endpoint
    app.get('/health', (req, res) => {
      res.send({ status: 'OK', message: 'Server is running' })
    })

    console.log("Successfully connected to MongoDB!");
  } finally {
    // Keep connection open
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Server is running!')
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})