import { Router } from 'express';
import UserController from '../controllers/UserController';
import { Roles } from '../state/user';
import { asyncHandler } from '../middleware/asyncHandler';
import { checkJwt } from '../middleware/checkJwt';
import { checkRole } from '../middleware/checkRole';

/*const router = Router()
// Note: Each handler is wrapped with our error handling function.
// Get all users.
router.get('/', [], asyncHandler(UserController.listAll));

// Get one user.
router.get('/:id([0-9a-z]{24})', [], asyncHandler(UserController.getOneById));

// Create a new user.
router.post('/', [], asyncHandler(UserController.newUser));

// Edit one user.
router.patch('/:id([0-9a-z]{24})', [], asyncHandler(UserController.editUser));

// Delete one user.
router.delete('/:id([0-9a-z]{24})', [], asyncHandler(UserController.deleteUser));

//dont forget to export our router 
//unless in index will say user has no default export
export default router*/

const router = Router();
// Define our routes and their required authorization roles.
// Get all users.
router.get('/', [checkJwt, checkRole([Roles.ADMIN])], asyncHandler(UserController.listAll));
// Get one user.
router.get('/:id([0-9]{1,24})', [checkJwt, checkRole([Roles.USER, Roles.ADMIN])], asyncHandler(UserController.getOneById));
// Create a new user.
router.post('/', asyncHandler(UserController.newUser));
// Edit one user.
router.patch('/:id([0-9]{1,24})', [checkJwt, checkRole([Roles.USER, Roles.ADMIN])], asyncHandler(UserController.editUser));
// Delete one user.
router.delete('/:id([0-9]{1,24})', [checkJwt, checkRole([Roles.ADMIN])], asyncHandler(UserController.deleteUser));
export default router;
