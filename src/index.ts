import express from 'express';
import mongoose from './db';
import graphQlHandler from './graphQl';
import { PORT } from './config';

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

const app = express();

app.all('/', graphQlHandler);

const runningApp = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

function gracefulShutdown() {
  runningApp.close();
  mongoose.connection.close();
}
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
