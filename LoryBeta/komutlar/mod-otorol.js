const Discord = require('discord.js');
const db = require("quick.db")
const  stringSimilarity = require("string-similarity");
exports.run = async (client, message, args) => {
   try {
      if(!message.member.hasPermission("ADMINISTRATOR") && !message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot",client.user.avatarURL()).setColor("#DARKBLUE").setFooter("🔵 Celestial Tüm Hakları Gizlidir.").setDescription("<:arps:777142378225074207> **| Komutu Kullanmak İçin Yetkiniz Bulunmamaktadır.**")) ;
  
  if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot",client.user.avatarURL()).setColor("#DARKBLUE").setFooter("🔵 Celestial Tüm Hakları Gizlidir.").setDescription("<:arps:777142378225074207> **| Komutu Yanlış Kullandın Doğru Kullanımı : ?otorol rol/kanal/liste/bot-rol/kapat**")) ;
  
  const role = message.mentions.roles.first() || message.guild.roles.cache.get(args.slice(1).join(" ")) || message.guild.roles.cache.find((role) => role.name === args.slice(1).join(" ") || (stringSimilarity.compareTwoStrings(role.name, args.slice(1).join(" ")) > 0.85));
  if(args[0] === "rol") {
    let rolsayi = db.get(`otorolsayisayi.${message.guild.id}`)
    if(rolsayi > 15) return message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot",client.user.avatarURL()).setColor("#DARKBLUE").setDescription("<:arps:777142378225074207> **| Rol Ekleme Sınırına Ulaştınız!**").setFooter("🔵 Celestial Tüm Hakları Gizlidir."));
   if(!role) return message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot",client.user.avatarURL()).setColor("#DARKBLUE").setDescription("<:arps:777142378225074207> **| Komutu Yanlış Kullandın Doğru Kullanımı : ?otorol rol @rol**").setFooter("🔵 Celestial Tüm Hakları Gizlidir."));
  
    if(role) {
   db.push(`otorol.rol.${message.guild.id}`,role.id)
  message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot", client.user.avatarURL()).setColor("#DARKBLUE").setFooter("🔵 Celestial Tüm Hakları Gizlidir.").setDescription(`<:arp:777142378557341746> **| Otorol Rolü** \`${role.name}\` **Olarak Ayarlandı**`))
  db.add(`otorolsayisayi.${message.guild.id}`,+1)
    }
  }
  
  
  if(args[0] === "kanal") {
  let kanal =  message.mentions.channels.first()
     if(!kanal) return message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot",client.user.avatarURL()).setColor("#DARKBLUE").setDescription("<:arps:777142378225074207> **| Komutu Yanlış Kullandın Doğru Kullanımı : ?otorol kanal #kanal**").setFooter("🔵 Celestial Tüm Hakları Gizlidir."));
  
     if(kanal) {
    db.set(`otorol.kanal.${message.guild.id}`,kanal.id)
  message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot", client.user.avatarURL()).setColor("#DARKBLUE").setFooter("🔵 Celestial Tüm Hakları Gizlidir.").setDescription(`<:arp:777142378557341746> **| Otorol Kanalı** \`#${kanal.name}\` **Olarak Ayarlandı**`))

  }
}  
  
if(args[0] === "liste") {
let kanal2 = db.get(`otorol.kanal.${message.guild.id}`);
let rol2 = db.get(`otorol.rol.${message.guild.id}`);
if(!kanal2) return  message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot", client.user.avatarURL()).setColor("#DARKBLUE").setFooter("🔵 Celestial Tüm Hakları Gizlidir.").setDescription(`<:arps:777142378225074207> **| Kanal Veya Rol Ayarlanmamış**`))
if(!rol2) return  message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot", client.user.avatarURL()).setColor("#DARKBLUE").setFooter("🔵 Celestial Tüm Hakları Gizlidir.").setDescription(`<:arps:777142378225074207> **| Kanal Veya Rol Ayarlanmamış**`))
 let botrol  = db.get(`otorol.rol.botrol.${message.guild.id}`)
let kanalG  = client.channels.cache.get(kanal2)
let rolG = message.guild.roles.cache.get(botrol)
  message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot", client.user.avatarURL()).setColor("#DARKBLUE").setFooter("🔵 Celestial Tüm Hakları Gizlidir.").setDescription(`<:arp:777142378557341746> **| Otorol Kanalı:** ${kanalG || "Ayarlanmadı"}`).addField("Roller;",`**${rol2.splice(0, 15).map((item, index) => `\`${index + 1}.\` <@&${item}>`).join("\n")}**`).addField("Bot Rolleri;",`**${rolG|| "Ayarlanmamış"}**`))
}  
  
  if(args[0] === "kapat") {
  db.delete(`otorol.kanal.${message.guild.id}`);
 db.delete(`otorol.rol.${message.guild.id}`);
db.delete(`otorolsayisayi.${message.guild.id}`);
db.delete(`otorol.rol.botrol.${message.guild.id}`)
  message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot", client.user.avatarURL()).setColor("#DARKBLUE").setFooter("🔵 Celestial Tüm Hakları Gizlidir.").setDescription(`<:arp:777142378557341746> **| Otorol Başarıyla Sıfırlandı**`))
  }
  
  if(args[0] === "bot-rol") {
      if(!role) return message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot",client.user.avatarURL()).setColor("#DARKBLUE").setDescription("<:arps:777142378225074207> **| Komutu Yanlış Kullandın Doğru Kullanımı : ?otorol bot-rol @rol**").setFooter("🔵 Celestial Tüm Hakları Gizlidir."));
    if(role) {
  db.set(`otorol.rol.botrol.${message.guild.id}`,role.id)
    }
    message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot",client.user.avatarURL()).setColor("#DARKBLUE").setFooter("🔵 Celestial Tüm Hakları Gizlidir.").setDescription(`<:arp:777142378557341746> **| Bot Rolü  Başarıyla ${role} Olarak Ayarlandı**`))
  }
} catch{}
};

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'otorol', 
  description: '',
  usage: ''
};