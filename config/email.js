const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    transport: "SMTP",
    host: "smtp.gmail.com",
    secureConnection: false,
    port: 587,
    requiresAuth: true,
    domains: ["gmail.com", "googlemail.com"],
    auth:{
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
})

module.exports = {transporter}