const Discord = require('discord.js');


exports.run = async (client, message) => {

if (message.author.id == "761281964107628546" || message.author.id == "483387292447145991") {
  message.channel.send("Bot yeniden başlatılıyor! :wave:").then(a => {
       process.exit(0)

  })

}
};

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'reboot', 
  description: 'Botu yeniden başlatır',
  usage: 'reboot'
};