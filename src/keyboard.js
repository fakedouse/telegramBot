const { Markup, Extra, Composer, Router, Telegraf, Telegram, Stage, Context, BaseScene } = require('telegraf')

exports.setIKeyboard = ({ buttons }) => {
    for (button in buttons) {
        
    }
    Markup.inlineKeyboard(buttons).resize.extra()
}

exports.updIKeyboard = () => {

}

exports.getIKeyboard = () => {

}

exports.removeIKeyboard = () => {

}