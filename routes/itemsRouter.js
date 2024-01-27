import { Router } from 'express';
const router = Router();
import { validateIdParam } from '../middleware/validationMiddleware.js'; //middleware

import {
  createItem,
  getAllItems,
  deleteJob,
  updateJob,
  updateTodoEventFromCal,
} from '../controllers/itemsController.js';

router.route('/').post(createItem); //creates all items
router.route('/').get(getAllItems); //get all items

router
  .route('/:id')
  .patch(validateIdParam, updateJob)
  .delete(validateIdParam, deleteJob);

router.route('/update/:calCode').patch(updateTodoEventFromCal);

export default router;
