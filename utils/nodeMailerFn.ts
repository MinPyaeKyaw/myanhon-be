import nodemailer from "nodemailer";

interface Props {
    to: string[] | string;
    subject: string;
    html: string;
}

export default async function mailer({to, subject, html}: Props) {

    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: "darren.luettgen59@ethereal.email",
        pass: "RMXr76KJGwX8617aqd",
      },
    });
  
    const msg = await transporter.sendMail({
      from: 'Myanhon (Japanese Language Learning App)',
      to,
      subject,
      html
    });

    console.log("Message sent: %s", msg.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(msg));
}