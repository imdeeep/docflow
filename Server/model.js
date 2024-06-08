const mongoose = require('mongoose');

// Define the schema for the documents collection ( Model 1)
const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Define the schema for the logs collection ( Model 2 )
const logSchema = new mongoose.Schema({
  action: {
    type: String,
    enum: ['create', 'delete','update'],

    required: true,
  },
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document',
  },
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: String, 
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

documentSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Document = mongoose.model('Document', documentSchema);
const Log = mongoose.model('Log', logSchema);

module.exports = {
  Document,
  Log,
};
