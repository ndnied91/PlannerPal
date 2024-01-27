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

router.route('/').post(createCalEvent); //creates all items
router.route('/').get(getAllCalEvents); //get all items

router
  .route('/:_id')
  .patch(validateCalIdParam, updateCalEvent)
  .delete(validateCalIdParam, deleteCalJob);

router.route('/update/:calCode').patch(updateCalEventFromTodo);

export default router;
