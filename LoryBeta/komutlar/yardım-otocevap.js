const Discord = require('discord.js');
const db = require("quick.db")
exports.run = async (client, message, args) => {
 if(!args[0]) {
   
const embed = new Discord.MessageEmbed()
    .setAuthor("Celestial || Oto Cevap Yardım Menüsü", client.user.avatarURL())
   .setColor("#DARKBLUE")
  .setDescription(`<:celestal:812040458565189653> Celestial botumuzu eklemek için \`?davet\` yazabilirsiniz. \n

  <a:kaa:778939825142104085> Oto Cevap Komutları:

  > <:saret:816334316896387142> **• \`?otocevap-ekle komut yazı\` => Oto Cevap Sistemini Kurarısınız.**
  > <:saret:816334316896387142> **• \`?otocevap-sil komut\` => Oto Cevap Eklediğiniz Bir Komutu Siler.**
  > <:saret:816334316896387142> **• \`?otocevap-liste\` => Oto Cevap Listesini Gösterir.**

\`\`\`Bu Komutlar Hepsi Sunucu Özeldir Başka Sunucuya gidip orocevap liste yazarsanız başak sunucuda eklediğniiz komutları Göstermez!!\`\`\`
  
  `)   
  .addField(`» Premium Bilgi`, `<:duyuru:778939801025642497> **| Premium Durumu:** ${db.has(`üyelikk_${message.author.id}`,"üyelik")?`**Premium üye**` : `**Normal üye**`}`)
  .addField(`» Bağlantı Adresleri`, `[**Bot Davet Linki**](https://discord.com/oauth2/authorize?client_id=783068430156824617&scope=bot&permissions=805314622) **•** [**Celestial Support**](https://discord.gg/WTwhWP5Fgv) **•** [**YouTube Kanal**](https:/youtube.com/channel/UCCPwOLTEOZLnMN5hEJVwkwA) **•**`)        .setFooter(`🔵 Celestial Sizler İçin Burda!`, client.user.avatarURL())  .setImage('https://media.discordapp.net/attachments/812003450241417336/812052399288090666/CBanner7.png')

  message.channel.send(embed)

 }}
  
exports.conf = {
    enabled: true, 
    guildOnly: true, 
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'yardım-otocevap', 
    description: '',
    usage: ''
  };