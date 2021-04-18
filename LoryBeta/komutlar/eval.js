const
    Discord = require('discord.js'),
    moment = require('moment'),
    util = require(`util`)

moment.locale('tr')
exports.run = async (client, message, args) => {

    if (!["483387292447145991","789164345585565706","813133125836079134"].includes(message.author.id))//eval kullanack kişilerin id'lerini girin
    return message.reply("`code` komutunu kullanmak için gerekli izne sahip değilsiniz!").catch();

       
    if (args[0] === "process.env.TOKEN" || args[0] === "client.token") return;
            try {
                let toEval = args.join(" ");
                let evaluated = eval(toEval);
                if (!toEval) return message.channel.send("```Command is ready!```").catch();
                evaluated = util.inspect(evaluated);
                for (let i = 0; i < evaluated.length; i += 2000) {
                    let hrstart = process.hrtime();
                    let hrDiff;
                    hrDiff = process.hrtime(hrstart);
                    const toSend = evaluated.substring(i, Math.min(evaluated.length, i + 2000));
                    return message.channel.send(`_Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ""}${hrDiff[1] / 1000000}ms._ ` + "```js\n" + toSend + "\n```").catch();
            }
        } catch (err) {
            let hrstart = process.hrtime();
            let hrDiff;
            hrDiff = process.hrtime(hrstart);
            message.channel.send(`_Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ""}${hrDiff[1] / 1000000}ms._ \`\`\`xl\n${err}\n\`\`\``).catch();

}


};

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ["e"],
  permLevel: 0
};

exports.help = {
  name: 'eval', 
  description: '',
  usage: ''
};

