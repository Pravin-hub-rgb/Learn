// app/test-email/page.tsx

import { sendEmail } from "@/lib/email";

export default async function TestEmailPage() {
  let result: { success: boolean; id?: string } | null = null;
  let error: unknown = null;

  try {
    result = await sendEmail({
      to: "pravinkumar3000@tutanota.com", // Apna email daalo
      subject: "Test Email from Resend",
      html: "<h1>Hello!</h1><p>Yeh test email hai.</p>",
    });
  } catch (err) {
    error = err;
  }

  if (error) {
    return (
      <div>
        <h1>Email Failed!</h1>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  return (
    <div>
      <h1>Email Sent!</h1>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}