import PDFDocument from "pdfkit";
import { generateResponse } from "../../utils/responseFormate.js";
import fs from "fs";
import path from "path";
import Form from "./form.model.js";

export const createFormPDF = async (req, res) => {
  try {
    const formData = req.body;
    // formData.createdBy = req.user._id;

    const form = new Form(formData);
    await form.save();

    const doc = new PDFDocument();

    const pdfPath = path.join(process.cwd(), "pdfs");
    if (!fs.existsSync(pdfPath)) {
      fs.mkdirSync(pdfPath);
    }

    const pdfFilePath = path.join(pdfPath, `${form._id}.pdf`);
    const writeStream = fs.createWriteStream(pdfFilePath);

 
    const buffers = [];
    doc.on("data", (chunk) => buffers.push(chunk));
    
    doc.fontSize(20).text("Form Details", { underline: true });
    doc.moveDown();
    doc.fontSize(14).text(`Type: ${form.type}`);
    doc.text(`Name: ${form.name.firstName} ${form.name.lastName}`);
    doc.text(`Email: ${form.email}`);
    doc.text(`Phone: ${form.phone}`);
    doc.text(`Message: ${form.message || "N/A"}`);
    doc.text(`Created At: ${form.createdAt.toLocaleString()}`);

    doc.pipe(writeStream);
    doc.end();

    writeStream.on("finish", async () => {

      const pdfBuffer = Buffer.concat(buffers);

     
      form.pdfPath = `/pdfs/${form._id}.pdf`;
      form.pdfFile = pdfBuffer;
      await form.save();

      generateResponse(res, 201, true, "Form saved and PDF created", { formId: form });
    });

    writeStream.on("error", (err) => {
      generateResponse(res, 500, false, "PDF creation failed: " + err.message, null);
    });
  } catch (err) {
    generateResponse(res, 500, false, err.message, null);
  }
};

export const getAllForms = async (req, res) => {
  try {
    const forms = await Form.find().select("-pdfFile").sort({ createdAt: -1 });
    generateResponse(res, 200, true, "Forms fetched successfully", forms);
  } catch (err) {
    generateResponse(res, 500, false, err.message, null);
  }
};


export const getFormById = async (req, res) => {
  try {
    const formId = req.params.id;
    const form = await Form.findById(formId).select("-pdfFile");
    if (!form) {
      return generateResponse(res, 404, false, "Form not found", null);
    }
    generateResponse(res, 200, true, "Form fetched successfully", form);
  } catch (err) {
    generateResponse(res, 500, false, err.message, null);
  }
};



export const getFormPDF = async (req, res) => {
  try {
    const formId = req.params.id;
    const form = await Form.findById(formId);

    if (!form || !form.pdfPath) {
      return generateResponse(res, 404, false, "PDF not found", null);
    }

    const pdfFilePath = path.join(process.cwd(), form.pdfPath);

    if (!fs.existsSync(pdfFilePath)) {
      return generateResponse(res, 404, false, "PDF file not found on server", null);
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename=${formId}.pdf`);

    const readStream = fs.createReadStream(pdfFilePath);
    readStream.pipe(res);

  } catch (err) {
    generateResponse(res, 500, false, err.message, null);
  }
};


export const getAllFormPDFs = async (req, res) => {
  try {
    
    const forms = await Form.find({ pdfPath: { $exists: true, $ne: null } })
      .select("_id name pdfPath")
      .sort({ createdAt: -1 });

    if (!forms.length) {
      return generateResponse(res, 404, false, "No PDFs found", null);
    }

    
    const baseUrl = process.env.BASE_URL || "http://localhost:5000/api/v1/form-data/";

 
    const pdfList = forms.map(form => ({
      id: form._id,
      name: `${form.name.firstName} ${form.name.lastName}`,
      pdfUrl: `${baseUrl}${form._id}/pdf`  
    }));

    generateResponse(res, 200, true, "PDF list fetched successfully", pdfList);

  } catch (err) {
    generateResponse(res, 500, false, err.message, null);
  }
};