import express, {
  type Express,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { Collection, Db, MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
import admin from "firebase-admin";
import type { ServiceAccount } from "firebase-admin";

dotenv.config();

const firebaseCredentials: ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID!,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
  privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n").trim(),
};

admin.initializeApp({
  credential: admin.credential.cert(firebaseCredentials),
});

interface Comment {
  writtenBy: string;
  content: string;
  date: string;
}

interface Story {
  name: string;
  likes: number;
  comments: Comment[];
  likeIds?: string[];
}

let db: Db;
let dbCollection: Collection<Story>;

const dbConnection = async () => {
  const uri = process.env.MONGO_URI || "mongodb://localhost:27017";
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();

  db = client.db("MERN-Stories");

  dbCollection = db.collection<Story>("stories");
};

const app: Express = express();
app.use(express.json()); //now app can handle json

interface AuthRequest extends Request {
  user?: admin.auth.DecodedIdToken; //represents the user identity from firebase, has user id, email, etc
}

interface NewStory {
  name: string;
  content: string;
  likes: number;
  comments: Comment[];
  likeIds?: string[];
}

app.get("/api/stories", async (req: Request, res: Response) => {
  try {
    const allStories = await dbCollection.find().toArray();
    res.json(allStories);
  } catch (e) {
    console.error("Error fetching stories", e);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/stories/new-story", async (require: Request, res: Response) => {
  const { name, content } = require.body;
  if (!name) {
    return res.status(400).json({ message: "Story name is required" });
  }

  const existingStory = await dbCollection.findOne({ name });

  if (existingStory) {
    return res.status(400).json({ message: "Story already exists" });
  }

  const newStory: NewStory = {
    name,
    content,
    likes: 0,
    comments: [],
    likeIds: [],
  };

  try {
    const result = await dbCollection.insertOne(newStory);
    res.status(201).json({ ...newStory, _id: result.insertedId });
  } catch (e) {
    console.log("Error creating story", e);
    res.status(500).json({ message: "Error creating story" });
  }
});

app.get("/api/stories/:name", async (req: Request, res: Response) => {
  const { name } = req.params;
  try {
    const story = await dbCollection.findOne({ name });
    if (!story) return res.status(404).json({ message: "Story not found" });
    res.json(story); // incluye likeIds si existe
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.use(async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { authtoken } = req.headers;

  if (authtoken) {
    const user = await admin.auth().verifyIdToken(authtoken as string);
    req.user = user;
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

app.post("/api/stories/:name/like", async (req: AuthRequest, res: Response) => {
  const { name } = req.params;
  const uid = req.user?.uid as string;

  const story = await dbCollection.findOne({ name });
  if (!story) return res.status(404).json({ message: "Story not found" });

  const likeIds = story.likeIds || [];
  let updatedStory;

  if (likeIds.includes(uid)) {
    // Ya dio like, entonces se quita
    updatedStory = await dbCollection.findOneAndUpdate(
      { name },
      { $inc: { likes: -1 }, $pull: { likeIds: uid } },
      { returnDocument: "after" }
    );
  } else {
    // No ha dado like, se suma
    updatedStory = await dbCollection.findOneAndUpdate(
      { name },
      { $inc: { likes: 1 }, $push: { likeIds: uid } },
      { returnDocument: "after" }
    );
  }

  res.json(updatedStory);
});

app.post("/api/stories/:name/comments", async (req: Request, res: Response) => {
  const { name } = req.params;
  const { writtenBy, content } = req.body;

  const newComment = {
    writtenBy,
    content,
    date: new Date().toISOString(),
  };

  const updatedStory = await dbCollection.findOneAndUpdate(
    { name },
    { $push: { comments: newComment } },
    { returnDocument: "after" }
  );

  res.json(updatedStory);
});

const initialize = async () => {
  const port = process.env.PORT || 3000;

  await dbConnection();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

initialize();
