const backup = require("discord-backup");
const ayarlar = require("../ayarlar.json");
const prex = require("discord.js");
const db = require("croxydb");

exports.run = async (client, message, args) => {
  
  let celestial = db.get(`toplam_${message.author.id}`) || "0"
  if (!message.member.hasPermission("ADMINISTRATOR")) {
   return message.channel.send(
      "<:arps:777142378225074207> **| Komutu Kullanmak İçin Yetkiniz Bulunmamaktadır**"
    );
  }
  if (celestial < 15) {
    backup.create(message.guild, { maxMessagesPerChannel: 0}).then((backupData) => {
        db.set(`yedek_${backupData.id}`, message.author.id);
        const date = new Date(backupData.createdTimestamp);
        const yyyy = date.getFullYear().toString(), mm = (date.getMonth() + 1).toString(), dd = date.getDate().toString();
        const formattedDate = `${dd[1] ? dd : "0" + dd[0]}/${mm[1] ? mm : "0" + mm[0]}/${yyyy}`;
        db.add(`toplam_${message.author.id}`, 1);
        db.push(`y_${message.author.id}`, {
          adı: backupData.name,
          id: backupData.id,
          tarih: formattedDate
        });
    
        let celestialbot = new prex.MessageEmbed()
          .setTitle("<:arp:777142378557341746> **| Sunucunun Yedeği Başarıyla Alındı!**")
          .setDescription(`<:bildirim:810660509673455646> **| Yedek Bilgilendirme** \n \n **•----------------------------------- © --------------------•** \n \n > <:isaret:800724089094144050> **Sunucu Yedeğin ID Si;** \n > \`\`\`${backupData.id}\`\`\` \n \n > <:isaret:800724089094144050> **Sunucu Yedeğinin Bilgisi** \n > \`\`\`${ayarlar.prefix}yedek-bilgi ${backupData.id}\`\`\` \n \n > <:isaret:800724089094144050> **Sunucu Yedeğini Yüklemek İçin** \n > \`\`\`${ayarlar.prefix}yedek-yükle ${backupData.id}\`\`\` \n \n **•----------------------------------- © --------------------•**`)
          .setColor("#DARKBLUE")
          .setTimestamp()
          .setImage('https://media.discordapp.net/attachments/812003450241417336/812052399288090666/CBanner7.png')
          .setThumbnail(message.guild.iconURL({ dynamic: true }))
          .setFooter("🔵 Celestial Tüm Hakları Gizlidir.")
        return message.channel.send(celestialbot);
      })
      .catch(() => {
        return message.channel.send(
          "<:arps:777142378225074207> **| Bir Hata Oluştu. Botun Yönetici Yetkisine Sahip Olduğundan Emin Ol!**"
        );
      });
  }
};

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'yedek-al', 
  description: '',
  usage: ''
};

