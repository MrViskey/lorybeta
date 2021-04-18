const Discord = require("discord.js")
const db = require('quick.db')
const data = require('quick.db')

exports.run = async(bot, message, args) => {
  const rache = require("../ayarlar.json");
let prefix = await db.fetch(`prefix.${message.guild.id}`) || rache.prefix 

    let celestial = await db.fetch(`üyelikk_${message.author.id}`)
  if(celestial) {

  const embeddd = new Discord.MessageEmbed()
  .setDescription('<:arps:777142378225074207> **| Bu Komutu Kullanmak İçin `Sunucuyu Yönet` Yetkisi Lazım!**')
  .setColor("DARKBLUE");

                let mentionEmbed = new Discord.MessageEmbed()
                     .setDescription(`<:arps:777142378225074207> **| Komutu Yanlış Kullandın Doğrusu : ?otocevap-ekle komut Yazı Şeklinde Yapınız.**`)
                     .setColor('DARKBLUE')
               var user = message.mentions.users.first() || message.author;
if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(embeddd)
                     if (!args[0]) return message.channel.send(mentionEmbed)
                     if (!args[1]) return message.channel.send(mentionEmbed) 
                
                     let komut;
                     if (!args[0]) komut = ''; 
                     else komut = (args[0]); 
 if(args[0] == 'yardım' || args[0] == 'bilgi') return message.channel.send('<:arps:777142378225074207> **| Bu Komut Botda Var Ve Bottaki Olan Komutu Ekleyemessin**')                   
  let gonderileceksey;
                     if (args.slice(1, 1000, args[1]).join(' ') === 'NONE') gonderileceksey = ''; 
                     else gonderileceksey = args.slice(1, 1000, args[1]).join(' '); 
                
                     let welcomeEmbed = new Discord.MessageEmbed()
                     .addField(`<:arp:777142378557341746> **| Bu sunucuya özel komut eklendi.**`, `\`${komut}\` yazıldığı zaman \`${gonderileceksey}\` olarak yanıt verecek.`)
                     .setColor('DARKBLUE')
                     db.set(`sunucuKomut_${message.guild.id}`, komut)
                     db.set(`sunucuMesaj_${message.guild.id}`, gonderileceksey)
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
  name: "otocevap-ekle"
};