const db = require("croxydb")
const dc = require("discord.js")
const backup = require("discord-backup")

exports.run = async (client, message, args) => {
  let backupID = args[0]
  let a = db.get(`yedek_${backupID}`)
  if(a === message.author.id) {
  let embed = new dc.MessageEmbed()
  .setTitle("<:arp:777142378557341746> **| Başarılı**")
  .setColor("#DARKBLUE")
  .setDescription("<:arp:777142378557341746> **| Yedeğiniz Bağarıyla Silindi.**")
  .setTimestamp()
  .setThumbnail(message.author.avatarURL())
  message.channel.send(embed)
  backup.remove(backupID)
  db.delete(`yedek_${backupID}`)
  db.delete(`toplam_${message.author.id}`, 1)
  db.set(`y_${message.author.id}`, db.get(`y_${message.author.id}`).filter(z => z.id !== backupID))
  } else {
    message.channel.send("<:arps:777142378225074207> **| Böyle Bir Yedeğin Yok.**")
    }
  }

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'yedek-sil', 
  description: '',
  usage: ''
};