const Telegraf = require('telegraf');
const config = require('./config');
const bot = new Telegraf(config.api_token);
const l = require('debug')('bot:index')

const DORAMEON_STICKER_ID = 'CAADBAADAQADdwtpFSND93WMFuJKFgQ';
const DORAMEON_AUDIO_ID = 'CQADBAADeAYAAlgRAVCc_fdF2Qcv6hYE';

bot.use(Telegraf.log())

bot.catch((err) => {
  console.log('Ooops', err)
})

bot.telegram.getMe().then(async (bot_informations) => {
  console.log('botInfo: ', bot_informations);
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
  l('CHAT: ', ctx)
  bot.telegram.sendSticker(ctx.update.message.chat.id, DORAMEON_STICKER_ID, async () => {
    l('Sticker sent');
  });
  bot.telegram.sendAudio(ctx.update.message.chat.id, DORAMEON_AUDIO_ID, async () => {
    l('Audio sent');
  });
  await ctx.reply('TOY DORAMION')
})