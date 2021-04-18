const Discord = require('discord.js');
const db = require("quick.db")
exports.run = async (client, message, args) => {
  try {
      if(!message.member.hasPermission("ADMINISTRATOR") && !message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot",client.user.avatarURL()).setColor("#DARKBLUE").setFooter("🔵 Celestial Tüm Hakları Gizlidir.").setDescription("<:arps:777142378225074207> **| Komutu Kullanmak İçin Yetkiniz Bulunmamaktadır.**")) ;

  if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot",client.user.avatarURL()).setColor("#DARKBLUE").setFooter("🔵 Celestial Tüm Hakları Gizlidir.").setDescription("<:arps:777142378225074207> **| Komutu Yanlış Kullandın Doğru Kullanımı : ?spamengel aç/kapat**")) ;
 
  if(args[0] === "aç") {
    db.set(`spamengel.${message.guild.id}`,"acik")
    message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot", client.user.avatarURL()).setColor("#DARKBLUE").setFooter("🔵 Celestial Tüm Hakları Gizlidir.").setDescription(`<:arp:777142378557341746> **| Spam Engel Başarıyla Açıldı**`))
  }
  
   if(args[0] === "kapat") {
    db.set(`spamengel.${message.guild.id}`,"kapali")
    message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot", client.user.avatarURL()).setColor("#DARKBLUE").setFooter("🔵 Celestial Tüm Hakları Gizlidir.").setDescription(`<:arp:777142378557341746> **| Spam Engel Başarıyla Kapatıldı**`))
  }
  }catch{};
   };
exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'spamengel', 
  description: '',
  usage: ''
};