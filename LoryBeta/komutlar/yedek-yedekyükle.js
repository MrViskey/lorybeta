const backup = require('discord-backup');
const ayarlar = require("../ayarlar.json")
const prex = require("discord.js")
const db = require("croxydb")
exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('ADMINISTRATOR')){
        return message.channel.send('<:arps:777142378225074207> **| Komutu Kullanmak İçin Yetkiniz Bulunmamaktadır');
    }

    const backupID = args.join(' ');
    let kontrol = db.get(`yedek_${backupID}`)
    if(kontrol !== message.author.id) return message.channel.send("<:arps:777142378225074207> **| Böyle Bir Sunucu Yedeğine Sahip Değilsin.**")
    backup.fetch(backupID).then(() => {
        let uyarı = new prex.MessageEmbed()
        .setTitle("<:bildirim:810660509673455646> **| Uyarı!**")
        .setDescription(`
        <:isaret:800724089094144050> Tüm Kanallar, Roller Sıfırlanacaktır. İşleme Devam Etmek İstiyorsanız : \`evet\` İstemiyorsanız: \`hayır\` Yazınız. 10 Saniyeniz Vardır.
        `)
        .setColor("#DARKRED")
        .setThumbnail(message.guild.iconURL())
        .setFooter(message.author.tag + " Tarafından İstendi!", message.author.avatarURL())
        message.channel.send(uyarı)
        
        const collector = message.channel.createMessageCollector((m) => m.author.id === message.author.id && ['evet', 'hayır'].includes(m.content), {
            time: 60000,
            max: 1
        });
        collector.on('collect', (m) => {
            const confirm = m.content === 'evet';
            collector.stop();
            if (confirm) {

                backup.load(backupID, message.guild).then(() => {

                    return message.author.send('<:arp:777142378557341746> **| Yedek Başarıyla Yüklendi!**');
            
                }).catch((err) => {
            
                    if (err === 'No backup found')
                        return message.channel.send('<:arps:777142378225074207> **| '+backupID+' ID\'li Bir Yedek Bulunmuyor!**');
                    else
                        return message.author.send('<:arps:777142378225074207> **| Bir Hata Oluştu:** '+(typeof err === 'string') ? err : JSON.stringify(err));
            
                });

            } else {
                return message.channel.send('<:arps:777142378225074207> **| İşlem İptal Edildi.**');
            }
        })

        collector.on('end', (collected, reason) => {
            if (reason === 'time')
                return message.channel.send('<:arps:777142378225074207> **| 10 Saniye İçinde Yazmadığından İptal Oldu Tekrar Deneyin.****');
        })

    }).catch(() => {
        return message.channel.send('<:arps:777142378225074207> **| '+backupID+' ID\'li Bir Yedek Bulunmuyor!**');
    });

};

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'yedek-yükle', 
  description: '',
  usage: ''
};
