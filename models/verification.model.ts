import mongoose from 'mongoose';

const verificationSchema = new mongoose.Schema({
  code: { type: String, required: true },
  email: { type: String, unique: true },
  phone: { type: String },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date },
});

const VerificationModel =
  mongoose.models.Verification ||
  mongoose.model("Verification", verificationSchema);

export default VerificationModel;