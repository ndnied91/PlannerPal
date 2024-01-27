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

router.route('/').post(createNote); //creates all items
router.route('/').get(getAllNotes); //get all items

router
  .route('/:id')
  //   .patch(validateIdParam, updateJob)
  .delete(validateNotesIdParam, deleteNote);

// router.route('/:_id').delete(validateNotesIdParam, deleteNote);

export default router;
