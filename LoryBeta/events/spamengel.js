const Discord = require("discord.js");
var MessageData = [];
module.exports = (client, msg) => {
  try {
  if (msg.channel.name === undefined){
  }else{
if (msg.member.hasPermission("BAN_MEMBERS")) {
      return;
}
  if (MessageData[msg.author.id] === undefined) {
    MessageData[msg.author.id] = { MesssageNumber: 0, LastMessage: [] };
    setTimeout(() => {
      delete MessageData[msg.author.id];
    }, 4000);
  }
  MessageData[msg.author.id].MesssageNumber += 1;

  MessageData[msg.author.id].LastMessage.push(msg);


  if (MessageData[msg.author.id].MesssageNumber >= 5) {
    if (msg.deletable) msg.delete();
      const sendeddd = new Discord.MessageEmbed()
        .setColor("#DARKBLUE")
      .setAuthor("Celestial Bot", client.user.avatarURL())
        .setDescription(msg.author.tag + " **\`Spam Yapmayı Kes Yoksa Susturulursun!\`**")
      msg.channel.send(sendeddd).then(stopspam => {
        setTimeout(() => {
          stopspam.delete();
        }, 7000);
      });
    var isFine = false;
    MessageData[msg.author.id].LastMessage.forEach(msgg => {
      if (msg.channel.id == msgg.channel.id) {
        if (msg.content == msgg.content) {
          isFine = true;
        } else {
          isFine = false;
        }
      }
    });
    if (isFine) {

        const spambed = new Discord.MessageEmbed()

          .setColor("#DARKBLUE")
       .setAuthor("Celestial Bot", client.user.avatarURL())
        .setDescription(msg.author.tag + " **\`Sana Spam Yapmayı Kes Yoksa Susturulursun Demiştim!\`**")
    
        msg.channel.send(spambed);
       let mesajlar = msg.channel.messages.fetch();
    msg.channel.messages.fetch({limit: 20}).then(y => y.filter(x => x.author.id == msg.author.id).forEach(z => z.delete()))
        msg.channel.createOverwrite(msg.author.id, {
                SEND_MESSAGES: false
});
      }
    }
  if (MessageData[msg.author.id] >= 3) {
    if (msg.deletable) msg.delete();
    let mesajlar = msg.channel.messages.fetch();
  msg.channel.messages.fetch({limit: 40}).then(y => y.filter(x => x.author.id == msg.author.id).forEach(z => z.delete()))
      const spambed = new Discord.MessageEmbed()
        .setColor("#DARKBLUE") 
      .setAuthor("Celestial Bot", client.user.avatarURL())
      .setDescription(msg.author.tag + " **\`Sana Spam Yapmayı Kes yoksa Susturulursun Demiştim!\`**");
      msg.channel.send(spambed);
      msg.channel.createOverwrite(msg.author.id, {
                SEND_MESSAGES: false,
        
});
    }
  }

  }catch{}
};