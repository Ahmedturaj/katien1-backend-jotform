import express from "express";
import { createReport, deleteReport, getallReport, getSingleReport, toggleReport } from "./report.controller.js";

const router = express.Router();

router.post("/create", createReport);
router.get("/", getallReport);
router.get("/:id", getSingleReport)
router.patch("/toggle/:id", toggleReport);
router.delete("/delete/:id", deleteReport);

const reportRouter = router;
export default reportRouter;