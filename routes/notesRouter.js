import { Router } from 'express';
const router = Router();
import {
  validateIdParam,
  validateNotesIdParam,
} from '../middleware/validationMiddleware.js'; //middleware

import {
  createNote,
  getAllNotes,
  deleteNote,
} from '../controllers/notesController.js';

import { checkForTestUser } from '../middleware/authMiddleware.js';

router.route('/').post(checkForTestUser, createNote); //creates all items
router.route('/').get(getAllNotes); //get all items

router.route('/:id').delete(checkForTestUser, validateNotesIdParam, deleteNote);

// router.route('/:_id').delete(validateNotesIdParam, deleteNote);

export default router;
