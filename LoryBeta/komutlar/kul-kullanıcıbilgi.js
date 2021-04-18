const { Discord, MessageEmbed } = require('discord.js')
const moment = require('moment')
moment.locale('tr')

exports.run = function(client, message, args) {
 const kisi = message.mentions.users.first() || message.author;
 var x
 switch (kisi.presence.status) {
     case 'online': x ='Aktif'
     break;
     case 'dnd': x='Rahatsız etmeyin'
     break;
     case 'offline': x='Aktif değil'
     break;
     case 'idle': x='Boşta'
     break
 }
 var f =''
 if(kisi.presence.activities.map(a=>a.state)) f=kisi.presence.activities.map(a=>a.state)
 if(kisi.presence.activities.map(a=>a.state) =='') f='Yok'
 let k 
 if(kisi.lastMessageChannelID) k= `<#${kisi.lastMessageChannelID}>`
 if(!kisi.lastMessageChannelID) k= `Yok`
 const m = message.guild.members.cache.find(a=>a.id == kisi.id)
 const embed = new MessageEmbed()
        .setColor('#DARKBLUE')
        .addField('Kullanıcı adı:',kisi.username, true)
        .addField('Kullanıcı tagı:',kisi.tag, true)
        .addField('Kullanıcı ID:',kisi.id, true)
        .addField('Kullanıcı #:',kisi.discriminator, true)
        .addField('Kullanıcı botmu:',kisi.bot? 'Evet':'Hayır', true)
        .addField('Kullanıcı durum:',x, true)
        .addField('Kullanıcı durum mesajı',f, true)
        .addField('Rolleri:',m.roles.cache.map(a=>a), true)
        .setImage(kisi.displayAvatarURL({size:4096,dynamic:true}))
        .setFooter(`${client.user.username} Kullanıcı bilgi sistemi.`,message.guild.iconURL({dynamic:true}))
        .setTimestamp()        
        message.channel.send(embed)
}

exports.conf = {
    enabled: true, 
    guildOnly: true, 
    aliases: ["kb","kullanıcıbilgi"],
    permLevel: 0
  };
  
  exports.help = {
    name: 'kullanıcı-bilgi', 
    description: '',
    usage: ''
  };
  
  