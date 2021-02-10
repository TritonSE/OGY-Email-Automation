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
 * and an array of the attendees' information. 
 * 
 * @param {Object} classInfo Information about the class.
 * @param {string} classInfo.className Name of the Yoga class.
 * @param {string} classInfo.startTime Time that the class starts.
 * 
 * @param {{firstName : string, lastName : string, email : string}[]} clients Information about the client.
 */
async function sendEmails(classInfo, clients){
    clients.map(async function(client){
        await ejs.renderFile("../views/email_template.ejs",{
            firstName : client.firstName,
            lastName : client.lastName,
            className : classInfo.className,
            startTime : classInfo.startTime
        }, async function(err, data){
            if (err){
                console.error(err, "ejs email template failed to render");
            }
            else {
                transporter.sendMail({
                    from: '"OG YOGA" ' + process.env.SENDER_EMAIL,
                    to: client.email,
                    subject: "Upcoming " + classInfo.className + " Class",
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
    });
};


module.exports = {
    sendEmails
};