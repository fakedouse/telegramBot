const { }

module.exports = (bot, ctx) => {

    bot.use(session())
    bot.use(stage.middleware())
    bot.command('greeter', (ctx) => ctx.scene.enter('greeter'))
    bot.startPolling()
    
}