import { generateResponse } from '../../lib/responseFormate.js';
import Form from './form.model.js';
export const createForm = async (req, res, next) => {
  try {
    const userId = req.user ? req.user._id : null;

    let { type, formName, fieldName = [] } = req.body;
    console.log(req.body);
    // Ensure unique fields
    fieldName = [...new Set(fieldName.map((f) => f.trim()))];

    const form = new Form({
      type,
      formName,
      fieldName,
      userId
    });

    await form.save();

    generateResponse(res, 201, true, 'Form created successfully', form);
  } catch (err) {
    next(err);
  }
};

export const getAllForms = async (req, res) => {
  try {
    const forms = await Form.find().sort({ createdAt: -1 });
    generateResponse(res, 200, true, 'Forms fetched successfully', forms);
  } catch (err) {
    generateResponse(res, 500, false, err.message, null);
  }
};

export const getFormById = async (req, res) => {
  try {
    const formId = req.params.id;
    const form = await Form.findById(formId);
    if (!form) {
      return generateResponse(res, 404, false, 'Form not found', null);
    }
    generateResponse(res, 200, true, 'Form fetched successfully', form);
  } catch (err) {
    generateResponse(res, 500, false, err.message, null);
  }
};

export const myForms = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : null;
    const forms = await Form.find({ userId }).sort({ createdAt: -1 });
    generateResponse(res, 200, true, 'User forms fetched successfully', forms);
  } catch (err) {
    generateResponse(res, 500, false, err.message, null);
  }
};

export const updateForm = async (req, res, next) => {
  try {
    const { id } = req.params;
    let { type, formName, fieldName = [], userId } = req.body;

    fieldName = [...new Set(fieldName.map((f) => f.trim()))];

    const form = await Form.findByIdAndUpdate(
      id,
      { type, formName, fieldName, userId },
      { new: true, runValidators: true }
    );

    if (!form) {
      return generateResponse(res, 404, false, 'Form not found', null);
    }

    generateResponse(res, 200, true, 'Form updated successfully', form);
  } catch (err) {
    next(err);
  }
};

export const deleteForm = async (req, res, next) => {
  try {
    const { id } = req.params;
    const form = await Form.findByIdAndDelete(id);
    if (!form) {
      return generateResponse(res, 404, false, 'Form not found', null);
    }
    generateResponse(res, 200, true, 'Form deleted successfully', null);
  } catch (err) {
    next(err);
  }
};
