const Discord = require('discord.js');
const db = require("quick.db")
exports.run = async (client, message, args) => {
   try {
        if(!message.member.hasPermission("ADMINISTRATOR") && !message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot",client.user.avatarURL()).setColor("#DARKBLUR").setFooter("🔵 Celestial Tüm Hakları Gizlidir.").setDescription("<:arps:777142378225074207> **| Komutu Kullanmak için Yetkiniz Bulunmamaktadır **")) ;
     let kanal = message.mentions.channels.first()
     if(!kanal) return message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot",client.user.avatarURL()).setColor("#DARKBLUE").setDescription("<:arps:777142378225074207> **| Komutu Yanlış Kullandın Doğru Kullanımı : ?bilet-kurulum #kanal**").setFooter("🔵 Celestial Tüm Hakları Gizlidir."));

         const embed2 = new Discord.MessageEmbed().setAuthor("Celestial Bot",client.user.avatarURL()).setColor("#DARKBLUE")
     .setTitle("Celestial Bot Bilet Sistemi")
      .setDescription(`<:arp:777142378557341746> Bilet Kanalı ${kanal} Olarak Ayarlandı Ve Sistem Kuruldu.`)
      .setFooter("🔵 Celestial Tüm Hakları Gizlidir.")
     message.channel.send(embed2)
     
      const embed = new Discord.MessageEmbed().setAuthor("Celestial Bot",client.user.avatarURL()).setColor("#DARKBLUE")
     .setTitle("Celestial Bot Bilet Sistemi")
      .setDescription("Bileti Açmak İçin 🎟️ Tepkisine Tıklayınız.")
      .setFooter("🔵 Celestial Tüm Hakları Gizlidir.")
     kanal.send(embed).then(x => {
       x.react("🎟️")
     })
     db.set(`bilet.${message.guild.id}`,kanal.id)
   } catch{};
};
exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'bilet-kurulum', 
  description: '',
  usage: ''
}

