const { Markup } = require('telegraf')
const { DateTime: DT } = require('luxon')

const calendarInline = async (ctx, date = DT.local().toLocaleString()) => {

    
    date = date.split('-') && DT.local().set({
        year: date[0],
        month: date[1],
        day: date[2]
    })
    
    // getCalendarKeyboard(date, events)
    
    const daysButtons = [ [] ]


    for (let i = 0; i <= date.daysInMonth; i++) {
        if (i % 7 == 0) daysButtons.push([])

        daysButtons[daysButtons.length - 1].push(Markup.callbackButton(date.plus({days:i}).day, `${date.plus({days:i}).day}_${date.plus({days:i}).month}`))
    }
    daysButtons.push([
        Markup.callbackButton('Пред', `prevmonth`),
        Markup.callbackButton('След', `nextmonth`)
    ])
    return await ctx.reply(ctx.match, Markup.inlineKeyboard(daysButtons).extra())
}

function getCalendarKeyboard(date, events) {
    const daysButtons = [
        []
    ]

    for (let i = 0; i <= date.daysInMonth; i++) {
        if (i % 7 == 0) daysButtons.push([])

        daysButtons[daysButtons.length - 1].push(Markup.callbackButton(date.plus({
            days: i
        }).day, `${date.plus({days:i}).day}_${date.plus({days:i}).month}`))
    }
    daysButtons.push([
        Markup.callbackButton('Пред', `prevmonth`),
        Markup.callbackButton('След', `nextmonth`)
    ])
    return Markup.inlineKeyboard(daysButtons).extra()
}


module.exports = calendarInline

