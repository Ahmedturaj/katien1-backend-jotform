import { Router } from 'express';
import {
  createForm,
  deleteForm,
  getAllForms,
  getFormById,
  myForms,
  updateForm
} from './form.controller.js';
import { verifyToken } from '../../core/middlewares/authMiddleware.js';

const router = Router();

// CRUD routes
router.post('/create', verifyToken, createForm);
router.get('/all', verifyToken, getAllForms);
router.get('/my-forms', verifyToken, myForms);
router.get('/:id', verifyToken, getFormById);
router.put('/:id', verifyToken, updateForm);
router.delete('/:id', verifyToken, deleteForm);

const formRouter = router;
export default formRouter;
