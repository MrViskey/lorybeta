const Discord = require('discord.js');
const db = require("quick.db")
exports.run = async (client, message, args) => {
  try {
      if(!message.member.hasPermission("ADMINISTRATOR") && !message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot",client.user.avatarURL()).setColor("#DARKBLUE").setFooter("🔵 Celestial Tüm Hakları Gizlidir.").setDescription("<:arps:777142378225074207> **| Komutu Kullanmak için Yetkiniz Bulunmamaktadır **")) ;

  if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot",client.user.avatarURL()).setColor("#DARKBLUE").setFooter("🔵 Celestial Tüm Hakları Gizlidir.").setDescription("<:arps:777142378225074207> **| Komutu Yanlış Kullandın Doğru Kullanımı : ?mod-log ayarla/sıfırla**")) ;
 
  if(args[0] === "ayarla") {
    let kanal = message.mentions.channels.first()
         if(!kanal) return message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot",client.user.avatarURL()).setColor("#DARKBLUE").setDescription("<:arps:777142378225074207> **| Komutu Yanlış Kullandın Doğru Kullanımı : ?mod-log ayarla #kanal**").setFooter("🔵 Celestial Tüm Hakları Gizlidir."));
    if(kanal) {
   db.set(`logKanal_${message.guild.id}`,kanal.id)
    message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot", client.user.avatarURL()).setColor("#DARKBLUE").setFooter("🔵 Celestial Tüm Hakları Gizlidir.").setDescription(`<:arp:777142378557341746> **| MOD-LOG Sistemi Başarıyla Açıldı**`))
    }
    }
  
   if(args[0] === "sıfırla") {
    db.delete(`logKanal_${message.guild.id}`)
    message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot", client.user.avatarURL()).setColor("#DARKBLUE").setFooter("🔵 Celestial Tüm Hakları Gizlidir.").setDescription(`<:arp:777142378557341746> **| MOD-LOG Sistemi Başarıyla Kapatıldı**`))
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
  name: 'mod-log', 
  description: '',
  usage: ''
};