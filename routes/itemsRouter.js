import { Router } from 'express';
const router = Router();
import { validateIdParam } from '../middleware/validationMiddleware.js'; //middleware

import {
  createItem,
  getAllItems,
  deleteItem,
  updateItem,
  updatePinnedItem,
  updateTodoEventFromCal,
} from '../controllers/itemsController.js';

router.route('/').post(createItem); //creates all items
router.route('/').get(getAllItems); //get all items

router.route('/pinned/:id').patch(validateIdParam, updatePinnedItem);

router
  .route('/:id')
  .patch(validateIdParam, updateItem)
  .delete(validateIdParam, deleteItem);

router.route('/update/:calCode').patch(updateTodoEventFromCal);

export default router;
