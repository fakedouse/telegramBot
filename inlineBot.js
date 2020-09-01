require('dotenv').config()
const { Telegraf } = require('telegraf')
const bot = new Telegraf(process.env.INLINE_BOT_TOKEN)

bot.on('inline_query', ctx => {
    ctx.answerInlineQuery([{
        type: 'article',
        id: '1',
        title: `Hey! You`,
        input_message_content: {
            message_text: "Hey ho!"
        }
    }])
})


bot.launch()