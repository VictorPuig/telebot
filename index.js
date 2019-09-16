const Telegraf = require('telegraf')
const config = require('./config')
const bot = new Telegraf(config.api_token)

const l = require('debug')('bot:index')

bot.use(Telegraf.log())

bot.catch((err) => {
  console.log('Ooops', err)
})

bot.telegram.getMe().then(async (bot_informations) => {
  console.log(bot_informations);
  process.on('SIGINT', async function () {
    l('Stoping message polling')
    await new Promise(function (resolve, reject) {
      bot.stop(resolve)
    })

    l('Good bye!')
    process.exit()
  })
  l('Start message polling')
  bot.startPolling()
})

bot.start((ctx) => {
  l('Started')
})

bot.command('/talk', async (ctx) => {
  l('/talk')
  await ctx.reply('TOY DORAMION')
})