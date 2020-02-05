const nodemailer = require('nodemailer')
const fs = require('fs')
const path = require('path')
// const config = require('../../config')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL, // generated ethereal user
    pass: process.env.EMAIL_PASS, // generated ethereal password
  },
})

async function sendMail({
  to,
  subject,
  template,
  attachments,
}) {
  try {
    await transporter.sendMail({
      from: 'Move on Flow ✔',
      to,
      subject,
      html: template,
      attachments,
    })
  } catch (e) {
    console.log(e)
  }
}

function sendVerifyAccountMail({ verifyLink, email }) {
  const verifyAccountTemplate = fs.readFileSync(path.resolve(__dirname, 'templates/verifyMail.html'), { encoding: 'utf8' }).replace('##VERIFY_LINK##', verifyLink)
  const pathImage = path.resolve(__dirname, 'templates/images')
  sendMail({
    to: email || 'toantnweb@gmail.com',
    subject: 'Thank you for verifing your email',
    template: verifyAccountTemplate,
    attachments: [
      {
        filename: 'reminder-hero-graph.png',
        path: `${pathImage}/reminder-hero-graph.png`,
        cid: 'reminder-hero-graph.png',
      },
      {
        filename: 'bg-shade.jpg',
        path: `${pathImage}/bg-shade.jpg`,
        cid: 'bg-shade.jpg',
      },
    ],
  })
}

module.exports = {
  sendMail,
  sendVerifyAccountMail,
}
