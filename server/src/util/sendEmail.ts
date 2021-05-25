import nodemailer from 'nodemailer';

export const sendEmail = async (
  to: string,
  subject: string,
  html: string,
  text?: string
) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  //let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: Number(process.env.SMTP_PORT) || 0,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // generated ethereal user
      pass: process.env.SMTP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: '"👻" <miCompañia@comp.com>', // sender address
    to, // list of receivers
    subject, // Subject line
    text: text || '', // plain text body
    html, // html body
  });

  // console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // // Preview only available when sending through an Ethereal account
  // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
