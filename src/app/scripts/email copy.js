var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport')
var async = require('async');


const enviarEmail = (nome, email, regiao, id_user) => {
    var transporter = nodemailer.createTransport(smtpTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: 'dijounas@gmail.com',
            pass: "220303mat"
        }
    }))


    var EmailTemplate = require('email-templates').EmailTemplate;
    var path = require("path");


    var templateDir = path.join(__dirname, "../", "views", 'email');

    var confirmEmail = new EmailTemplate(templateDir);

    var users = [
        { name: nome, email: email, locale: regiao },
        // { name: "Lucas Coelho", pasta: "pingoben10gamer@gmail.com", locale: "en-us" }
    ]

    async.each(users, (user, next) => {
        // render the en-us localized template:
        // console.log(id_user);
        
        confirmEmail.render({
            user: user,
            siteName: "Rivals Tournament",
            id_user: id_user
        }, user.locale, (err, result) => {
            if (err) return next(err);
            else {
                //valores =>{html,text,subject}
                console.log("Result>" + result.text);
                var mailOptions = {
                    from: '"Rivals Tournament" <dijounas@gmail.com>', // sender address
                    to: user.email,
                    subject: 'Confirmar E-Mail', // Subject line
                    text: result.text, // plaintext body
                    html: result.html, // html body
                    // attachments: [{
                    //     filename: 'image.png',
                    //     path: templateDir + "/pt-br/image.png",
                    //     cid: 'nique@kreata.ee'
                    // }]
                };

                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        return console.log("Erro ao enviar: " + err);
                    }
                    console.log("E-Mail Enviado: " + info.response);

                    next();

                })
            }

        })
    }, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Email enviado com sucesso");
        }
    })
}

// enviarEmail("Matheus", "matheussimoes2203@gmail.com", 'pt-br');
module.exports = {
    enviarEmail
};