import express from 'express';
const app = express();
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

import authRouter from './routes/authRouter.js';
import userRoutes from './routes/userRouter.js';
import itemsRouter from './routes/itemsRouter.js';
import calendarRouter from './routes/calendarRouter.js';

import notesRouter from './routes/notesRouter.js';
import settingsRouter from './routes/settingsRouter.js';

import { authenticateUser } from './middleware/authMiddleware.js';
// for searching
import Item from './models/ItemsModel.js';
// for searching
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, './client/dist')));

app.use(express.json()); //used for post routes for accepting data
app.use(cookieParser()); //103
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRouter); //creating and logging in
app.use('/api/users', authenticateUser, userRoutes); // checking for user on page load
app.use('/api/items', authenticateUser, itemsRouter); //for todos
app.use('/api/cal', authenticateUser, calendarRouter); //for cal
//
app.use('/api/notes', authenticateUser, notesRouter); //for notes

app.use('/api/settings', authenticateUser, settingsRouter); //for all settings on app

app.use(errorHandlerMiddleware); //THIS IS WHAT RENDERS THE ERRORS NICELY

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

const port = 5002;

try {
  // new way in es6
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
