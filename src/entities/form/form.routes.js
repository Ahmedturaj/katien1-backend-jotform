import { Router } from "express";
import { createFormPDF, getAllFormPDFs, getAllForms, getFormById, getFormPDF } from "./form.controller.js";


const router = Router();

// CRUD routes
router.post("/create", createFormPDF);
router.get("/all-pdf", getAllForms);
router.get("/forms/pdf", getAllFormPDFs);
router.get('/:id', getFormById);
router.get("/:id/pdf", getFormPDF);


const formRouter = router;
export default formRouter;
