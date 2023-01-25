const { MessageEmbed } = require('discord.js');
const mongodb = require("mongodb");
const ms = require("ms");
const moment = require("moment");
const db = require("quick.db")
const { parseZone } = require("moment");
const ayarlar = require('../ayarlar.json');

module.exports.run = async (client, message, args) => {



  if(![ayarlar.register].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR'))
  return message.channel.send(new MessageEmbed()

  .setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
  .setDescription(`${message.author} bu komutu kullanmak için yetkin bulunmamakta.`)
  .setColor("0x2f3136")).then(x => x.delete({timeout: 5000}));


  const sunucutag = ayarlar.tag
  const man = message.guild.roles.cache.find(r => r.id === ayarlar.misafir)
  const unregister = message.guild.roles.cache.find(r => r.id === ayarlar.unregister)
  const log = message.guild.channels.cache.find(c => c.id === ayarlar.kayıtlog)
  const chat = message.guild.channels.cache.find(c => c.id === ayarlar.chat);


  if(!man) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`misafir id'sini düzelt kankam`)
.setColor("0x2f3136")).then(x => x.delete({timeout: 4000}));
  if(!unregister) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`unregister id'sini düzelt kankam`)
.setColor("0x2f3136")).then(x => x.delete({timeout: 4000}));


const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!member) return message.channel.send(new MessageEmbed()

.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`**${message.author} bir kullanıcı belirt.**`)
.setColor("0x2f3136"))
.then(x => x.delete({timeout: 4000}));


let name = args[1]
let age = (args[2])


  if(!name) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`**Bir isim belirtmelisin.**`)
.setColor("0x2f3136")).then(x => x.delete({timeout: 5000}));

  if(member.id === message.author.id) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`kendini kayıt edemezsin kanka`)
.setColor("0x2f3136")).then(x => x.delete({timeout: 5000}));

  if(member.id === client.user.id) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`botları kayıt edemezsin bro`)
.setColor("0x2f3136")).then(x => x.delete({timeout: 5000}));

  if(member.id === message.guild.OwnerID) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`sunucu sahibini kayıt edemezsin cnm`)
.setColor("0x2f3136")).then(x => x.delete({timeout: 5000}));

  if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`belirtilen kişi seninle aynı pozisyonda veya daha üst bir pozisyonda, onu kayıt edemezsin!`)
.setColor("0x2f3136")).then(x => x.delete({timeout: 5000}));



db.add(`auth.${message.author.id}.erkek`, 1)
db.add(`auth.${message.author.id}.toplam`, 1)



let alldata = db.fetch(`auth.${message.author.id}.toplam`)

await member.setNickname(`${name} | ${age}`)

 await    member.roles.add(man)

 await    member.roles.remove(unregister)



 let timereplace = args[0];
let time = timereplace.replace(/y/, ' yıl').replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat') 
 db.add('case', 1)
 const wasty = await db.fetch('case')
 var tarih = new Date(Date.now())
 var tarih2 = ms(timereplace)
 var tarih3 = Date.now() + tarih2 + 1296000000
 let ay = moment(Date.now()+1296000000).format("MM")
 let gün = moment(Date.now()+1296000000).format("DD")
 let saat = moment(Date.now()+1296000000).format("HH:mm:ss")
 let yıl = moment(Date.now()+1296000000).format("YYYY")
 let kayıtsaat = `\`${gün} ${ay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${saat} (${yıl})\``


message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`**${member} Üyesinin Kayıtı Başarılı Sevgili Yetkilim** \n\n **${man}, Rolunü Verdim.** \n \`${name} | ${age}\` **Olarak ismini güncelledim.**`)
.setFooter(`Toplam kayıtların: ${alldata}`)               
.setColor("0x2f3136"))
message.react("810084606971609088")



chat.send(`**${member} Aramıza katıldı! <a:tacc:1065354092228132875>**`)



log.send(new MessageEmbed()
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
.addField(`Yetkili`, `${message.author}`, true)
.addField(`Yeni Üye`, `${member}`, true)
.addField(`Verilen Roller`, `${man},`, true)
.addField(`İsim`, `\`${name} | ${age}\``, true)
.addField(`Kayıt Edildiği Kanal`, `\`${message.channel.name}\``, true)
.addField(`Yetkili Toplam Kayıt`, `\`${alldata}\``, true)
.addField(`Kayıt Saati`, `\`${kayıtsaat}\``, true)
.setFooter('APPLE 💖 Jessical'))

db.push(`isim.${message.guild.id}`,

{
userID: member.id,
isim: name,
yas: age,
role: man.id
}
)}

exports.conf = 
{
  enabled: true,
  guildOnly: true,
  aliases: ['m', 'misafir', 'misafiruye', 'misafirci', 'geldi'],
  permLevel: 0
}

exports.help = 
{
  name: 'misafir',
  description: "Register the tagged person with male roles.",
  usage: '.misafir <etiket/id> İsim Oyun İsmi'
}