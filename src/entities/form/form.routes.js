import { Router } from 'express';
import {
  createForm,
  getAllFormPDFs,
  getAllForms,
  getFormById,
  getFormPDF
} from './form.controller.js';

const router = Router();

// CRUD routes
router.post('/create', createForm);
router.get('/all-pdf', getAllForms);
router.get('/forms/pdf', getAllFormPDFs);
router.get('/:id', getFormById);
router.get('/:id/pdf', getFormPDF);

const formRouter = router;
export default formRouter;
