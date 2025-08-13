
import mongoose, { Schema } from "mongoose";

const ReportSchema = new Schema({
    issue: {
        type: String,
        required: [true, "this field is required."]
    },
    status: {
        type: String,
        enum: ["pending", "solved", "rejected"],
        default: "pending"
    },
    description: {
        type: String,
        required: [true, "this field is required."]
    },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
},
{
    timestamps:true
}
);

const Report = mongoose.model("Report", ReportSchema);
export default Report;