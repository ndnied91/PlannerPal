import 'express-async-errors';
import Note from '../models/NotesModel.js';
import { StatusCodes } from 'http-status-codes';
import {
  BadRequestError,
  UnauthenticatedError,
} from '../errors/customErrors.js';
import { response } from 'express';

export const createNote = async (req, res) => {
  console.log('in createNote');
  console.log(req.body);
  const { _id, body, title, createdBy } = req.body;

  const note = await Note.find({ _id });
  if (note.length > 0) {
    await Note.updateOne(
      { _id },
      {
        $set: {
          body,
          title,
          createdBy,
          createdAt: Date.now(), //for updating notes
        },
      }
    );
    //update note
  } else {
    const newNote = await Note.create({ createdBy, title, body });
    console.log(newNote);
  }

  const items = await Note.find({ createdBy: req.body.createdBy });
  res.status(StatusCodes.CREATED).json({ items });
  //sending back ALL items by specific user
};

export const getAllNotes = async (req, res) => {
  const items = await Note.find({ createdBy: req.user.userId });
  res.status(StatusCodes.CREATED).json({ items });
};

export const deleteNote = async (req, res) => {
  const { createdBy } = await Note.findByIdAndDelete(req.params.id);
  const items = await Note.find({ createdBy });
  res.status(StatusCodes.CREATED).json({ items });
};
