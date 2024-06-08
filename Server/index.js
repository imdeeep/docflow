const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { ObjectId } = require('mongoose').Types;
const { Document, Log } = require('./model');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// MongoDB connection options
const uri = "mongodb+srv://mandeep7yadav:y989n4Fg3yz7dkzN@cluster0.eiudvpk.mongodb.net/?retryWrites=true&w=majority";

// Connect to MongoDB using Mongoose
mongoose.connect(uri, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Set a higher value based on your requirements
});

// Handle connection error
mongoose.connection.on('error', (error) => {
  console.error("Error connecting to MongoDB:", error);
});

// Handle successful connection
mongoose.connection.once('open', () => {
  console.log("Connected to MongoDB!");
});

// API FOR THE CRUD !

// Creating a document
app.post('/documents', async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    const newDocument = new Document({ title, content, userId });
    await newDocument.save();

    // Log the creation
    const newLog = new Log({ action: 'create', documentId: newDocument._id, userId,title: newDocument.title });
    await newLog.save();

    res.status(201).json(newDocument);
  } catch (error) {
    console.error("Error creating document:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all documents
app.get('/documents', async (req, res) => {
  try {
    const documents = await Document.find();
    res.json(documents);
  } catch (error) {
    console.error("Error getting documents:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get documents by userId
app.get('/documents/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const documents = await Document.find({ userId });
    res.json(documents);
  } catch (error) {
    console.error("Error getting documents by userId:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a document
app.put('/documents/:documentId', async (req, res) => {
  try {
    const documentId = req.params.documentId;
    const { title, content } = req.body;

    const updatedDocument = await Document.findByIdAndUpdate(
      documentId,
      { title, content, updatedAt: Date.now() },
      { new: true }
    );

    // Log the update
    const newLog = new Log({ action: 'update', documentId, userId: updatedDocument.userId ,title: updatedDocument.title});
    await newLog.save();

    res.json(updatedDocument);
  } catch (error) {
    console.error("Error updating document:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a document
app.delete('/documents/:documentId', async (req, res) => {
  try {
    const documentId = req.params.documentId;
    const deletedDocument = await Document.findOneAndDelete({ _id: documentId });

    if (!deletedDocument) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Log the deletion
    const newLog = new Log({ action: 'delete', documentId, userId: deletedDocument.userId,title: deletedDocument.title });
    await newLog.save();

    res.json(deletedDocument);
  } catch (error) {
    console.error("Error deleting document:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get document by query ID
app.get('/getdoc/:id', async (req, res) => {
  try {
    const queryId = req.params.id;
    const document = await Document.findOne({ _id: new ObjectId(queryId) });

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.json(document);
  } catch (error) {
    console.error("Error getting document by query ID:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Get all logs
app.get('/logs', async (req, res) => {
  try {
    const logs = await Log.find();
    res.json(logs);
  } catch (error) {
    console.error("Error getting logs:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
