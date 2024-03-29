const nodemailer = require('nodemailer');
const jobsModel = require('../app/models/jobsModel');
const ejs = require('ejs');
const path = require('path');
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
 * @param {{class_name : string, scheduled_time : DateTime}} classInfo Information about the class.
 * @param {string[]} clientEmails Array of the clients' emails.
 */
async function sendReminders(classInfo, clientEmails){
    await ejs.renderFile(path.join(__dirname, '..', 'app/views/emailTemplates/reminderEmail.ejs'), {
        classInfo : classInfo
    }, async function(err, data){
        if (err){
            console.error(err, "ejs email template failed to render");
        }
        else {
            console.log("Sending email reminder for class '" + classInfo.class_name + "'.");
            transporter.sendMail({
                from: '"OG YOGA" ' + process.env.SENDER_EMAIL,
                to: process.env.SENDER_EMAIL,
                bcc: clientEmails,
                subject: 'OG Yoga: Your class "' + classInfo.class_name + '" is starting soon!',
                html: data
            }, async function(err, data){
                if (err) {
                    jobsModel.updateById(classInfo.id, {status: "FAIL"});
                    console.error(err, "Email failed");
                }
                else {
                    jobsModel.updateById(classInfo.id, {status: "SUCCESS"});
                    console.log("Email sent");
                }
            });
        }
    });
};


module.exports = {
    sendReminders
};
