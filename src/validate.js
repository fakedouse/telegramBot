const { filthywords } = require('../dictionaries/badwords.json')

exports.filty = ctx => {
    if (ctx.message.text.split(/[^А-Яа-я]/).find(item => filthywords.includes(item.toLowerCase()))) {
        ctx.reply('Не матюкайтесь!')
        return false
    }
    return true
}