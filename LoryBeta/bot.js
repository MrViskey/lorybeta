const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');
const canvacord = require("canvacord");
const ms = require("ms");
const linkkontrol = require("node-fetch");

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permLevel = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permLevel = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permLevel = 3;
  if (ayarlar.sahip.includes(message.author.id)) permLevel = 4;
  return permLevel;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

// -------------------------- GOLD -------------------------
// ---------------------- BİLET SİSTEMİ -----------------------------

client.on("messageReactionAdd",async (reaction,user) => {
  try {
  let message = reaction.message;
   if(user.bot) return;
  let split = '';
  let usr = user.id.split(split);
  for (var i = 0; i < usr.length; i++) usr[i] = usr[i].trim();
  
  

    if(reaction.emoji.name === "🗑️"){
      if(message.channel.id == db.get(`biletkanall.${message.guild.id}.${message.channel.id}`)) {
         message.channel.delete();
      }
    }
  
  
  
  
if(message.channel.id == db.get(`bilet.${message.guild.id}`)) {  
  
   
  if(reaction.emoji.name === "🎟️"){
    if(message.guild.channels.cache.find(c => c.name === `bilet-${usr[0]}${usr[1]}${usr[2]}${usr[3]}`)) return  reaction.users.remove(user.id);
     if(!message.guild.channels.cache.find(c => c.name === `bilet-${usr[0]}${usr[1]}${usr[2]}${usr[3]}`)){
       reaction.users.remove(user.id)
         let role = message.guild.roles.cache.find(r => r.name === "Bilet Desteği");
       if(!role) {
          message.guild.roles.create({data:{name: "Bilet Desteği", permissions: 0}, reason: 'Celestial Bot | Bilet Sistemi'});
          reaction.users.remove(user.id);
          return
        }
       
       let categoria = message.guild.channels.cache.find(c => c.name == "biletler" && c.type == "category");
        if(!categoria) categoria = await message.guild.channels.create("biletler", {type: "category", position: 1})
       
             let permsToHave = ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS']

        message.guild.channels.create(`bilet-${usr[0]}${usr[1]}${usr[2]}${usr[3]}`, { permissionOverwrites:[
          {
            deny: 'VIEW_CHANNEL',
            id: message.guild.id
          },
          {
            allow: permsToHave,
            id: user.id
          },
          {
            allow: permsToHave,
            id: role.id
          },
        ],
        parent: categoria.id,
        reason: `Bilet Sistemi`
      }).then(kanal => {
    
          
        kanal.send(`${user}`)
          db.set(`biletkanall.${message.guild.id}.${kanal.id}`,kanal.id)
          let embed = new Discord.MessageEmbed()
          .setTitle(`Celestial Bot Bilet Sistemi`)
          .setColor("#DARKBLUE")
          .setFooter("🔮 Tüm Hakları Saklıdır.")
          .setDescription(`Desteği Kapatmak İçin 🗑️ Tepkisine Tıklayınız`)
        kanal.send(embed).then(x => {
          x.react("🗑️")
        })
     })
      }
    
  }
  
  }
}catch{}
})


// --------------------------- MOD LOG --------------------------

client.on('channelUpdate', async channel => {
  try {
  const guild = channel.guild;
  const logKanalID = await db.fetch(`logKanal_${guild.id}`)
  if(logKanalID == null || !logKanalID) return
  const logKanal = guild.channels.cache.get(logKanalID)
  guild.fetchAuditLogs(11).then(a=>{
    const kanal = a.entries.first()
    var degişiklik;
    var multiply;
    if(kanal.changes[0].key =='name') {
      degişiklik = 'İsim güncellemesi.'
      multiply = `Eski isim: ${kanal.changes[0].old}\nYeni isim: ${kanal.changes[0].new}`
    }
    if(kanal.changes[0].key =='nsfw') {
        degişiklik = 'NSFW'
      if(kanal.changes[0].old == false) {
       multiply = `NSFW Özelliği açıldı.`
      }
      else if(kanal.changes[0].old == true) multiply = `NSFW Özelligi kapatıldı.`
    }
    if (kanal.changes[0].key == "id") {
      degişiklik = "Kanaldaki bir rolün yada kişinin yetkisi güncellendi.";
      if (kanal.changes[1].key == "type") {
        if (kanal.changes[1].old == "member" || kanal.changes[1].new == "member") {
          if (kanal.changes[1].old == "member") {
            multiply = `<@${kanal.changes[0].old}>'in üzerinde birşeyler oldu.`;
          } else {
            multiply = `<@${kanal.changes[0].new}>'in üzerinde birşeyler oldu.`;
          }
        } else if (kanal.changes[1].old == "role" || kanal.changes[1].new == "role") {
          if (kanal.changes[1].old == "role") {
            multiply = `<@&${kanal.changes[0].old}>'in üzerinde birşeyler oldu.`;
          } else {
            multiply = `<@&${kanal.changes[0].new}>'in üzerinde birşeyler oldu.`;
          }
        }
      }
    }else if(kanal.changes[0].key.includes('allow')) return
   if(kanal.changes[0].key == 'rate_limit_per_user') {
     degişiklik = 'Kanaldaki mesaj atma süresi güncellendi.'
     if(kanal.changes[0].old != 0) {
       multiply = `Kanalın mesaj gönderilme süresi kapatıldı.`
     }else if (kanal.changes[0].old == 0) {
       multiply = `Kanalın mesaj gönderilme süresi ayarlandı. Süre: ${kanal.changes[0].new} Saniye.`
     }
   }
    var user = a.entries.first().executor
    const embed = new Discord.MessageEmbed()
    .setColor('#DARKBLUE')
    .setTitle('Kanal güncellendi.')
    .addField('Kanalı Güncelliyen:',user.username,true)
    .addField('Güncellenen kanal:',kanal.target.name,true)
    .addField('Güncellenen:',degişiklik,true)
    .addField('Güncelleme Bilgisi:',multiply,true)
    .setFooter(`${client.user.username} Log sistemi.`,guild.iconURL({dynamic:true}))
    .setTimestamp()
    logKanal.send(embed)
  })
  } catch{}
})
client.on('channelCreate', async channel => {
  try {
    if(!channel.guild) return
    const  guild = channel.guild;
    const logKanalID = await db.fetch(`logKanal_${guild.id}`)
    if(logKanalID == null || !logKanalID) return
    const logKanal = guild.channels.cache.get(logKanalID)
    guild.fetchAuditLogs(10).then(a=>{
    const kanal = a.entries.first()
    const user = a.entries.first().executor
    const embed = new Discord.MessageEmbed()
    .setColor('#DARKBLUE')
    .setTitle('Kanal oluşturuldu.')
    .addField('Kanalı oluşturan:',user.username,true)
    .addField('Kanalın ismi:',kanal.target.name,true)
    .addField('Kanal ID:',kanal.target.id,true)
    .setFooter(`${client.user.username} Log sistemi.`,guild.iconURL({dynamic:true}))
    .setTimestamp()
    logKanal.send(embed)
   })   
  } catch{}
})
client.on('channelDelete', async channel => {
  try {
    const  guild = channel.guild;
    const logKanalID = await db.fetch(`logKanal_${guild.id}`)
    if(logKanalID == null || !logKanalID) return
    const logKanal = guild.channels.cache.get(logKanalID)
    guild.fetchAuditLogs(12).then(a=>{
    const kanal = a.entries.first()
    const user = a.entries.first().executor
    const embed = new Discord.MessageEmbed()
    .setColor('#DARKBLUE')
    .setTitle('Kanal silindi.')
    .addField('Kanalı silen:',user.username,true)
    .addField('Kanalın ismi:',channel.name,true)
    .addField('Kanal ID:',channel.id,true)
    .setFooter(`${client.user.username} Log sistemi.`,guild.iconURL({dynamic:true}))
    .setTimestamp()
    logKanal.send(embed)
   })   
  } catch{}
})
client.on('emojiCreate', async emoji => {
  try {
    const guild = emoji.guild;
    const logKanalID = await db.fetch(`logKanal_${guild.id}`)
    if(logKanalID == null || !logKanalID) return
    const logKanal = guild.channels.cache.get(logKanalID)
    guild.fetchAuditLogs(60).then(a=>{
    const user = a.entries.first().executor
    const embed = new Discord.MessageEmbed()
    .setColor('#DARKBLUE')
    .setTitle('Emoji oluşturuldu.')
    .addField('Emojiyi oluşturan:',user.username,true)
    .addField('Emoji ismi:',emoji.name,true)
    .addField('Emoji ID:',emoji.id,true)
    .setThumbnail(emoji.url)
    .setFooter(`${client.user.username} Log sistemi.`,guild.iconURL({dynamic:true}))
    .setTimestamp()
    logKanal.send(embed)
    })
  } catch{}
})
client.on('emojiDelete', async emoji => {
  try {
    const guild = emoji.guild;
    const logKanalID = await db.fetch(`logKanal_${guild.id}`)
    if(logKanalID == null || !logKanalID) return
    const logKanal = guild.channels.cache.get(logKanalID)
    guild.fetchAuditLogs(62).then(a=>{
    const user = a.entries.first().executor
    const embed = new Discord.MessageEmbed()
    .setColor('#DARKBLUE')
    .setTitle('Emoji silindi.')
    .addField('Emojiyi silen:',user.username,true)
    .addField('Emoji ismi:',emoji.name,true)
    .addField('Emoji ID:',emoji.id,true)
    .setThumbnail(emoji.url)
    .setFooter(`${client.user.username} Log sistemi.`,guild.iconURL({dynamic:true}))
    .setTimestamp()
    logKanal.send(embed)
    })
  } catch{}
})
client.on('roleCreate', async role => {
  try {
  const guild = role.guild;
  const logKanalID = await db.fetch(`logKanal_${guild.id}`)
  if(logKanalID == null || !logKanalID) return
  const logKanal = guild.channels.cache.get(logKanalID)
  guild.fetchAuditLogs(30).then(a=>{
  const rol = a.entries.first()
  const user = a.entries.first().executor
  const embed = new Discord.MessageEmbed()
    .setColor('#DARKBLUE')
    .setTitle('Rol oluşturuldu.')
    .addField('Rolü oluşturan:',user.username,true)
    .addField('Oluşturulan rol:',rol.target.name,true)
    .addField('Rol ID:',role.id,true)
    .setFooter(`${client.user.username} Log sistemi.`,guild.iconURL({dynamic:true}))
    .setTimestamp()
    logKanal.send(embed)
   })
    } catch{}
})
client.on('roleDelete', async role => {
  try {
  const guild = role.guild;
  const logKanalID = await db.fetch(`logKanal_${guild.id}`)
  if(logKanalID == null || !logKanalID) return
  const logKanal = guild.channels.cache.get(logKanalID)
  guild.fetchAuditLogs(32).then(a=>{
  const rol = a.entries.first()
  const user = a.entries.first().executor
  const embed = new Discord.MessageEmbed()
    .setColor(role.hexColor)
    .setTitle('Rol silindi.')
    .addField('Rolü silen:',user.username,true)
    .addField('Silinen rol:',role.name,true)
    .addField('Rol ID:',role.id,true)
    .setFooter(`${client.user.username} Log sistemi.`,guild.iconURL({dynamic:true}))
    .setTimestamp()
    logKanal.send(embed)
   })
    } catch{}
})

client.on('messageUpdate', async (oldMessage,newMessage) =>{
  try {
  if(!oldMessage.guild && !newMessage.guild) return
  if( newMessage == '') return
  if(oldMessage.author.bot && newMessage.author.bot) return
  const guild = oldMessage.guild || newMessage.guild
  const logKanalID = await db.fetch(`logKanal_${guild.id}`)
  if(logKanalID == null || !logKanalID) return
  const logKanal = guild.channels.cache.get(logKanalID)
  const embed = new Discord.MessageEmbed()
   .setColor('#DARKBLUE')
     .setTitle('Mesaj güncellendi.')
     .addField('Mesaj sahibi:',oldMessage.author.tag)
     .addField('Eski mesaj:',oldMessage,true)
     .addField('Yeni mesaj:',newMessage,true)
     .setFooter(`${client.user.username} Log sistemi.`,guild.iconURL({dynamic:true}))
     .setTimestamp()
     .setThumbnail(oldMessage.author.avatarURL({size:4096,dynamic:true}))
    logKanal.send(embed)
  } catch{}
})
client.on('messageDelete', async message => {
  try {
    
   if(!message.guild) return
  if(message.author.bot) return
  const guild = message.guild
  const logKanalID = await db.fetch(`logKanal_${guild.id}`)
  if(logKanalID == null || !logKanalID) return
  const logKanal = guild.channels.cache.get(logKanalID)
  const embed = new Discord.MessageEmbed()
   .setColor('#DARKBLUE')
     .setTitle('Mesaj silindi.')
     .addField('Mesaj sahibi:',message.author.tag)
     .addField('Silinen mesaj:',message.content,true)
     .setFooter(`${client.user.username} Log sistemi.`,guild.iconURL({dynamic:true}))
     .setTimestamp()
     .setThumbnail(message.author.avatarURL({size:4096,dynamic:true}))
    logKanal.send(embed)
    } catch{}
})


//----------------------- SA-AS -------------------------

client.on("message",async message => {
try {
  if(message.author.bot) return;
  if(db.get(`saas.${message.guild.id}`) === true) {
   if (message.content.toLowerCase() === 'sa' || message.content.toLowerCase() === 'selam' || message.content.toLowerCase() === 'selamın aleyküm' || message.content.toLowerCase() === 'selamun aleyküm' || message.content.toLowerCase() === 'selamün aleyküm') {
  message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot", client.user.avatarURL()).setColor("#darkblue").setDescription(`<:duyuru:778939801025642497> Aleyküm Selam, ${message.author} Hoş Geldin!`))
    message.react("722343162151960576")
  }
  }
}catch{}
});

// ----------------------- Gold -----------------------

client.on("message", async msg => {
  const db = require("quick.db");
  const ms2 = require("parse-ms");
  let timeout = 600000; //süresini dilediğiniz gibi kısaltabilirsiniz. default : 600000
  let dakdest = 1;
  let i = db.fetch(`üyelikk_${msg.author.id}`);
  if (db.has(`üyelikk_${msg.author.id}`) == true) {
    if (dakdest !== null && timeout - (Date.now() - dakdest) > 0) {
      let time = ms2(timeout - (Date.now() - dakdest));
    } else {
      if (msg.author.bot) return;
      if(msg.content.size > 32){
        var embed = new Discord.MessageEmbed()
        .setAuthor(`Celestial`,`${msg.author.avatarURL() || msg.author.displayAvatarURL()}`)
        .setDescription(`<:duyuru:778939801025642497> Hizzaya Geçin! Burada Bir Gold Üye Belirdi! <@${msg.author.id}>`)
        .setColor("GOLD")
        msg.channel.send(embed).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
      }
    }
  } else if (i == undefined) {
  }
  if (!i) return;
});

// ----------------------- KÜFÜR ENGEL ----------------------

client.on("message",async message => {
  try {
  if(!db.get(`küfürengel.${message.channel.id}.${message.guild.id}`)) return;
  let küfür = require("./events/küfür.json")
 let kelimeler = message.content.slice(" ").split(/ +/g)
 if(küfür.some(kufur => kelimeler.some(kelime => kelime.toLowerCase() === kufur.toLowerCase()))) {
if (message.member.hasPermission("BAN_MEMBERS")) return;

message.delete()
message.channel.send(`Hey ${message.author}, Bu Sunucuda Küfür Edemezsin! :rage:`).then(x => x.delete({timeout: 6000}))
}
} catch{};
});

// ---------------------- REKLAM ENGEL -----------------------------

client.on("message",async message => {
  try {
  if(!db.get(`reklamengel.${message.channel.id}.${message.guild.id}`)) return;
  let küfür = require("./events/reklamlar.json")
  if (küfür.some(word => message.content.toLowerCase().includes(word))) {
if (message.member.hasPermission("BAN_MEMBERS")) return;
    
message.delete()
message.channel.send(`Hey ${message.author}, Bu Sunucuda Reklam Yapamazsın! :rage:`).then(x => x.delete({timeout: 6000}))
}

} catch{};
});

// -------------------- SPAM ENGEL ------------------------------------

client.on("message", async msg => {
  try {
    const AntiSpam = require("./events/spamengel.js");
const cooldown = new Set();
      let spamkorumasi = await db.fetch(`spamengel.${msg.guild.id}`);
     if (spamkorumasi == 'kapali') return;
    if (spamkorumasi == 'acik') {
if (client.user.id == msg.author.id) return;
  AntiSpam(client, msg);
  if (cooldown.has(msg.author.id)) {
    return;
}
  }
  } catch{}
  });

// -------------------------- OTOROL ------------------------

client.on("guildMemberAdd", async member => {
   try {
  let botrol = db.get(`otorol.rol.botrol.${member.guild.id}`)
  let üyerol = db.get(`otorol.rol.${member.guild.id}`)
  let kanal = db.get(`otorol.kanal.${member.guild.id}`)
  let rol = member.guild.roles.cache.get(üyerol)
  if(üyerol) {
    if(!üyerol) return;
  if(member.user.bot === true) return;
    if(member.user.bot === false) {
      üyerol.forEach(async x => {
 member.roles.add(x)
      })
      }
   }
   
  if(member.user.bot === true) {
    if(!botrol) return;
    if(botrol) {
    member.roles.add(botrol)
    }
  }


    const bitecegizamanms = Date.now()
  var embed = new Discord.MessageEmbed()
  .setColor("#DARKBLUE")
  .setAuthor("Celestial Bot",client.user.avatarURL())
  .setFooter("✨ Rolün Verildiği Zaman:")
  .setTimestamp(bitecegizamanms)//<:king:722343161665421312> 
  .setThumbnail("https://cdn.discordapp.com/emojis/722343161665421312.png?v=1")
  .setDescription(`<:YldzPng:764085692102868993> **| Sunucuya Hoşgeldin** \`${member.user.tag}\` **Umarım İyi Vakit Geçirirsin! Otorolün Başarıyla Verildi <:arp:777142378557341746>**`)
  .setImage("https://media.discordapp.net/attachments/697145772801785876/716671769355747348/1.gif")
if(kanal) {
    if(!kanal) return;
  client.channels.cache.get(kanal).send(embed)
}
   }catch{}
})

// ------------------------- SAYAÇ ----------------------

client.on("guildMemberAdd",async member =>{
  let kanal = db.get(`sayackanal.${member.guild.id}`)
  let sayi = db.get(`sayacsayi.${member.guild.id}`)
  if(!kanal) return; 
  if(!sayi) return;
  if(kanal) {
    if(sayi) {
  if(!kanal) return; 
  if(!sayi) return;
      var embed = new Discord.MessageEmbed()
      .setAuthor("Celestial Bot", client.user.avatarURL())
      .setColor("#DARKBLUE")
      .setFooter("🔵 Celestial Tüm Hakları Gizlidir.")
      .setDescription(`**Sunucuya Hoşgeldin** \`${member.user.tag}\` **! Seninle Beraber** \`${member.guild.memberCount}\` **Kişi Olduk.** \`${sayi}\` **Kişi Olmaya** \`${sayi - member.guild.memberCount}\` **Kadar Kişi Kaldık. |** <:Gncelleme:777142378560618506>`)
      .setImage("https://images-ext-1.discordapp.net/external/TtWbCzA2aj1MQsrftMK8GPNxUQ4Sqk3TZiuVIEt2vFg/https/media.discordapp.net/attachments/810649353135456307/810893450302980096/CBanner.png")
      client.channels.cache.get(kanal).send(embed)
    }
    if(sayi == member.guild.memberCount){
    let yazilmamis = member.guild.memberCount + 50
    db.set(`sayacsayi.${member.guild.id}`,yazilmamis)
      if(kanal) {
        if(!kanal) return;
      client.channels.cache.get(kanal).send(`Tebrikler ${sayi} Üye Olduk Sayaç Sayısı Tekrar Otomatik ${yazilmamis} Olarak Ayarlandı Ayarlamak İçin (?sayaç ayarla #kanal sayı)`)
    }
    }
  }
   })

client.on("guildMemberRemove",async member => {
   
   let kanal = db.get(`sayackanal.${member.guild.id}`)
  let sayi = db.get(`sayacsayi.${member.guild.id}`)
  if(!kanal) return; 
  if(!sayi) return;
  if(kanal) {
    if(sayi) {
  if(!kanal) return; 
  if(!sayi) return;
      var embed = new Discord.MessageEmbed()
      .setAuthor("Celestial Bot", client.user.avatarURL())
      .setColor("#darkblue")
      .setFooter("🔵 Celestial Tüm Hakları Gizlidir.")
      .setDescription(`**Sunucuya Bir Üyemiz Ayrıldı :cry:** \`${member.user.tag}\` **! Onunla Beraber** \`${member.guild.memberCount}\` **Kişi Olduk.** \`${sayi}\` **Kişi Olmaya** \`${sayi - member.guild.memberCount}\` **Kadar Kişi Kaldık. |** <:Eksilme:777142378607280169>`)
      .setImage("https://images-ext-1.discordapp.net/external/TtWbCzA2aj1MQsrftMK8GPNxUQ4Sqk3TZiuVIEt2vFg/https/media.discordapp.net/attachments/810649353135456307/810893450302980096/CBanner.png")
      client.channels.cache.get(kanal).send(embed)
    }
    }
   }
)

// ------------------------- ROLKOMUT ----------------------

  client.on("message",async message => {
    try {
    if(!message.guild) return;
    let rolkomut = db.get(`rolkomut.${message.guild.id}`)
  if(!rolkomut) return;
  if(rolkomut) {
    for(var i in rolkomut) {
  if(message.content === "?"+rolkomut[i].komut) {
    message.member.roles.add(rolkomut[i].rol)
    message.channel.send(new Discord.MessageEmbed().setAuthor("Celestial Bot", client.user.avatarURL()).setColor("#DARKBLUE").setFooter("🔵 Celestial Tüm Hakları Gizlidir.").setDescription(`<:arp:777142378557341746> **| ${message.guild.roles.cache.has(rolkomut[i].rol) ? message.guild.roles.cache.get(rolkomut[i].rol) : "@Bilinmeyen Rol"} Adlı Rolü Kaptın :D**`))
  }
  }  
  } 
}catch{} 
  })

// ------------------- HG BB ------------------

const Canvas = require('canvas')
client.on('guildMemberAdd', async member => {
  const ch = db.get(`hgbbKanalResim_${member.guild.id}`)
  if(!ch) return
  const kanal = member.guild.channels.cache.get(ch)
  const canvas =  Canvas.createCanvas(1980,1080)
  const ctx =  canvas.getContext('2d')
  const userImage = await Canvas.loadImage(member.user.displayAvatarURL({format:'jpg',size:4096}))
  const bg = await Canvas.loadImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-2YMnOcscL37z_OfV1xgaIYo2mzByCSK3Vg&usqp=CAU')
  const door = await Canvas.loadImage('https://cdn.glitch.com/16c1f2c8-0b25-4605-89ff-c86675c38573%2F1594111765064.png?v=1594111792947')
  ctx.drawImage(bg,0,0,canvas.width,canvas.height)
  ctx.drawImage(door,0,915,150,150)
  ctx.font = '100px Candara'
  ctx.fillStyle ="#F0F8FF"
  ctx.textAlign ='center'
  ctx.fillText(member.user.username,1000,780)
  ctx.fillText('Sunucumuza Hoşgeldin.',1000,950)
  ctx.lineWidth = 10
  ctx.beginPath()
  ctx.shadowColor='black'
  ctx.shadowBlur =100
  ctx.arc(1020,350,270,0,Math.PI*2,true)
  ctx.closePath()
  ctx.stroke()
  ctx.clip()
  ctx.drawImage(userImage,725,55,590,590)
  const attachment = new Discord.MessageAttachment(canvas.toBuffer(),'hoşgeldin.png')
  if(!kanal)return;
  kanal.send(attachment)
  })
client.on('guildMemberRemove', async member => {
  const ch =  db.get(`hgbbKanalResim_${member.guild.id}`)
  if(!ch) return
  const kanal = member.guild.channels.cache.get(ch)
  const canvas =  Canvas.createCanvas(1980,1080)
  const ctx =  canvas.getContext('2d')
  const userImage = await Canvas.loadImage(member.user.displayAvatarURL({format:'jpg',size:4096}))
  const bg = await Canvas.loadImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-2YMnOcscL37z_OfV1xgaIYo2mzByCSK3Vg&usqp=CAU')
  const door = await Canvas.loadImage('https://cdn.glitch.com/16c1f2c8-0b25-4605-89ff-c86675c38573%2F1594111773688.png?v=1594111787318')
  ctx.drawImage(bg,0,0,canvas.width,canvas.height)
  ctx.drawImage(door,1829,915,150,150)
  ctx.font = '100px Candara'
  ctx.fillStyle ="#F0F8FF"
  ctx.textAlign ='center'
  ctx.fillText(member.user.username,1000,780)
  ctx.fillText('Sunucumuzdan Ayrıldı.',1000,950)
  ctx.lineWidth = 10
  ctx.beginPath()
  ctx.shadowColor='black'
  ctx.shadowBlur =100
  ctx.arc(1020,350,270,0,Math.PI*2,true)
  ctx.closePath()
  ctx.stroke()
  ctx.clip()
  ctx.drawImage(userImage,725,55,590,590)
  ctx.blur = 3
  const attachment = new Discord.MessageAttachment(canvas.toBuffer(),'gülegüle.png')
  if(!kanal) return;
  kanal.send(attachment)
  })
client.on('message', (message) => {
 if(!message.guild || message.author.bot || message.content.startsWith(prefix)) return;
  db.add(`levels.${message.author.id}.xp`, 2)
  if(db.get(`levels.${message.author.id}.xp`) >= 155){
    db.add(`levels.${message.author.id}.level`, 1)
    db.delete(`levels.${message.author.id}.xp`)
  }
  
})

// ------------------ KATIL AYRIL -----------------------

client.on("message", async message => {
  if (message.content === "?katıl") {
    client.emit(
      "guildMemberAdd",
      message.member || (await message.guild.fetchMember(message.author))
    );
  }
});




client.on("message", async message => {
  if (message.content === "?ayrıl") {
    client.emit(
      "guildMemberRemove",
      message.member || (await message.guild.fetchMember(message.author))
    );
  }
});

// ----------------------------- TEPKİ ROL -------------------------

client.on('raw', async event => {
  try {
  if(events) {
    if (!events.hasOwnProperty(event.t)) return;
    const { d: data } = event;
    const anto = client.users.cache.get(data.user_id);
    const channel = client.channels.cache.get(data.channel_id) || await anto.createDM();
    if (channel.messages.cache.has(data.message_id)) return;
    const message = await channel.messages.fetch(data.message_id);
    const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
    const reaction = message.reactions.cache.get(emojiKey);
    client.emit(events[event.t], reaction, anto);
  }
  event.react(emojiKey)
}catch{}
});
client.on('messageReactionAdd', (reaction, user) => {
  try {
 let message = reaction.message

  let sistem = db.fetch(`${reaction.message.guild.id}.emoji`);
  if(sistem) {
for(var i in sistem) {
  if (reaction.message.id == sistem[i].mesaj) {
    if (reaction.emoji.name == sistem[i].emoji) {
      
      const mem = reaction.message.guild.members.cache.get(user.id)
if(mem.user.bot) return
mem.roles.add(sistem[i].rol)
   }
  }
  }
}
  }catch{}
});  
client.on('messageReactionRemove', (reaction, user) => {
  try {
 let message = reaction.message
  let sistem = db.fetch(`${message.guild.id}.emoji`);
  if(sistem) {
  for(var i in sistem) {

  if (reaction.message.id == sistem[i].mesaj) {
    if (reaction.emoji.name == sistem[i].emoji) {
      
      const mem = message.guild.members.cache.get(user.id)
if(mem.user.bot) return
mem.roles.remove(sistem[i].rol)
    }
    }
  }
}
  }catch{}
});

//-----------------------OTOCEVAP-----------------------\\



client.on('message', async msg => {
  let ozelkomut = await db.fetch(`sunucuKomut_${msg.guild.id}`);
  let ozelkomutYazi;
  if (ozelkomut == null) ozelkomutYazi = 'Burayı silme yoksa hatalı olur'
  else ozelkomutYazi = ''+ ozelkomut +''
  if (msg.content.toLowerCase() === ozelkomutYazi) {
      let mesaj = await db.fetch(`sunucuMesaj_${msg.guild.id}`);
  let mesajYazi;
  if (mesaj == null) mesajYazi = 'Burayı silme yoksa hatalı olur'
  else mesajYazi = ''+ mesaj +''
    msg.channel.send(mesajYazi)
  }
});

client.on("message", msg => {
  //let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "!";
  const celestial = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`**Prefixim: __?__**\n **Yardım için: __?yardım__**`)
if (msg.content.includes(`<@${client.user.id}>`) || msg.content.includes(`<@!${client.user.id}>`)) {
  msg.channel.send(celestial);
}
});

client.on("ready", () => {
  client.channels.cache.get('821308207581364244').join();//SES KANALI İDSİ GİRİN!
  });