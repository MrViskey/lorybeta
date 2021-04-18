const db = require("croxydb")
const dc = require("discord.js")

exports.run = async (client, message, args) => {
  let yedekler = await db.get(`y_${message.author.id}`)
  let sj;
  if(!yedekler) {
    sj = "Yedeğin Bulunmamakta"
    } else {
      sj = yedekler.map(x => `**${x.id}**\n${x.adı} (\`${x.tarih}\`)\n`)
      }
  let embed = new dc.MessageEmbed()
  .setTitle("📄 Yedek Listesi")
  .setColor("#DARKBLUE")
  .setTimestamp()
  .setThumbnail(message.author.avatarURL())
  .setDescription(sj)
   .setImage('https://media.discordapp.net/attachments/812003450241417336/812052399288090666/CBanner7.png')
  message.channel.send(embed)
  }

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'yedek-liste', 
  description: '',
  usage: ''
};