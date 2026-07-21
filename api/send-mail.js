const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER, // sender gmail address (set in Vercel dashboard)
        pass: process.env.SMTP_PASS, // gmail App Password (set in Vercel dashboard)
      },
    });

    await transporter.sendMail({
      from: `"Bilal Abbasi" <${process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL, // recipient address (set in Vercel dashboard)
      subject: 'Happy (Pre) Birthday Little Pixie 🎉',
      html: 'Happy Birthday soon, Little Pixie! Thanks for all the arguments I somehow always lose, for being scary good at math, and for having main character energy 24/7. You make life way more fun. Here\'s to another year of chaos and debates 🎂',
    });

    res.status(200).send('Message has been sent');
  } catch (err) {
    console.error(err);
    res.status(500).send('Message could not be sent. Mailer Error: ' + err.message);
  }
};
