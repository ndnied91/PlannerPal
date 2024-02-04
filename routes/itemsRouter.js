import { Router } from 'express';
const router = Router();
import { validateIdParam } from '../middleware/validationMiddleware.js'; //middleware

import {
  createItem,
  getAllItems,
  getFilteredItems, //for filtering
  deleteItem,
  updateItem,
  updatePinnedItem,
  updateTodoEventFromCal,
  deleteItems,
} from '../controllers/itemsController.js';

router.route('/').post(createItem); //creates all items
router.route('/').get(getAllItems); //get all items
router.route('/filter/:filteredBy').get(getFilteredItems); //get all items

router.route('/deleteMany/delete').post(deleteItems); //this is deleting from the archives page

router.route('/pinned/:id').patch(validateIdParam, updatePinnedItem);

router
  .route('/:id')
  .patch(validateIdParam, updateItem)
  .delete(validateIdParam, deleteItem);

router.route('/update/:calCode').patch(updateTodoEventFromCal);

export default router;
