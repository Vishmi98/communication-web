import nodemailer from "nodemailer";


export class EmailService {
  static async sendVerificationEmail(email: string, verificationCode: string) {
    // Create a transporter object
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465, // For SSL
      secure: true, // Use SSL
      auth: {
        user: "vishmi@fedolab.com", // Your Zoho Mail email address
        pass: "Vishmi!@#" // Your Zoho password or App-Specific Password
      }
    });

    // Define the email options
    const mailOptions = {
      from: "vishmi@fedolab.com",
      to: email,
      subject: 'Verify Your Email Address',
      text: `Please use the following verification code to verify your account: ${verificationCode}`,
      html: `<p>Please use the following verification code to verify your account:</p><h2>${verificationCode}</h2>`
    };

    // Send the email
    const response = await transporter.sendMail(mailOptions);
    if (response?.accepted?.length > 0) {
      return true
    }
    else {
      return false
    }
  };

  static async sendEmailUserCreate(user: string, name: string) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465, // For SSL
      secure: true, // Use SSL
      auth: {
        user: "vishmi@fedolab.com", // Your Zoho Mail email address
        pass: "Vishmi!@#" // Your Zoho password or App-Specific Password
      }
    });

    // Define the email options
    const mailOptions = {
      from: "vishmi@fedolab.com",
      to: "vishmi9801@gmail.com",
      subject: `New ${user} verified`,
      text: `New ${user} verified ${user} name:${name}`,
      html: `<p>New ${user} verified ${user} name:${name}</p>`
    };

    // Send the email
    const response = await transporter.sendMail(mailOptions);
    if (response?.accepted?.length > 0) {
      return true
    }
    else {
      return false
    }
  };

  static async sendPasswordResetEmail(email: string, password: string) {
    // Create a transporter object
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465, // For SSL
      secure: true, // Use SSL
      auth: {
        user: "vishmi@fedolab.com", // Your Zoho Mail email address
        pass: "Vishmi!@#" // Your Zoho password or App-Specific Password
      }
    });

    // Define the email options
    const mailOptions = {
      from: "vishmi@fedolab.com",
      to: email,
      subject: 'Password Reset',
      text: `New password is ${password}`,
      html: `<p>New password is:</p><h2>${password}</h2>`
    };

    // Send the email
    const response = await transporter.sendMail(mailOptions);
    if (response?.accepted?.length > 0) {
      return true
    }
    else {
      return false
    }
  };
}
