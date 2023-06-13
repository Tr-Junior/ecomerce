const transporter = require('nodemailer').createTransport(require('../config/email'));
const { api: link } = require('../config/index');

module.exports = ({ user, recovery }, cb) => {
    const message = `
    <h1 style="text-align: center;">Recuperação de Senha</h1>
    <br />
    <p>
        Aqui está o link para redefinir sua senha. Acesse-o e digite sua nova senha:
    </p>
    <a href="${link}/v1/api/user/recovered-password?token=${recovery.token}">
        ${link}/v1/api/user/recovered-password?token=${recovery.token}
    </a>
    <br /><br /><hr />
    <p>
        Obs.: Se você não solicitou a redefinição, apenas ignore este email.
    </p>
    <br />
    <p>Atenciosamente, Loja TI</p>
  `;

    const optionEmail = {
        from: 'tarcisioosicrat@gmail.com',
        to: user.email,
        subject: 'Redefinição de senha',
        html: message
    };

    if (process.env.NODE_ENV === 'production') {
        transporter.sendMail(optionEmail, (error, info) => {
            if (error) {
                console.log(error);
                return cb('Aconteceu um erro no envio do email, tente novamente.');
            } else {
                return cb(null, 'Link para redefinição de senha enviado com sucesso para o seu email.');
            }
        });
    } else {
        console.log(optionEmail);
        return cb(null, 'Link para redefinição de senha enviado com sucesso para o seu email.');
    }
};
