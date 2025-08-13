import { generateResponse } from "../../lib/responseFormate.js";
import Report from "./report.model.js";

export const createReport = async (req, res) => {
    try {
        const reportData = req.body;

        if (!reportData || Object.keys(reportData).length === 0) {
            return generateResponse(res, 400, false, "Report data is required", null);
        }

        const report = await Report.create(reportData);

        generateResponse(res, 201, true, "Report created successfully", report);

    } catch (error) {
        generateResponse(res, 500, false, error.message, null);
    }
};


export const getallReport = async (req, res) => {
    try {
        const report = await Report.find().sort({ createdAt: -1 });
        generateResponse(res, 200, "all report fetched successfully.", report);
    }
    catch (error) {
        generateResponse(res, 500, false, error.message, null);
    }
}

export const getSingleReport = async (req, res) => {
    try {
        const { id } = req.params;
        const report = await Report.findById(id);
        if (!report) {
            generateResponse(res, 404, "report not found", null);
        }
        generateResponse(res, 200, "report fetched successfully.", report);
    }
    catch (error) {
        generateResponse(res, 500, false, error.message, null);
    }
}

export const toggleReport = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const allowedStatuses = ["pending", "solved", "rejected"];
        if (!allowedStatuses.includes(status)) {
            return generateResponse(res, 400, false, "Invalid status value", null);
        }

        const report = await Report.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );

        if (!report) {
            return generateResponse(res, 404, false, "Report not found", null);
        }

        generateResponse(res, 200, true, "Report status updated successfully", report);
    } catch (error) {
        generateResponse(res, 500, false, error.message, null);
    }
};


export const deleteReport = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedReport = await Report.findByIdAndDelete(id);

        if (!deletedReport) {
            return generateResponse(res, 404, false, "Report not found", null);
        }

        generateResponse(res, 200, true, "Report deleted successfully", deletedReport);
    } catch (error) {
        generateResponse(res, 500, false, error.message, null);
    }
};
