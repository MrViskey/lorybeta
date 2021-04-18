const Discord = require('discord.js');
const db = require("quick.db")
exports.run = async (client, message, args) => {
     
    const embed = new Discord.MessageEmbed()
    .setColor('#DARKBLUE')
    .setAuthor("Celestial Bot || Sponsor", client.user.avatarURL())
    .setDescription(`**Sponsorumuz Yoktur!**`)
     .setImage('https://images-ext-1.discordapp.net/external/TtWbCzA2aj1MQsrftMK8GPNxUQ4Sqk3TZiuVIEt2vFg/https/media.discordapp.net/attachments/810649353135456307/810893450302980096/CBanner.png')
    .setFooter(`${client.user.username} Davet sistemi.`,message.guild.iconURL({dynamic:true}))
    message.channel.send(embed)

};

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ["sponsorumuz"],
  permLevel: 0
};

exports.help = {
  name: 'sponsor', 
  description: '',
  usage: ''
};

