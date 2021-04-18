const Discord = require('discord.js');
const db =require("quick.db");
exports.run = async (client, message, args) => {
   try {
      if(!message.member.hasPermission("ADMINISTRATOR") && !message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot",client.user.avatarURL()).setColor("#DARKBLUE").setFooter("🔵 Celestial Tüm Hakları Gizlidir.").setDescription("<:arps:777142378225074207> **| Komutu Kullanmak İçin Yetkiniz Bulunmamaktadır.**")) ;

  if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot",client.user.avatarURL()).setColor("#DARKBLUE").setFooter("🔵 Celestial Tüm Hakları Gizlidir.").setDescription("<:arps:777142378225074207> **| Komutu Yanlış Kullandın Doğru Kullanımı : ?rolkomut ayarla/liste/kapat**")) ;
 
     if(args[0] === "ayarla") {
      let komut = args[2]
      let rol = message.mentions.roles.first()
        let dataKK = db.fetch(`rolkomut.${message.guild.id}`)
        if(dataKK == null) db.set(`rolkomut.${message.guild.id}`,[])
        let currentRank = dataKK.find((r) => r.komut === komut);
       if(currentRank) return message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot",client.user.avatarURL()).setColor("#DARKBLUE").setDescription("<:arps:777142378225074207> **| Bu Komut Zaten Ayarlanmış**").setFooter("🔵 Celestial Tüm Hakları Gizlidir."));
       if(!rol || !komut) return message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot",client.user.avatarURL()).setColor("#DARKBLUE").setDescription("<:arps:777142378225074207> **| Komutu Yanlış Kullandın Doğru Kullanımı : ?rolkomut ayarla @rol komutadı**").setFooter("🔵 Celestial Tüm Hakları Gizlidir."));
       if(client.commands.get(komut) || client.aliases.get(komut)) return message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot",client.user.avatarURL()).setColor("#DARKBLUE").setDescription("<:arps:777142378225074207> **| Yazdığınız Komut Botta Zaten Bulunmaktadır**").setFooter("🔵 Celestial Tüm Hakları Gizlidir.")); 
          message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot", client.user.avatarURL()).setColor("#DARKBLUE").setFooter("🔵 Celestial Tüm Hakları Gizlidir.").setDescription(`<:arp:777142378557341746> **| Rol Komut ?${komut} Yazılırsa ${rol} Rolü Verilecektir**`))
       db.push(`rolkomut.${message.guild.id}`,{rol:rol.id,komut:komut})    
     }
     
     
     if(args[0] === "liste") {
        let dataK = db.get(`rolkomut.${message.guild.id}`)
      if(!dataK) return  message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot", client.user.avatarURL()).setColor("#DARKBLUE").setFooter("🔵 Celestial Tüm Hakları Gizlidir.").setDescription(`<:arps:777142378225074207> **| Rol Komut Ayarlanmamış**`))
 message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot", client.user.avatarURL()).setColor("#DARKBLUE").setFooter("🔵 Celestial Tüm Hakları Gizlidir.").addField("Rol Komut İlk 15;",`**${dataK.splice(0, 15).map((item, index) => `\`${index + 1}.\` ${message.guild.roles.cache.has(item.rol) ? message.guild.roles.cache.get(item.rol).name : "@Bilinmeyen Rol"} : ${item.komut}`).join("\n")}**`))
  
     }
  
   if(args[0] === "kapat") {
  db.delete(`rolkomut.${message.guild.id}`)
         message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot", client.user.avatarURL()).setColor("#DARKBLUE").setFooter("🔵 Celestial Tüm Hakları Gizlidir.").setDescription(`<:arp:777142378557341746> **| Rol Komut Verisi Silindi/Kapatıldı**`))

}
   }catch{};
   };
exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ["rol-komut"],
  permLevel: 3
};

exports.help = {
  name: 'rolkomut', 
  description: '',
  usage: ''
};