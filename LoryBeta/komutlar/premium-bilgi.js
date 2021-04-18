const Discord = require('discord.js');
const db = require("quick.db")
exports.run = async (client, message, args) => {
   
const embed = new Discord.MessageEmbed()
    .setAuthor("Celestial || Yardım Menüsü", client.user.avatarURL())
   .setColor("#DARKBLUE")
  .setDescription(`<:celestal:812040458565189653> Celestial botumuzu eklemek için \`?davet\` yazabilirsiniz. \n

  <a:kaa:778939825142104085> Premium Bilgi:
  
> Premium Hakkında Sizlere Bilgi Vericeğim.
> Premium Nasıl Alırım Diyorsanız İşte Şöle Alırsınız;

> Premium Almak İçin Sunucumuza 2 Boost Basmanız Lazım.
> 2 Boost Bastıkdan Sonra Destek Açmanız Lazım Ve 1 Aylık Premium Kazanabilirsiniz.
> Premium Almak İçin Aylık Ve Yıllık Fiyatlandırması Olucaktır.

> Aylık Premium Üyelik : 2.5 TL Dir.
> Yıllık Premium Üyelik : 25 TL Dir.

> Premium ALmak İçin Destek Açmanız Lazım Ödeme Yöntemi : İninal Dır.
  
  `)   
  .addField(`» Premium Bilgi`, `<:duyuru:778939801025642497> **| Premium Durumu:** ${db.has(`üyelikk_${message.author.id}`,"üyelik")?`**Premium üye**` : `**Normal üye**`}`)
  .addField(`» Bağlantı Adresleri`, `[**Bot Davet Linki**](https://discord.com/oauth2/authorize?client_id=783068430156824617&scope=bot&permissions=805314622) **•** [**Celestial Support**](https://discord.gg/WTwhWP5Fgv) **•** [**YouTube Kanal**](https:/youtube.com/channel/UCCPwOLTEOZLnMN5hEJVwkwA) **•**`)        .setFooter(`🔵 Celestial Sizler İçin Burda!`, client.user.avatarURL())  .setImage('https://media.discordapp.net/attachments/812003450241417336/812052399288090666/CBanner7.png')

  message.channel.send(embed)

 }

 exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['premiumbilgi', 'premium-bilgi'],
    permLevel: 0
  };
  exports.help = {
    name: 'prebilgi',
    description: 'Gold üye ekler',
    usage: 'gold-üye-ekle'
  };