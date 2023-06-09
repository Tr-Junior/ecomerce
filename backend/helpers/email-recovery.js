const transporter = require('nodemailer').createTransport(require('../config/email'));
const { root: link } = require('../config/index');


module.exports = ({ user, recovery }, cb) => {
    const messase = `
    <h1 style="text-align: center;">Recuperacao de Senha</h1>
    <br />
    <p>
        Aqui está o link para redefinir a sua senha. Acesse ele e digite sua nova senha:
    </p>
    <a href="${link}/v1/api/usuarios/senha-recuperada?token=${recovery.token}">
        ${link}/v1/api/usuarios/senha-recuperada?token=${recovery.token}
    </a>
    <br /><br /><hr />
    <p>
        Obs.: Se você não solicitou a redefinicao, apenas ignore esse email.
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
                return cb(null, 'Link para redefinição de senha enviado com sucesso para o seu email');
            }
        });
    } else {
        console.log(optionEmail);
        return cb(null, 'Link para redefinição de senha enviado com sucesso para o seu email');
    }
}