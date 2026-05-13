import { EmailService } from "./email.services";
import { sendErrorResponse, sendSuccessResponse } from "./apiResponse";

import VerificationModel from "@/models/verification.model";
import { generateToken } from "@/utils/jwt";
import UserModel from "@/models/user.model";
import { generateAlphanumericVerificationCode } from "@/constants/utils";


export class VerificationService {
  static async handleEmailVerification(email: string) {
    const code = generateAlphanumericVerificationCode();
    const existingCode = await VerificationModel.findOne({ email })

    if (existingCode) {
      await EmailService.sendVerificationEmail(email, existingCode.code)
    }
    else {
      await VerificationModel.create({ code, email });
      await EmailService.sendVerificationEmail(email, code)
    }
  }

  static async handleVerifyEmail(email: string, code: string) {
    try {
      const normalizedEmail = email.toLowerCase().trim();

      // 1. Check if the verification code exists and is valid
      const existingCode = await VerificationModel.findOne({
        email: normalizedEmail,
        code
      });

      if (!existingCode) {
        return sendErrorResponse("Invalid or expired code", 200);
      }

      // 2. FETCH THE USER from the database (This was missing)
      const user = await UserModel.findOne({ email: normalizedEmail });

      if (!user) {
        return sendErrorResponse("User not found", 200);
      }

      // 3. Update the user's verification status in the database
      // Assuming your schema has an 'isVerify' field
      user.isVerify = true;
      await user.save();

      // 4. Generate JWT token
      const token = generateToken({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        isVerify: user.isVerify,
        email: user.email,
        phone: user?.phone,
      });

      // 5. Cleanup: Delete the verification code so it can't be used again
      await VerificationModel.deleteOne({ _id: existingCode._id });

      // 6. Send welcome email (Non-blocking is usually better)
      EmailService.sendEmailUserCreate(
        user.email,
        `${user.firstName} ${user.lastName}`
      ).catch(err => console.error("Welcome email failed:", err));

      return sendSuccessResponse("User verified successfully", { token });

    } catch (error) {
      console.error("handleVerifyEmail Error:", error);
      return sendErrorResponse("An unknown error occurred during verification", 200);
    }
  }
}
