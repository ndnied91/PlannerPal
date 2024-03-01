import { Router } from 'express';
const router = Router();
import { validateIdParam } from '../middleware/validationMiddleware.js'; //middleware

import {
  createItem,
  // getAllItems,
  getFilteredItems, //for filtering
  deleteItem,
  updateItem,
  updatePinnedItem,
  updateTodoEventFromCal,
  deleteItems,
  searchItems,
} from '../controllers/itemsController.js';

import { checkForTestUser } from '../middleware/authMiddleware.js';

router.route('/search').get(searchItems); //search all items

router.route('/').post(checkForTestUser, createItem); //creates all items
// router.route('/').get(getAllItems); //get all items
router.route('/filter/:filteredBy').post(getFilteredItems); //get all items

router.route('/delete/:id').post(validateIdParam, deleteItem);
router.route('/deleteMany/delete').post(deleteItems); //this is deleting from the archives page

router
  .route('/pinned/:id')
  .patch(validateIdParam, checkForTestUser, updatePinnedItem);

router.route('/:id').patch(validateIdParam, updateItem);
// .delete(validateIdParam, deleteItem);

router.route('/update/:calCode').patch(updateTodoEventFromCal);

export default router;
