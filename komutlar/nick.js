const { MessageEmbed } = require('discord.js')
const discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json');



module.exports.run = async (client, message, args) => {


    var prefix = ayarlar.prefix
    let tag = ayarlar.tag
    const log = message.guild.channels.cache.find(c => c.id === ayarlar.nicklog)


 if(![ayarlar.register].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR'))
 return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`${message.author} bu komutu kullanmak için yetkin bulunmamakta.`)
.setColor("0x2f3136")).then(x => x.delete({timeout: 5000}));


  let member = message.mentions.members.first();
if (!member) return message.channel.send(new discord.MessageEmbed().setColor("0x2f3136").setDescription(`etiket nerde aga?`)).then(x => x.delete({timeout: 5000}));
let isim = args[1] 
if (!isim) return message.channel.send(new discord.MessageEmbed().setColor("0x2f3136").setDescription(`isim hani isim aloooo`)).then(x => x.delete({timeout: 5000}));
let yaş = args[2] 
if (!yaş) return message.channel.send(new discord.MessageEmbed().setColor("0x2f3136").setDescription(`yaşsız insan mı olur`)).then(x => x.delete({timeout: 5000}));
  

await member.setNickname(`${isim} | ${yaş}`)



const wasty = new discord.MessageEmbed()
.setColor("0x2f3136")
.setDescription(`**${member} kullanıcının ismini düzenledim.**`)
.setFooter(`APPLE 💖 Jessical`)
message.react("810084606971609088")
message.channel.send(wasty)
.then(x => x.delete({timeout: 5000}));

const logx = new discord.MessageEmbed()
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
.addField(`Yetkili`, `${message.author}`, true)
.addField(`Üye`, `${member}`, true)
.addField(`Yeni İsim ve Yaşı`, `${isim} ${yaş}`, true)
.setFooter('APPLE 💖 Jessical')
log.send(logx)




db.push(`isim.${message.guild.id}`,

{
    userID: member.id,
     isim: isim,
     yas: yaş,
     role: "  **İSİM DEĞİŞME**  "
}
)


}
exports.conf = {
  enabled: true,
  guildonly: false, 
  aliases: ['i', "n", "nick", "isim"],
  permlevel: 0
}
exports.help = {
  name: 'nick',
  description: 'nick değiştirir',
  usage: 'nick @mention Name Age'
}