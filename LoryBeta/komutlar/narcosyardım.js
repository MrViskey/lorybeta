const Discord = require('discord.js');
const db = require("quick.db")
exports.run = async (client, message, args) => {
 if(!args[0]) {
   
const embed = new Discord.MessageEmbed()
    .setAuthor("<:mod2:823577817621987358> Narcos Botlist || Yardım Menüsü", client.user.avatarURL())
   .setColor("#BLUE")
  .setDescription(`
  <:mod2:823577817621987358> **Yetkili Komutları**
  
> <:uye:823577810383667200> **• \`!!botlist-ayar botekle-kanal #kanal\` => Bot Ekleme Kanalını Ayarlarsınız.**

> <:uye:823577810383667200>  **• \`!botlist-ayar botlog-kanal #kanal\` Bot Log Kanalını Ayarlarsınız.**

> <:uye:823577810383667200> **• \`!botlist-ayar başvurugiden-kanal #kanal\` Başvuru Logunu Ayarlarsınız.**

> <:uye:823577810383667200>  **• \`!botlist-ayar yetkili @rol\` Botlist Yetkili Rolünü Ayarlarsınız.**

\`\`\`Bu Altyapı Narcos Code Ye Aittir. Tüm Abonelere İyi Kullanımlar Dileriz.\`\`\`
  
  `)   
  .addField(`» Bağlantı Adresleri`, `[**Narcos Code**](https://discord.gg/mE9GwcnMwC) **•** [**YouTube Kanalı**](https://www.youtube.com/channel/UCD9s0x7OrF3XPmmV7AlBrhA) **•**`)        .setFooter(`🔵 NarcosCode Sizler İçin Burda!`, client.user.avatarURL())

  message.channel.send(embed)

}else {

}
};

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'botlist-ayar', 
  description: '',
  usage: ''
};

