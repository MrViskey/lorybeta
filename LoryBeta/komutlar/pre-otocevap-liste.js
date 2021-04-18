const Discord = require("discord.js")
const db = require('quick.db')

exports.run = async(bot, message, args) => {

    let celestial = await db.fetch(`üyelikk_${message.author.id}`)
    if(celestial) {
  
  
  } else { return message.channel.send(`<:arps:777142378225074207> **| ${message.author}, Bu Komut Gold Üyeler İçindir. Sende Gold Üye Bulunmamakta.**`) }

          let komut = await db.fetch(`sunucuKomut_${message.guild.id}`)

                     let gonderileceksey = await db.fetch(`sunucuMesaj_${message.guild.id}`)
                     if(!komut) await db.set(`sunucuKomut_${message.guild.id}`, 'Bulunmuyor.')
                  
                  
                     let welcomeEmbed = new Discord.MessageEmbed()
                     .addField(`Oto Cevap Liste.`, `Komut : ${komut}`)
                     .setColor('DARKBLUE')
                        message.channel.send(welcomeEmbed)
                     };


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permlevel: 0
};

exports.help = {
  name: "otocevap-liste"
};