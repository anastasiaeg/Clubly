var nodemailer = require('nodemailer');
var secrets = require('../../config');

var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: secrets.email,
        pass: secrets.pass
    }
});

sendEmail = function (host, email, confirmHash) {
    var link = "http://" + host + "/api/auth/verify?email=" + encodeURI(email) + "&hash=" + encodeURI(confirmHash);
    mailOptions = {
        to: email,
        subject: "Please confirm your Email account",
        html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
    }
    smtpTransport.sendMail(mailOptions, function (error) {
        if (error) {
            res.status(400).json({
                error: 'Error sending verification email'
            });
        } else {
            res.status(200).json({
                data: {
                    user: result.rows[0]
                }
            });
        }
    });
}

module.exports = {
    sendEmail: sendEmail
}