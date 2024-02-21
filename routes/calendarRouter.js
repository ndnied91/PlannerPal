import { Router } from 'express';
const router = Router();

import {
  createCalEvent,
  getAllCalEvents,
  updateCalEvent,
  deleteCalJob,
  updateCalEventFromTodo,
} from '../controllers/calendarController.js';

import { validateCalIdParam } from '../middleware/validationMiddleware.js'; //middleware

import { checkForTestUser } from '../middleware/authMiddleware.js';

router.route('/').post(checkForTestUser, createCalEvent); //creates all items
router.route('/').get(getAllCalEvents); //get all items

router
  .route('/:_id')
  .patch(validateCalIdParam, checkForTestUser, updateCalEvent)
  .delete(validateCalIdParam, checkForTestUser, deleteCalJob);

router
  .route('/update/:calCode')
  .patch(checkForTestUser, updateCalEventFromTodo);

export default router;
