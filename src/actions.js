exports.middleware = bot => {
    bot.action(/.+/, (ctx) => {
    return ctx.answerCbQuery(`Oh, ${ctx.match[0]}! Great choice`)
})
}
