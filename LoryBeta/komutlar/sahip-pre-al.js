const db = require('quick.db')
const fs = require('fs')
const Discord = require('discord.js')
const client = new Discord.Client();
exports.run = async (client, message, args) => {
  if(message.author.id !== "813133125836079134") if(message.author.id !== "483387292447145991") return message.channel.send("<:ReddetmekPng:764085679818407937> **| Sahip Komudu Kullanamazsın!**");
  
  let user = client.users.cache.get(args.slice(0).join(' '));
  let nesne = args[0]
  if (!nesne) return message.channel.send('<:ReddetmekPng:764085679818407937> **| ID Belirt!**')
  
  db.delete(`üyelikk_${nesne}`, 'üyelik')
  
  message.channel.send(`<:OnayPng:764085667818111036> **| <@${nesne}> adlı kişinin Premium Üyeliğini başarıyla kaldırdım.**`)
//client.channels.cache.get('737989667714105346').send(`<a:gold1:719860487734427708> <@${nesne}> ID'li Kullanıcı Gold Üyeliğe Eklendi.   <a:gold1:719860487734427708>`)
if (client.users.cache.get(''+nesne+'').send(`<:OnayPng:764085667818111036> **|  \`Premium üyeliğiniz kaldırıldı.\` **`)){
 
} else return
  
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['preal', 'pre-al'],
  permLevel: 0
};
exports.help = {
  name: 'premiumal',
  description: 'Gold üye ekler',
  usage: 'gold-üye-ekle'
};