const Discord = require('discord.js');
const db = require("quick.db")
exports.run = async (client, message, args) => {
   try {
      if(!message.member.hasPermission("ADMINISTRATOR") && !message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot",client.user.avatarURL()).setColor("#DARKBLUE").setFooter("🔵 Celestial Tüm Hakları Gizlidir.").setDescription("<:arps:777142378225074207> **| Komutu Kullanmak İçin Yetkiniz Bulunmamaktadır****")) ;
  
  if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot",client.user.avatarURL()).setColor("#DARKBLUE").setFooter("🔵 Celestial Tüm Hakları Gizlidir.").setDescription("<:arps:777142378225074207> **| Komutu Yanlış Kullandın Doğru Kullanımı : ?sayaç ayarla/sıfırla**")) ;
 
  
  
  if(args[0] === "ayarla") {
    let kanal = message.mentions.channels.first()
    let sayi = args[2]
    let yazilmamis = message.guild.memberCount + 50
   if(!kanal) return message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot",client.user.avatarURL()).setColor("#DARKBLUE").setDescription("<:arps:777142378225074207> **| Komutu Yanlış Kullandın Doğru Kullanımı : ?sayaç ayarla #kanal sayı || Eğer Sayıyı Yazmazsanız Otomatik Olarak Belirler**").setFooter("🔵 Celestial Tüm Hakları Gizlidir."));
   
    if(kanal) {
       db.set(`sayackanal.${message.guild.id}`,kanal.id)
    }

    if(!sayi) {
      db.set(`sayacsayi.${message.guild.id}`,yazilmamis)
   message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot", client.user.avatarURL()).setColor("#DARKBLUE").setFooter("🔵 Celestial Tüm Hakları Gizlidir.").setDescription(`<:arp:777142378557341746> **| Sayaç Kanalı** \`#${kanal.name}\` **Olarak Ayarlandı Sayaç Sayısı İse** \`${yazilmamis}\` **Olarak Otomatik Biçimde Ayarlandı**`))
    }else{
    if(isNaN(sayi)) return;
    db.set(`sayacsayi.${message.guild.id}`,sayi)
   message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot", client.user.avatarURL()).setColor("#DARKBLUE").setFooter("🔵 Celestial Tüm Hakları Gizlidir.").setDescription(`<:arp:777142378557341746> **| Sayaç Kanalı** \`#${kanal.name}\` **Olarak Ayarlandı Sayaç Sayısı İse** \`${sayi}\` **Olarak Ayarlandı**`))
   }
  }
  
  if(args[0] === "sıfırla") {
    db.delete(`sayackanal.${message.guild.id}`)
    db.delete(`sayacsayi.${message.guild.id}`)
      message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot", client.user.avatarURL()).setColor("#DARKBLUE").setFooter("🔵 Celestial Tüm Hakları Gizlidir.").setDescription(`<:arp:777142378557341746> **| Sayaç Başarıyla Sıfırlandı**`))

  }
   } catch{};
};

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'sayaç', 
  description: '',
  usage: ''
};