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
      subject: '🎉 a lil something for the main character (aka you)',
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 480px; margin: auto; background: #0d0d1a; color: #f5f5f5; border-radius: 16px; padding: 32px; border: 1px solid #2d2d55;">
          <p style="font-size: 22px; margin: 0 0 4px;">yo <b style="color:#c9a6ff;">Little Pixie</b> 👋</p>
          <p style="font-size: 15px; color: #b9b9d9; margin: 0 0 20px;">this is your unofficial pre-birthday notification 🔔</p>

          <p style="font-size: 16px; line-height: 1.6;">
            not to be dramatic but the universe really said "let's put the most argumentative,
            math-brained, main-character-energy human on this earth" and honestly?
            <b>no notes.</b> 10/10 casting. 🎬
          </p>

          <p style="font-size: 16px; line-height: 1.6;">
            you fight me on literally everything (and somehow still win half the time,
            which is wild bc you're not even that right 😭), you solve equations like
            it's a personality trait, and you walk into every room like the plot revolves
            around you — because let's be real, it kind of does. 💅
          </p>

          <p style="font-size: 16px; line-height: 1.6;">
            okay real talk for one sec though 🥺 — behind all the jokes, I'm actually just
            really grateful for you. all our stupid arguments over nothing are somehow some
            of my favorite memories, and I don't say this enough but you make everything
            better just by being around. so yeah. that's the sappy part, don't get used to it. 💜
          </p>

          <p style="font-size: 16px; line-height: 1.6;">
            anyway back to the roast: here's to another year of you being certifiably
            unbothered, undefeated in arguments you started, and living your absolute
            main character life while I sit here as your loyal supporting character. 🎂✨
          </p>

          <p style="font-size: 18px; margin-top: 28px; text-align: center; color: #c9a6ff;">
            <b>happy (almost) birthday, icon.</b><br/>go be insufferable, gorgeous 💫
          </p>
        </div>
      `,
    });

    res.status(200).send('Message has been sent');
  } catch (err) {
    console.error(err);
    res.status(500).send('Message could not be sent. Mailer Error: ' + err.message);
  }
};
