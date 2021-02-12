const nodemailer = require('nodemailer');
const ejs = require('ejs');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD,
    },
});

/**
 * Sends email reminders to attendees given information about the yoga class
 * and an array of the clients' emails.
 *
 * @param {{className : string, startTime : DateTime}} classInfo Information about the class.
 * @param {string[]} clientEmails Array of the clients' emails.
 */
async function sendReminders(classInfo, clientEmails){
    await ejs.renderFile("../views/emailTemplates/reminderEmail.ejs", {
        classInfo : classInfo
    }, async function(err, data){
        if (err){
            console.error(err, "ejs email template failed to render");
        }
        else {
            transporter.sendMail({
                from: '"OG YOGA" ' + process.env.SENDER_EMAIL,
                to: process.env.SENDER_EMAIL,
                bcc: clientEmails,
                subject: TODO,
                html: data
            }, async function(err, data){
                if (err) {
                    console.error(err, "Email failed");
                }
                else {
                    console.log("Email sent");
                }
            });
        }
    });
};


module.exports = {
    sendReminders
};
