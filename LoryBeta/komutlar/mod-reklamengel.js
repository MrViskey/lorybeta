const Discord = require('discord.js');
const db = require("quick.db")
exports.run = async (client, message, args) => {
   try {
      if(!message.member.hasPermission("ADMINISTRATOR") && !message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot",client.user.avatarURL()).setColor("#DARKBLUE").setFooter("🔵 Celestial Tüm Hakları Gizlidir.").setDescription("<:arps:777142378225074207> **| Komutu Kullanmak İçin Yetkiniz Bulunmamaktadır.**")) ;
  
  if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot",client.user.avatarURL()).setColor("#DARKBLUE").setFooter("🔵 Celestial Tüm Hakları Gizlidir.").setDescription("<:arps:777142378225074207> **| Komutu Yanlış Kullandın Doğru Kullanımı : ?reklamengel hepsi/kanal/kapat**"));
 
  if(args[0] === "hepsi") {
       message.guild.channels.cache.forEach(k => {
  db.delete(`reklamengel.${k.id}.${message.guild.id}`)   
   })
   message.guild.channels.cache.forEach(k => {
  db.set(`reklamengel.${k.id}.${message.guild.id}`,true)   
   })
 message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot", client.user.avatarURL()).setColor("#DARKBLUE").setFooter("🔵 Celestial Tüm Hakları Gizlidir.").setDescription(`<:arp:777142378557341746> **| Reklam Engelleme Sistemi Tüm Kanallar İçin Açıldı**`))

  }
  if(args[0] === "kanal") {
    message.guild.channels.cache.forEach(k => {
  db.delete(`reklamengel.${k.id}.${message.guild.id}`)   
   })
         var kanal = message.mentions.channels.first()
         if(!kanal) return message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot",client.user.avatarURL()).setColor("#DARKBLUE").setDescription("<:arps:777142378225074207> **| Komutu Yanlış Kullandın Doğru Kullanımı : ?reklamengel kanal #kanal**").setFooter("🔵 Celestial Tüm Hakları Gizlidir."));
      if(kanal) {
     db.set(`reklamengel.${kanal.id}.${message.guild.id}`,true)   
  message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot", client.user.avatarURL()).setColor("#DARKBLUE").setFooter("🔵 Celestial Tüm Hakları Gizlidir.").setDescription(`<:arp:777142378557341746> **| Reklam Engelleme Sistemi Sadece ${kanal} İçin Açıldı**`))

      }
    }
  if(args[0] === "kapat") {
    message.guild.channels.cache.forEach(k => {
  db.delete(`reklamengel.${k.id}.${message.guild.id}`)   
   })
  message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot", client.user.avatarURL()).setColor("#DARKBLUE").setFooter("🔵 Celestial Tüm Hakları Gizlidir.").setDescription(`<:arp:777142378557341746> **| Reklam Engel Sistemi Başarıyla Kapatıldı**`))

  }
   }catch{}
};

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'reklamengel', 
  description: '',
  usage: ''
};