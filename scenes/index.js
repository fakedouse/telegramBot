import { Stage, BaseScene } from 'telegraf'
const stage = new Stage

export default (bot) => {

    bot.use(session())
    bot.use(stage.middleware())
    bot.command('greeter', (ctx) => ctx.scene.enter('greeter'))
    bot.startPolling()
    
    function simpleScene() {
        const scene = new BaseScene('simple')
        scene.enter(async ctx => {
            await ctx.answerInlineQuery([
                {
                    type: 'article',
                    id: '1',
                    title: "Hey!",
                    input_message_content: {
                        message_text: "Hey ho!"
                    }
                },
                {
                    type: 'article',
                    id: '2',
                    title: "Привет",
                    input_message_content: {
                        message_text: "Привет-привет!!"
                    }
                },
            ])
        })
        scene.on("text", async ctx => {
            
        })
        scene.on("message", async ctx => {
            await ctx.replyWithHTML("<b>Посмотрим, что тут у нас..</b>")
        })
    }
}