const Discord = require('discord.js');
const db = require("quick.db")
exports.run = async (client, message, args) => {

   try {
  

          message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot", client.user.avatarURL()).setColor("#DARKBLUE").setFooter("🔵 Celestial Tüm Hakları Gizlidir.").setImage("https://cdn.discordapp.com/emojis/712616118384197682.gif?v=1")).then(msg => {
              setTimeout(() => {
         msg.edit(new Discord.MessageEmbed().setAuthor("Celestial Bot", client.user.avatarURL()).setColor("#DARKBLUE").setFooter("🔵 Celestial Tüm Hakları Gizlidir.").setDescription(`**Botun Pingi ${Math.round(client.ws.ping)}'ms'dir**`))
    
        msg.react("722343161615089715")
        msg.react("722343161707495505")
         },4000)
  })
   }catch{}
};

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ["ping"],
  permLevel: 0
};

exports.help = {
  name: 'ping', 
  description: '',
  usage: ''
};

