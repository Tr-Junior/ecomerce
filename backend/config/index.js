module.exports = {
    secret: process.env.NODE_ENV === "production" ? process.env.SECRET : 'askl;djf56)(#$sd4fasd 564a@#*($&@#(*&$sdf a6s54dfs@#*$&df68 %&@#(*&#@$SDSDFF',
    api: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000',
    loja: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000',
    sendgridKey: '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',

}