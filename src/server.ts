import express, { type Request, type Response } from 'express';
import { MongoClient, Db, Collection } from 'mongodb';
import cors from 'cors';
import dotenv from 'dotenv';
import type {  BoardDocument, Rows } from './type.ts';

// Load environment variables
dotenv.config();

const app = express();

// Configuration from .env
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";
const DB_NAME = process.env.DB_NAME || "kanban_app";
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
// const db = client.db("kanban_app"); // This name will be your Database
console.log(PORT)
console.log(MONGO_URI)
console.log(DB_NAME)
console.log(CLIENT_URL)
// Middleware
app.use(cors({
  origin: "*", // Restrict access to your frontend URL
  methods: ['GET', 'PUT']
}));
app.use(express.json());

const client = new MongoClient(MONGO_URI,{
  connectTimeoutMS: 10000,
  tls: true,
  // Add this only if you are still getting Alert 80 after whitelisting 0.0.0.0/0
  tlsAllowInvalidCertificates: true 
});
let boardsCollection: Collection<BoardDocument>;

async function initializeDB() {
  try {
    if (!MONGO_URI) {
      throw new Error("MONGODB_URI is not defined in .env");
    }

    await client.connect();
    const db = client.db(DB_NAME);
    boardsCollection = db.collection<BoardDocument>('boards');
    
    console.log(`📡 MongoDB Connected to: ${DB_NAME}`);
    app.listen(PORT, () => console.log(`🚀 Server active on port ${PORT}`));
  } catch (error) {
    console.error(`❌ Initialization failed: found mongo URI :${MONGO_URI} DB NAME USED : ${DB_NAME}`, error);
    // console.error()
    process.exit(1);
  }
}

// GET: Fetch board by ID
app.get('/kanban/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const board = await boardsCollection.findOne({ boardId: req.params.id });
    if (!board) return res.status(404).json({ message: "New Board" });
    res.json(board.data);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// PUT: Upsert board data
app.put('/kanban/:id', async (req: Request<{ id: string }, {}, Rows>, res: Response) => {
  try {
    const { id } = req.params;
    await boardsCollection.updateOne(
      { boardId: id },
      { $set: { data: req.body, lastUpdated: new Date() } },
      { upsert: true }
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Save Error" });
  }
});

initializeDB();