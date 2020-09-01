require('dotenv').config()

const { Telegraf, Markup, Extra, Stage, session } = require('telegraf')
const commands = require('./src/commands')
const actions = require('./src/actions')
const validate = require('./src/validate')
const bot = new Telegraf(process.env.BOT_TOKEN)
const stage = new Stage()


bot.use(session()) 
bot.use(stage.middleware())

commands.middleware(bot)
actions.middleware(bot)


bot.use((ctx, next) => {
    console.log(`Пишет ${ctx.from.username}\n"${ctx.message.text}"`)
    next()
})


bot.on('sticker', (ctx) => ctx.reply('👍'))

bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.hears('Привет', (ctx) => ctx.reply(`Привет ${ctx.from.first_name}!`))

bot.on('text', async ctx => {
    if(validate.filty(ctx)) await ctx.reply("Ага ;)")
})

// обработка ошибок
bot.catch((err, ctx) => {
    console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
    ctx.reply("Error!!!")
})


bot.launch() // запуск бота



// bot.command('pyramid', (ctx) => {
//     return ctx.reply('Keyboard wrap', Extra.markup(
//         Markup.keyboard(['one', 'two', 'three', 'four', 'five', 'six'], {
//             wrap: (btn, index, currentRow) => currentRow.length >= (index + 1) / 2
//         })
//     ))
// })

// bot.command('simple', (ctx) => {
//     return ctx.replyWithHTML('<b>Coke</b> or <i>Pepsi?</i>', Extra.markup(
//         Markup.keyboard(['Coke', 'Pepsi'])
//     ))
// })

// const keyboard = Markup.inlineKeyboard([
//     Markup.urlButton('❤️', 'http://telegraf.js.org'),
//     Markup.callbackButton('Delete', 'delete')
// ])

// // bot.start((ctx) => ctx.reply('Hello', Extra.markup(keyboard)))
// // bot.action('delete', ({
// //     deleteMessage
// // }) => deleteMessage())

// // bot.start((ctx) => ctx.reply(`Deep link payload: ${ctx.startPayload}`))
// // bot.help((ctx) => ctx.reply('Help message'))
// // bot.on('message', (ctx) => ctx.telegram.sendCopy(ctx.chat.id, ctx.message, Extra.markup(keyboard)))
// // bot.action('delete', ({
// //     deleteMessage
// // }) => deleteMessage())
// function sendLiveLocation(ctx) {
//     let lat = 42.0
//     let lon = 42.0
//     ctx.replyWithLocation(lat, lon, {
//         live_period: 60
//     }).then((message) => {
//         const timer = setInterval(() => {
//             lat += Math.random() * 0.001
//             lon += Math.random() * 0.001
//             ctx.telegram.editMessageLiveLocation(lat, lon, message.chat.id, message.message_id).catch(() => clearInterval(timer))
//         }, 1000)
//     })
// }
// bot.start(sendLiveLocation)

// const keyboard = Markup.keyboard([
//     Markup.pollRequestButton('Create poll', 'regular'),
//     Markup.pollRequestButton('Create quiz', 'quiz')
// ])

// bot.on('poll', (ctx) => console.log('Poll update', ctx.poll))
// bot.on('poll_answer', (ctx) => console.log('Poll answer', ctx.pollAnswer))

// bot.start((ctx) => ctx.reply('supported commands: /poll /quiz', Extra.markup(keyboard)))

// bot.command('poll', (ctx) =>
//     ctx.replyWithPoll(
//         'Your favorite math constant',
//         ['x', 'e', 'π', 'φ', 'γ'], {
//             is_anonymous: false
//         }
//     )
// )
// bot.command('quiz', (ctx) =>
//     ctx.replyWithQuiz(
//         '2b|!2b',
//         ['True', 'False'], {
//             correct_option_id: 0
//         }
//     )
// )

// bot.command('special', (ctx) => {
//     return ctx.reply('Special buttons keyboard', Extra.markup((markup) => {
//         return markup.resize()
//             .keyboard([
//                 markup.contactRequestButton('Send contact'),
//                 markup.locationRequestButton('Send location')
//             ])
//     }))
// })

// bot.command('random', (ctx) => {
//     return ctx.reply('random example',
//         Markup.inlineKeyboard([
//             Markup.callbackButton('Coke', 'Coke'),
//             Markup.callbackButton('Dr Pepper', 'Dr Pepper', Math.random() > 0.5),
//             Markup.callbackButton('Pepsi', 'Pepsi')
//         ]).extra()
//     )
// })

// bot.command('caption', (ctx) => {
//     return ctx.replyWithPhoto({
//             url: 'https://picsum.photos/200/300/?random'
//         },
//         Extra.load({
//             caption: 'Caption'
//         })
//         .markdown()
//         .markup((m) =>
//             m.inlineKeyboard([
//                 m.callbackButton('Plain', 'plain'),
//                 m.callbackButton('Italic', 'italic')
//             ])
//         )
//     )
// })

// bot.hears(/\/wrap (\d+)/, (ctx) => {
//     return ctx.reply('Keyboard wrap', Extra.markup(
//         Markup.keyboard(['one', 'two', 'three', 'four', 'five', 'six'], {
//             columns: parseInt(ctx.match[1])
//         })
//     ))
// })

// bot.action('plain', async (ctx) => {
//     await ctx.answerCbQuery()
//     await ctx.editMessageCaption('Caption', Markup.inlineKeyboard([
//         Markup.callbackButton('Plain', 'plain'),
//         Markup.callbackButton('Italic', 'italic')
//     ]))
// })

// bot.action('italic', async (ctx) => {
//     await ctx.answerCbQuery()
//     await ctx.editMessageCaption('_Caption_', Extra.markdown().markup(Markup.inlineKeyboard([
//         Markup.callbackButton('Plain', 'plain'),
//         Markup.callbackButton('* Italic *', 'italic')
//     ])))
// })



// const Telegraf = require('telegraf')
// const Composer = require('telegraf/composer')
// const session = require('telegraf/session')
// const Stage = require('telegraf/stage')
// const Markup = require('telegraf/markup')
// const WizardScene = require('telegraf/scenes/wizard')

// const stepHandler = new Composer()
// stepHandler.action('next', (ctx) => {
//     ctx.reply('Step 2. Via inline button')
//     return ctx.wizard.next()
// })
// stepHandler.command('next', (ctx) => {
//     ctx.reply('Step 2. Via command')
//     return ctx.wizard.next()
// })
// stepHandler.use((ctx) => ctx.replyWithMarkdown('Press `Next` button or type /next'))

// const superWizard = new WizardScene('super-wizard',
//     (ctx) => {
//         ctx.reply('Step 1', Markup.inlineKeyboard([
//             Markup.urlButton('❤️', 'http://telegraf.js.org'),
//             Markup.callbackButton('➡️ Next', 'next')
//         ]).extra())
//         return ctx.wizard.next()
//     },
//     stepHandler,
//     (ctx) => {
//         ctx.reply('Step 3')
//         return ctx.wizard.next()
//     },
//     (ctx) => {
//         ctx.reply('Step 4')
//         return ctx.wizard.next()
//     },
//     (ctx) => {
//         ctx.reply('Done')
//         return ctx.scene.leave()
//     }
// )

// const bot = new Telegraf(process.env.BOT_TOKEN)
// const stage = new Stage([superWizard], {
//     default: 'super-wizard'
// })
// bot.use(session())
// bot.use(stage.middleware())
// bot.launch()
// const Telegraf = require('telegraf')
// const Extra = require('telegraf/extra')
// const fs = require('fs')

// const AnimationUrl1 = 'https://media.giphy.com/media/ya4eevXU490Iw/giphy.gif'
// const AnimationUrl2 = 'https://media.giphy.com/media/LrmU6jXIjwziE/giphy.gif'

// const bot = new Telegraf(process.env.BOT_TOKEN)

// bot.command('pipe', (ctx) => ctx.replyWithPhoto({
//     url: 'https://picsum.photos/200/300/?random'
// }))
// bot.command('url', (ctx) => ctx.replyWithPhoto('https://picsum.photos/200/300/?random'))
// bot.command('animation', (ctx) => ctx.replyWithAnimation(AnimationUrl1))
// bot.command('pipe_animation', (ctx) => ctx.replyWithAnimation({
//     url: AnimationUrl1
// }))

// bot.command('caption', (ctx) => ctx.replyWithPhoto(
//     'https://picsum.photos/200/300/?random',
//     Extra.caption('Caption *text*').markdown()
// ))

// bot.command('album', (ctx) => {
//     ctx.replyWithMediaGroup([
//         {
//             media: 'https://picsum.photos/200/500/',
//             caption: 'From URL',
//             type: 'photo'
//         },
//         {
//             media: {
//                 url: 'https://picsum.photos/200/300/?random'
//             },
//             caption: 'Piped from URL',
//             type: 'photo'
//         }
//     ])
// })

// bot.command('edit_media', (ctx) => ctx.replyWithAnimation(AnimationUrl1, Extra.markup((m) =>
//     m.inlineKeyboard([
//         m.callbackButton('Change media', 'swap_media')
//     ])
// )))

// bot.action('swap_media', (ctx) => ctx.editMessageMedia({
//     type: 'animation',
//     media: AnimationUrl2
// }))
