import mongoose, { Schema } from "mongoose";
import validator from "validator"
const formSchema = new Schema(
  {
    type: {
      type: Number,
      enum: [1, 2, 3, 4],
      required: true,
    },
    name: {
      firstName: { type: String, required: true, trim: true },
      lastName: { type: String, required: true, trim: true },
    },
    email: {
      type: String,
      required: [true, "this field is required"],
      validate: [validator.isEmail, "Invalid email"],
    },
    phone: { type: Number, required: true },
    message: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: "User" },

    pdfPath: { type: String },         
    pdfFile: { type: Buffer },        
  },
  { timestamps: true }
);

const Form = mongoose.model("Form", formSchema);
export default Form;
