const {Extra, Markup} = require('telegraf')
const calendar = require('./calendar')

exports.middleware = (bot) => {
bot.start(async (ctx) => {
    await ctx.reply(`
        Привет ${ctx.from.first_name}!\nПопробуй начать со / (слеша)
    `)
    // const ForwardMessage = await ctx.tg.forwardMessage(ctx.chat.id)
    // console.log(`Forward message: ${ForwardMessage}`)

    const ChatId = ctx.chat.id
    console.log(`Chat_Id: ${ChatId}`)
})

bot.help(async ctx => await ctx.replyWithHTML(
    `
<b>Команды:</b>
/search<pre>[-e|m|d]</pre> -- поиск события, встречи, поиск по дате. Подробнее: /help_search
/add<pre>[-e|m|d]</pre> -- добавить. Подробнее: /help_add
/upd<pre>[-e|m|d]</pre> -- обновить. Подробнее: /help_upd
/calen -- смотреть календарь. Подробнее: /help_calen
/settings -- Настройки помощника
    `
))

bot.settings(({
    reply
}) => {
    reply('One time keyboard', Markup
        .keyboard(['/theme', '/inline', '/prenotice'])
        .oneTime()
        .resize()
        .extra()
    )
})

bot.command('help_search', async ctx => await ctx.replyWithHTML(
    `
/search <code>&lt;name&gt;</code> --поиск по названию "name"
по всем спискам

/search [-flag] &lt;name|date&gt; [time] -- добавление флага определяет опцию поиска, флаги можно совмещать. Например, команда "/search -e birthday " будет искать событие с названием "
birthday ", а команда " /search -em birthday " -- будет искать и событие, и встречу "
birthday "
Доступные флаги:
    -e -- поиск события по названию
    -m -- поиск встречи по названию
    -d &lt;dd.mm.yy[yy]&gt; -- поиск по дате, можно указать несколько дат через пробел, либо интервал через тире, либо несколько интервалов через пробел. Указание в формате ".mm.yy" аналогично интервалу "01.mm.yy-31.mm.yy". То же самое и с "dd..yy" и "dd.mm."
    -t &lt;hh:mm&gt;-- поиск по времени, можно указать несколько позиций через пробел, либо интервал через тире, либо несколько интервалов через пробел. Указание в формате "hh:" аналогично интервалу "hh:00-hh:59". Поминутный поиск не реализован.
    `
))

bot.command('help_add', async ctx => await ctx.replyWithHTML(
    `
/add [-flag] &lt;name&gt; &lt;date&gt; [time] -- добавить событие, встречу, условие. Флаг определяет опцию добавления, флаги можно совмещать.
    -e -- добавить событие
    -m -- добавить встречу
    -c -- добавить условие
    `
))

bot.command('help_upd', async ctx => await ctx.replyWithHTML(
    `
/upd [-flag] &lt;name&gt;[:rename] [date] [time]-- обновить событие встречу или условие. Флаг определяет опцию, флаги можно совмещать.
    -e -- обновить событие
    -m -- обновить встречу
    -с -- обновить условие
    `
))

bot.command('help_calen', async ctx => await ctx.replyWithHTML(
    `
/calen -- показать календарь
    `
))

bot.command('search', async ctx => await ctx.reply('Не реализовано еще 🟥'))
bot.command('add', async ctx => await ctx.reply('Не реализовано еще 🧧'))
bot.command('upd', async ctx => await ctx.reply('Не реализовано еще'))

bot.hears('/calen', async ctx => await calendar(ctx))

bot.hears(/\/calen ((\d{0,2})\.(\d{0,2}).(\d{0,4}))/, async ctx => await calendar(ctx, `${ctx.match[4]}-${ctx.match[3]}-${ctx.match[2]}`))

bot.hears(/\/calen (.+)/, async ctx => await ctx.reply('Неверный формат даты. Помощь по команде /help_calen'))

// Заглушка на неизвестные команды
bot.hears(/\/(.+)?/, async ctx => await ctx.reply('Нет такой команды что ли'))

}