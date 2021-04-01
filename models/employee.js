require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

let employeeSchema = new Schema({
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    nationalId: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    gender: { type: String, required: true },
    status: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    qualification: { type: Schema.Types.Mixed, required: true },
    job: { type: String, required: true },
    contractStartDate: { type: Date, required: true },
    endServiceDate: { type: Date, required: true },
    center: { type: String, required: true },
    management: { type: String, required: true },
    fileNames: { type: [String], required: true },
});

let employeeModel = mongoose.model("employeeModel", employeeSchema);

module.exports = employeeModel;