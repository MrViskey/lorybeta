const Discord = require("discord.js")
const db = require('quick.db')

exports.run = async(bot, message, args) => {
  const rache = require("../ayarlar.json");
let prefix = await db.fetch(`prefix.${message.guild.id}`) || rache.prefix 
                
    let celestial = await db.fetch(`üyelikk_${message.author.id}`)
  if(celestial) {
    
         var user = message.mentions.users.first() || message.author;
if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.sendEmbed(new Discord.MessageEmbed().setDescription('<:arps:777142378225074207> **| Bu Komutu Kullanmak İçin `Sunucuyu Yönet` Yetkisi Lazım!**').setColor("DARKBLUE")); 
                
                    
                   let komut = await db.fetch(`sunucuKomut_${message.guild.id}`) 
                     let gonderileceksey = await db.fetch(`sunucuMesaj_${message.guild.id}`)
                     if(!komut) return message.channel.send('<:arps:777142378225074207> **| Bu Sunucuda Özel Komut Ayarlı Değil.**')
                         let komutvarmi = await db.fetch(`sunucuKomut_${message.guild.id}`)
                    if(!args[0]) return message.channel.send(`<:arps:777142378225074207> **| Lütfen Silmek İstediğiniz Özel Komudu Giriniz.**\n \n**Mevcut özel komutlar:** \`${komut}\``)
                    if(args[0] !== komut) return message.channel.send(`<:arps:777142378225074207> **| Böyle Bir Komut Mevcut Değil.**\n**Mevcut özel komutlar:** \`${komut}\``)
                   if(args[0] == 'Bulunmuyor.') return message.channel.send(`<:arps:777142378225074207> **| **Bu Komut Mevcut Değil.**\nMevcut özel komutlar:** \`${komut}\``)
                    
                     let welcomeEmbed = new Discord.MessageEmbed()
                     .addField(`<:arp:777142378557341746> **| Bu sunucudan özel komut silindi.**`, `\`${komut}\` **silindi.**`)
                     .setColor('DARKBLUE')
                
                     db.set(`sunucuKomut_${message.guild.id}`, 'Bulunmuyor.')
                     db.delete(`sunucuMesaj_${message.guild.id}`, gonderileceksey)
                        message.channel.send(welcomeEmbed) 
} else { return message.channel.send(new Discord.MessageEmbed()
 .setDescription(`<:arps:777142378225074207> **| ${message.author}, Bu Komut Gold Üyeler İçindir. Sende Gold Üye Bulunmamakta.**`)
.setTimestamp()
.setColor(`DARKBLUE`)
)
}                     

 };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permlevel: 0
};

exports.help = {
  name: "otocevap-sil"
};