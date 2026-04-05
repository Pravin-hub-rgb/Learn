import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

resend.emails.send({
    from: "onboarding@resend.dev",
    to: "pravinkumar3000@tutanota.com",
    subject: "Hello from Resend!",
    html: "<strong>It works!</strong>",
})