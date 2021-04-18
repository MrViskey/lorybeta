const Discord = require('discord.js');
const db = require("quick.db")
const moment = require("moment")
const pack = require('../package.json')
moment.locale('tr')
exports.run = async (client, message, args) => {
  var sayı = db.get("uptime") || 0;
      var kSayı =0
  client.commands.forEach(a=>kSayı+=1)
  var rolSize = 0
  client.guilds.cache.forEach(a=>{
    rolSize+=a.roles.cache.size
  })
  const embed = new Discord.MessageEmbed()

     .setAuthor("Celestial || Bot İstatistik",client.user.avatarURL())
          .addField('İsim',client.user.username,true)
     .addField('Yazılım dili:','Javascript & NodeJs',true)
     .addField('Kullanılan modül:','discord.js',true)
     .addField('NodeJS version:',process.versions.node,true)
     .addField('DiscordJS version:',pack.dependencies['discord.js'],true)
     .addField('Platform:',process.platform,true)
     .addField('Ping:',Math.floor(Math.round(client.ws.ping)),true)
     .addField('Toplam kullanıcı:',client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toString(),true)
     .addField('Toplam Sunucu:',client.guilds.cache.size,true)
     .addField('Toplam kanal:',client.channels.cache.size,true)
     .addField('Toplam rol:',rolSize,true)
     .addField('Toplam emoji:',client.emojis.cache.size,true)
     .addField('Komut sayısı:',kSayı,true)
     .setTimestamp()
     .setColor("#darkblue")
    .setFooter("🔵 Celestial Tüm Hakları Gizlidir.")
     .setThumbnail(client.user.avatarURL({size:4096}))
     message.channel.send(embed)
  
   };
exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ["istatistik","botbilgi"],
  permLevel: 0
};

exports.help = {
  name: 'i', 
  description: '',
  usage: ''
};