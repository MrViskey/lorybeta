const Discord = require('discord.js');
const  {  MessageEmbed} = require('discord.js');
const db = require("quick.db")
const moment = require('moment')
moment.locale('tr')
exports.run = async (client, message, args) => {

var verificationLevel,ExplicitContentFilterLevel,afkTimeout,region,hareketliEmoji='',hareketsizEmoji=''
  if(message.guild.verificationLevel =='NONE') verificationLevel='Aktif değil'
  if(message.guild.verificationLevel =='LOW') verificationLevel='Düşük düzey'
  if(message.guild.verificationLevel =='MEDIUM') verificationLevel='Normal düzey'
  if(message.guild.verificationLevel =='HIGH') verificationLevel='Üst düzey'
  if(message.guild.verificationLevel =='VERY_HIGH') verificationLevel='En üst düzey'
  if(message.guild.explicitContentFilter == 'DISABLED') ExplicitContentFilterLevel = 'Aktif değil'
  if(message.guild.explicitContentFilter == 'MEMBERS_WITHOUT_ROLES') ExplicitContentFilterLevel ='Orta düzey'
  if(message.guild.explicitContentFilter == 'ALL_MEMBERS') ExplicitContentFilterLevel ='Üst düzey'
  if(message.guild.afkTimeout == 60) afkTimeout = '1 dakika'
  if(message.guild.afkTimeout == 300) afkTimeout = '5 dakika'
  if(message.guild.afkTimeout == 900) afkTimeout = '15 dakika'
  if(message.guild.afkTimeout == 1800) afkTimeout = '30 dakika'
  if(message.guild.afkTimeout == 3600) afkTimeout = '1 saat'
  if(message.guild.region == 'us-west') region ='Batı Amerika'
  if(message.guild.region == 'us-east') region ='Doğu Amerika'
  if(message.guild.region == 'us-central') region ='Amerika merkez'
  if(message.guild.region == 'us-south') region = 'Güney Amerika'
  if(message.guild.region == 'singapore') region ='Singapur'
  if(message.guild.region == 'south-africa') region ='Güney Afrika'
  if(message.guild.region == 'sydney') region ='Sidney'
  if(message.guild.region == 'europe') region ='Avrupa'
  if(message.guild.region == 'brazil') region ='Brezilya'
  if(message.guild.region == 'hong-kong') region ='Hong Kong'
  if(message.guild.region == 'russia') region ='Rusya'
  if(message.guild.region == 'japan') region ='Japonya'
  if(message.guild.region == 'india') region ='Hindistan'
  message.guild.emojis.cache
  .filter(a=>a.animated == true)
  .forEach(a=>hareketliEmoji+=`<a:${a.name}:${a.id}>`)
  
  message.guild.emojis.cache
  .filter(a=>a.animated == false)
  .forEach(a=>hareketsizEmoji+=`<:${a.name}:${a.id}>`)
  
  console.log(message.guild.region)
  const embed = new MessageEmbed()
  .setColor('#DARKBLUE')
  .setTimestamp()
  .setTitle(message.guild.name)
  .setFooter(`${client.user.username} Sunucu bilgi sistemi.`,message.guild.iconURL({dynamic:true}))
  .addField('Sunucu ismi:',message.guild.name,true)
  .addField('ID:',message.guild.id,true)
  .addField('Oluşturulma tarihi:',moment(message.guild.createdAt).format('DD-MM-YYYY hh:mm:ss'),true)
  .addField('Sunucu konum:',region,true)
  .addField('Üye sayısı:',message.guild.members.cache.filter(a=>a.user.bot == false).size,true)
  .addField('Bot sayısı:',message.guild.members.cache.filter(a=>a.user.bot).size,true)
  .addField('Kanal sayısı:',message.guild.channels.cache.size,true)
  .addField('Yazışma kanalı sayısı:',message.guild.channels.cache.filter(a=>a.type =='text').size,true)
  .addField('Ses kanalı sayısı:',message.guild.channels.cache.filter(a=>a.type =='voice').size,true)
  .addField('Afk kanalı:',message.guild.afkChannel? message.guild.afkChannel.name: 'Yok',true)
  .addField('Afk süre aşımı:',afkTimeout,true)
  .addField('Sunucu doğrulama seviyesi:',verificationLevel,true)
  .addField('Sunucu sakıncalı medya içerigi filtresi:',ExplicitContentFilterLevel,true)
  .addField('Sunucu discord tarafından onaylımı?:',message.guild.verified? "Evet":"Hayır",true)
  .addField('Sunucu boostlanma sayısı:',message.guild.premiumSubscriptionCount,true)
  .addField('Emoji sayısı:',message.guild.emojis.cache.size,true)
  .setThumbnail(message.guild.iconURL({size:4096,dynamic:true}))
  message.channel.send(embed)
};

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ["sunucu-bilgi","sb"],
  permLevel: 0
};

exports.help = {
  name: 'sunucubilgi', 
  description: '',
  usage: ''
};

