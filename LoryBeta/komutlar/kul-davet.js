const Discord = require('discord.js');
const db = require("quick.db")
exports.run = async (client, message, args) => {
     
    const embed = new Discord.MessageEmbed()
    .setColor('#DARKBLUE')
    .setAuthor("Celestial Bot || Davet", client.user.avatarURL())
    .setDescription(`**Celestial Botu Davet Ederek Sunucunuzu Koruyun Botu Aşşağıdan Davet Edebilirsin. \n \n [Botu Davet Et](https://discord.com/oauth2/authorize?client_id=783068430156824617&scope=bot&permissions=805314622)**`)
     .setImage('https://media.discordapp.net/attachments/812003450241417336/812052399288090666/CBanner7.png')
    .setFooter(`${client.user.username} Davet sistemi.`,message.guild.iconURL({dynamic:true}))
    message.channel.send(embed)
};

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ["davet"],
  permLevel: 0
};

exports.help = {
  name: 'davet', 
  description: '',
  usage: ''
};

