const Discord = require('discord.js');
const backup = require('discord-backup');
const db = require("croxydb")
exports.run = async (client, message, args) => {
    

    const backupID = args.join(' ');
    let kontrol = await db.get(`yedek_${backupID}`)
    if(message.author.id !== kontrol) return message.channel.send("<:arps:777142378225074207> **| Böyle Bir Yedeğe Sahip Değilsin**")
    if (!backupID)
        return message.channel.send('<:arps:777142378225074207> **| Bir Yedek ID\'si Belirt!**');

    backup.fetch(backupID).then((backup) => {
        let saa = db.get(`y_${message.author.id}`).map(x => `**${x.adı}**\n${x.id}\n`)
        const date = new Date(backup.data.createdTimestamp);
        const yyyy = date.getFullYear().toString(), mm = (date.getMonth()+1).toString(), dd = date.getDate().toString();
        const formattedDate = `${(dd[1]?dd:"0"+dd[0])}/${(mm[1]?mm:"0"+mm[0])}/${yyyy}`;
        let sj;
        sj = backup.data.roles.map(x => x.name).join("\n")
        let a;
        a = backup.data.channels.others.map(x => x.name).join("\n  ") || "\n"
        console.log(a)
        let b;
        b = backup.data.channels.categories.map(x => `• ${x.name}\n  ${x.children.map(x => x.name).join("\n  ")}`).join("\n\n")
        let b2;
        if(b.length > 1024) {
          b2 = `${b.slice(0, 300)} ...`
          } else {
            b2 = b
            }
      let a2;
      if(a.length > 1024) {
        a2 = `${a.slice(0, 300)} ...`
        } else {
          a2 = a
          }
        const embed = new Discord.MessageEmbed()
            .setTitle("<:bildirim:810660509673455646> **| Sunucu Yedeğinin Bilgisi**")
            .addField('<:isaret:800724089094144050> Sunucu Adı', backup.data.name)
            .addField('<:isaret:800724089094144050> Oluşturulma Tarihi', formattedDate)
            .addField("<a:kaa:778939825142104085> **| Kanallar**",`\`\`\`${a2} \n\n${b2}\`\`\``, true)
            .addField("<a:kaa:778939825142104085> **| Roller**","```"+sj+"```", true)
            .setColor("#DARKBLUE")
            .setFooter("🔵 Celestial Tüm Hakları Gizlidir.")
           .setImage('https://media.discordapp.net/attachments/812003450241417336/812052399288090666/CBanner7.png')
            return message.channel.send(embed);
    }).catch((err) => {

        if (err === 'No backup found')
            return message.channel.send('<:arps:777142378225074207> **| '+backupID+' ID\'li Bir Yedeğin Yok!**');
        else
            return message.channel.send('<:arps:777142378225074207> **| Bir Hata Oluştu:** '+(typeof err === 'string') ? err : JSON.stringify(err));

    });

};

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'yedek-bilgi', 
  description: '',
  usage: ''
};