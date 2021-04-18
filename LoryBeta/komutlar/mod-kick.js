const Discord = require('discord.js');
const db = require("quick.db")
exports.run = async (client, message, args) => {
   try {
      if(!message.member.hasPermission("ADMINISTRATOR") && !message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot",client.user.avatarURL()).setColor("#DARKBLUE").setFooter("🔵 Celestial Tüm Hakları Gizlidir.").setDescription("<:arps:777142378225074207> **| Komutu Kullanmak İçin Yetkiniz Bulunmamakta.**")) ;

  if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot",client.user.avatarURL()).setColor("#DARKBLUE").setFooter("🔵 Celestial Tüm Hakları Gizlidir.").setDescription("<:arps:777142378225074207> **| komutu Yanlış Kullandın Doğru Kullanımı : ?kick @kişi**")) ;
  let user = message.mentions.users.first();
  if(user) {
 if(user.id == message.author.id) return message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot",client.user.avatarURL()).setColor("#DARKBLUE").setFooter("🔵 Celestial Tüm Hakları Gizlidir.").setDescription("<:arps:777142378225074207>**| Kendi Kendini Sunucudan Atamazsın Dostum :thinking:**")) ;
 if(user.id == client.user.id) return message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot",client.user.avatarURL()).setColor("#DARKBLUE").setFooter("🔵 Celestial Tüm Hakları Gizlidir.").setDescription("<:arps:777142378225074207> **| Bana Ban Atamazsın Dostum :thinking:**")) ;
 if(user.id == message.guild.owner.id) return message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot",client.user.avatarURL()).setColor("#DARKBLUE").setFooter("🔵 Celestial Tüm Hakları Gizlidir.").setDescription("<:arps:777142378225074207> **| Sunucu Sahibini Sunucudan Atamazsın Dostum :thinking:**")) 
  }
  let sebep = args.slice(1).join(" ");
  if(!sebep) sebep = `Belirtilmemiş`
  if(user) {
    let member = message.guild.member(user);
    if(member) {
    member.kick({reason:` Sebep: ${sebep} | Kullanıcıyı Banlatan Kişi ${message.author.tag}`})
    db.push(`${message.guild.id}.kicklenenkisiler`,{member:member.id,sebep:sebep})
    
  }
     message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot", client.user.avatarURL()).setColor("#DARKBLUE").setFooter("🔵 Celestial Tüm Hakları Gizlidir.").setDescription(`<:arp:777142378557341746> **|** \`${member.user.tag}\` **Adlı Üye Sunucudan Atıldı/Kicklendi**`))

  }
  
 /* if(args[0] === "liste") {
   let bans = db.get(`${message.guild.id}.banlanankisiler`)
 await message.channel.send(new Discord.MessageEmbed().setAuthor("Zyron Bot", client.user.avatarURL()).setColor("#DARKBLUE").setFooter("🔵 Celestial Tüm Hakları Gizlidir. Gösterilen Banlı Kişiler Botun Databasesinde Bulunur").addField(`Banlanılan Üyeler;`,`${bans.map((item, index) => `\`${index + 1}.\` ${item} | ${client.users.cache.get(item).tag}`).join("\n")}`))
  }*/
   }catch {}
};
exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'kick', 
  description: '',
  usage: ''
};