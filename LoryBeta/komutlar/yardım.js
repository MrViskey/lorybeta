const Discord = require('discord.js');
const db = require("quick.db")
exports.run = async (client, message, args) => {
 if(!args[0]) {
   
const embed = new Discord.MessageEmbed()
    .setAuthor("Celestial || Yardım Menüsü", client.user.avatarURL())
   .setColor("#DARKBLUE")
  .setDescription(`<:celestal:812040458565189653> Celestial botumuzu eklemek için \`?davet\` yazabilirsiniz. \n

  <a:kaa:778939825142104085> Kategoriler:
  
> <:kullan:778939804216721429> **• Kullanıcı Komutları İçin \`?yardım kullanıcı\`**

> <:duyuru:778939801025642497>  **• Moderasyon Komutları İçin \`?yardım moderasyon\`**

> <:koruma:778939803693088818> **• Premium Komutları İçin \`?yardım premium\`**

> <:AyarPng:764085652831993866>  **• Sistemler Komutları İçin \`?yardım sistemler\`**

> 💠 **• Logolar İçin \`?yardım logo\`**
  
  `)   
  .addField(`» Premium Bilgi`, `<:duyuru:778939801025642497> **| Premium Durumu:** ${db.has(`üyelikk_${message.author.id}`,"üyelik")?`**Premium üye**` : `**Normal üye**`}`)
  .addField(`» Bağlantı Adresleri`, `[**Bot Davet Linki**](https://discord.com/oauth2/authorize?client_id=783068430156824617&scope=bot&permissions=805314622) **•** [**Celestial Support**](https://discord.gg/WTwhWP5Fgv) **•** [**Sitemiz**](http://celestialbot.ml/) **•**`)        .setFooter(`🔵 Celestial Sizler İçin Burda!`, client.user.avatarURL())  .setImage('https://media.discordapp.net/attachments/812003450241417336/812052399288090666/CBanner7.png')

  message.channel.send(embed)

}else {

      if(args[0] === "bilet-sistemi") {
    
 let embed = new Discord.MessageEmbed()   
   .setThumbnail(client.user.avatarURL())
  .setImage('https://media.discordapp.net/attachments/812003450241417336/812052399288090666/CBanner7.png')
 .setColor("#DARKBLUE")
 .addField(`» Bağlantı Adresleri`, `[**Bot Davet Linki**](https://discord.com/oauth2/authorize?client_id=783068430156824617&scope=bot&permissions=805314622) **•** [**Celestial Support**](https://discord.gg/WTwhWP5Fgv) **•** [**Sitemiz**](http://celestialbot.ml/) **•**`)        .setFooter(`🔵 Celestial Sizler İçin Burda!`, client.user.avatarURL())  .setImage('https://media.discordapp.net/attachments/812003450241417336/812052399288090666/CBanner7.png')
 let atilacak = `**:tickets: Celestial - Bilet Sistemi Yardım Menüsü** \n \n  Merhaba ${message.author} Bilet Sistemi Yani Ticket Destek Sistemi.

**•----------------------------------- © --------------------•**

> <:saret:816334316896387142> \`?bilet-kurulum\` **=> Bilet Sistemi Nasıl Kurulucağını Gösterir.**
> <:saret:816334316896387142> \`?bilet-kurulum #kanal\` **=> Bilet Sistemi Kurarsınız.**`
  for (var i = 0; i < (Math.floor(atilacak.length/2000)); i++) {
    message.channel.send(embed.setDescription(atilacak.slice(0, 2000)));
    atilacak = atilacak.slice(2000);
  };
  if (atilacak.length > 0) message.channel.send(embed.setDescription(atilacak));
     
    
    
  }
  
      if(args[0] === "kullanıcı") {
    
 let embed = new Discord.MessageEmbed()   
   .setThumbnail(client.user.avatarURL())
  .setImage('https://media.discordapp.net/attachments/812003450241417336/812052399288090666/CBanner7.png')
 .setColor("#DARKBLUE")
 .addField(`» Bağlantı Adresleri`, `[**Bot Davet Linki**](https://discord.com/oauth2/authorize?client_id=783068430156824617&scope=bot&permissions=805314622) **•** [**Celestial Support**](https://discord.gg/WTwhWP5Fgv) **•** [**Sitemiz**](http://celestialbot.ml/) **•**`)        .setFooter(`🔵 Celestial Sizler İçin Burda!`, client.user.avatarURL())  .setImage('https://media.discordapp.net/attachments/812003450241417336/812052399288090666/CBanner7.png')
 let atilacak = `**<:kullan:778939804216721429> Celestial - Kullanıcı Yardım Menüsü** \n \n  Merhaba ${message.author} Bu Menü Kullanıcı Menüsüdür..

**•----------------------------------- © --------------------•**

> <:saret:816334316896387142> \`?avatar • ?avatar @kişi\` **=> Avatarını Gösterir. • Etiketlediğin Kişinin Avatarını Gösterir.**
> <:saret:816334316896387142> \`?istatistik\` **=> Botun İstatistiğini Gösterir.**
> <:saret:816334316896387142> \`?kullanıcı-bilgi\` **=> Kullanıcının Bilgisini Gösterir.**
> <:saret:816334316896387142> \`?sunucu-bilgi\` **=> Sunucunun Bilgisini Gösterir.**
> <:saret:816334316896387142> \`?ping\` **=> Botun Pingini Gösterir.**
> <:saret:816334316896387142> \`?davet\` **=> Botun Davet Linkini Atar.**
> <:saret:816334316896387142> \`?premium-liste\` **=> Premium Liste Atar.**
> <:saret:816334316896387142> \`?premiumbilgi\` **=> Premium Hakkında Bilgi Atar.**
`
  for (var i = 0; i < (Math.floor(atilacak.length/2000)); i++) {
    message.channel.send(embed.setDescription(atilacak.slice(0, 2000)));
    atilacak = atilacak.slice(2000);
  };
  if (atilacak.length > 0) message.channel.send(embed.setDescription(atilacak));
     
    
    
  }
  
        if(args[0] === "sistemler") {
    
 let embed = new Discord.MessageEmbed()   
   .setThumbnail(client.user.avatarURL())
  .setImage('https://media.discordapp.net/attachments/812003450241417336/812052399288090666/CBanner7.png')
 .setColor("#DARKBLUE")
 .addField(`» Bağlantı Adresleri`, `[**Bot Davet Linki**](https://discord.com/oauth2/authorize?client_id=783068430156824617&scope=bot&permissions=805314622) **•** [**Celestial Support**](https://discord.gg/WTwhWP5Fgv) **•** [**Sitemiz**](http://celestialbot.ml/) **•**`)        .setFooter(`🔵 Celestial Sizler İçin Burda!`, client.user.avatarURL())  .setImage('https://media.discordapp.net/attachments/812003450241417336/812052399288090666/CBanner7.png')
 let atilacak = `**<:AyarPng:764085652831993866> Celestial - Sistemler Yardım Menüsü** \n \n  Merhaba ${message.author} Bu Menü Sistemler Menüsüdür..

**•----------------------------------- © --------------------•**

<a:kaa:778939825142104085> **| Sistemler**

> <:saret:816334316896387142> \`?yardım-yedeksistemi\` **=> yedek Sistemi Komutlarını Gösterir.**

> <:saret:816334316896387142> \`?yardım-biletsistemi\` **=> Bilet Sisteminin Komutlarını Gösterir.**
`
  for (var i = 0; i < (Math.floor(atilacak.length/2000)); i++) {
    message.channel.send(embed.setDescription(atilacak.slice(0, 2000)));
    atilacak = atilacak.slice(2000);
  };
  if (atilacak.length > 0) message.channel.send(embed.setDescription(atilacak));
     
    
    
  }
  
        if(args[0] === "moderasyon") {
    
 let embed = new Discord.MessageEmbed()   
   .setThumbnail(client.user.avatarURL())
  .setImage('https://media.discordapp.net/attachments/812003450241417336/812052399288090666/CBanner7.png')
 .setColor("#DARKBLUE")
 .addField(`» Bağlantı Adresleri`, `[**Bot Davet Linki**](https://discord.com/oauth2/authorize?client_id=783068430156824617&scope=bot&permissions=805314622) **•** [**Celestial Support**](https://discord.gg/WTwhWP5Fgv) **•** [**Sitemiz**](http://celestialbot.ml/) **•**`)        .setFooter(`🔵 Celestial Sizler İçin Burda!`, client.user.avatarURL())  .setImage('https://media.discordapp.net/attachments/812003450241417336/812052399288090666/CBanner7.png')
 let atilacak = `**<:duyuru:778939801025642497> Celestial - Moderasyon Yardım Menüsü** \n \n  Merhaba ${message.author} Bu Menü Kullanıcı Menüsüdür..

**•----------------------------------- © --------------------•**

> <:saret:816334316896387142> \`?sa-as aç • ?sa-as kapat\` **=> Sa-As Sistemini Açar. • Sa-As Sistemini Kapatır.**
> <:saret:816334316896387142> \`?mod-log ayarla #kanal • ?mod-log sıfırla\` **=> Mod Log Sistemini Ayarlarsınız. • Mod Log Sistemini Sıfırlarsınız..**
> <:saret:816334316896387142> \`?ban @kişi\` **=> Etiketlediğin Kişiyi Banlarsın.**
> <:saret:816334316896387142> \`?kick @kişi\` **=> Etiketlediğin Kişiyi Kicklersin.**
> <:saret:816334316896387142> \`?küfürengel kanal #kanal • ?küfürengel hepsi • ?küfürengel kapat\` **=> Küfür Engelleme Sistemi Belirli Kanala Veya Bütün Kanallarda Açar Veya Sıfırlar.**
> <:saret:816334316896387142> \`?reklamengel kanal #kanal • ?reklamengel hepsi • ?reklamengel kapat\` **=> Reklam Engelleme Sistemi Belirli Kanala Veya Bütün Kanallarda Açar Veya Sıfırlar.**
> <:saret:816334316896387142> \`?spamengel aç • ?spamengel kapat\` **=> Spam Engeli Açarsın/Kapatırsın.**

`
  for (var i = 0; i < (Math.floor(atilacak.length/2000)); i++) {
    message.channel.send(embed.setDescription(atilacak.slice(0, 2000)));
    atilacak = atilacak.slice(2000);
  };
  if (atilacak.length > 0) message.channel.send(embed.setDescription(atilacak));
     
    
    
  }
  
  
  
  
          if(args[0] === "logo") {
    
 let embed = new Discord.MessageEmbed()   
   .setThumbnail(client.user.avatarURL())
   .setImage('https://media.discordapp.net/attachments/812003450241417336/812052399288090666/CBanner7.png')
 .setColor("#DARKBLUE")
 .addField(`» Bağlantı Adresleri`, `[**Bot Davet Linki**](https://discord.com/oauth2/authorize?client_id=783068430156824617&scope=bot&permissions=805314622) **•** [**Celestial Support**](https://discord.gg/WTwhWP5Fgv) **•** [**Sitemiz**](http://celestialbot.ml/) **•**`)        .setFooter(`🔵 Celestial Sizler İçin Burda!`, client.user.avatarURL())  .setImage('https://media.discordapp.net/attachments/812003450241417336/812052399288090666/CBanner7.png')
 let atilacak = `**<:kullan:778939804216721429> Celestial - Logo Yardım Menüsü** \n \n  Merhaba ${message.author} Bu Menü Logo Menüsüdür..

**•----------------------------------- © --------------------•**

> <:saret:816334316896387142> \`?logo-efsane (Yazı)\` **=> Efsane Logo Atar.**
> <:saret:816334316896387142> \`?logo-ejderha (Yazı)\` **=> Ejderha Logo Atar.**
> <:saret:816334316896387142> \`?logo-flash (Yazı)\` **=> Flash Logo Atar.**
> <:saret:816334316896387142> \`?logo-gamer (Yazı)\` **=> Gamer Logo Atar.**
> <:saret:816334316896387142> \`?logo-garifiti (Yazı)\` **=> Grafiti Logo Atar.**
> <:saret:816334316896387142> \`?logo-köpek (Yazı)\` **=> Köpek Logo Atar.**
> <:saret:816334316896387142> \`?logo-örümcek (Yazı)\` **=> Örümcek Logo Atar.**
> <:saret:816334316896387142> \`?logo-roket (Yazı)\` **=> Roket Logo Atar.**
> <:saret:816334316896387142> \`?logo-whatsapp (Yazı)\` **=> Efsane Logo Atar.**
> <:saret:816334316896387142> \`?logo-yesil (Yazı)\` **=> Efsane Logo Atar.**



`
  for (var i = 0; i < (Math.floor(atilacak.length/2000)); i++) {
    message.channel.send(embed.setDescription(atilacak.slice(0, 2000)));
    atilacak = atilacak.slice(2000);
  };
  if (atilacak.length > 0) message.channel.send(embed.setDescription(atilacak));
     
    
    
  }

  if(args[0] === "premium") {
    
    let embed = new Discord.MessageEmbed()   
      .setThumbnail(client.user.avatarURL())
     .setImage('https://media.discordapp.net/attachments/812003450241417336/812052399288090666/CBanner7.png')
    .setColor("#DARKBLUE")
    .addField(`» Bağlantı Adresleri`, `[**Bot Davet Linki**](https://discord.com/oauth2/authorize?client_id=783068430156824617&scope=bot&permissions=805314622) **•** [**Celestial Support**](https://discord.gg/WTwhWP5Fgv) **•** [**Sitemiz**](http://celestialbot.ml/) **•**`)        .setFooter(`🔵 Celestial Sizler İçin Burda!`, client.user.avatarURL())  .setImage('https://media.discordapp.net/attachments/812003450241417336/812052399288090666/CBanner7.png')
    let atilacak = `**<:koruma:778939803693088818> Celestial - Premium Yardım Menüsü** \n \n  Merhaba ${message.author} Premium İçin Özel Komutlar.
   
   **•----------------------------------- © --------------------•**
   
   > <:saret:816334316896387142> \`?yardım-otocevap\` **=> Oto Cevap Sistemi Nasıl Kurulucağını Gösterir.**
   
   `
     for (var i = 0; i < (Math.floor(atilacak.length/2000)); i++) {
       message.channel.send(embed.setDescription(atilacak.slice(0, 2000)));
       atilacak = atilacak.slice(2000);
     };
     if (atilacak.length > 0) message.channel.send(embed.setDescription(atilacak));
        
       
       
     }

}
};

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'yardım', 
  description: '',
  usage: ''
};

