import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Failed to send email:", error);
      throw error;
    }

    return { success: true, id: data?.id };
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}


export async function sendPasswordResetEmail(email: string, token: string) {
  await sendEmail({
    to: email,
    subject: "Password Reset Request",
    html: `
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="http://localhost:3000/reset-password?token=${token}" target="_blank">Reset Password</a>
    `
  })
}