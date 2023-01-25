const { MessageEmbed } = require("discord.js")
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');

module.exports.run = async (client, message, users, args) => {

    if(!message.member.roles.cache.some(r => [ayarlar.register].includes(r.id)) && (!message.member.hasPermission("ADMINISTRATOR")))
    return message.reply("Bu Komutu Kullanmak İçin Yetkiniz Bulunmamakta.")
    
//------------------------------------------------KAYITLAR-----------------------------------------------\\  

let user = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
let isim = message.mentions.members.first() || message.guild.members.cache.get(args[0]);//Useri tanımladık
var sayi = 1 //Sıralam için sayı tanımladık
let data = db.get(`isim.${message.guild.id}`)//İsim verisini data diye tanımladık
let rol = db.fetch(`rol.${message.guild.id}`)
if(!data) return message.channel.send(new MessageEmbed()
    .setColor("0x2f3136") 
    .setThumbnail(user.user.avatarURL ({ dynamic: true}))      
    .setDescription(`
    ${isim} Adlı Kullanıcı Daha Önce Kayıt Olmamış.`)
    .setColor("0x2f3136"))
let isimler = data.filter(x => x.userID === isim.id).map(x => `${sayi++}- \`• ${x.isim} ' ${x.yas}\`  (<@&${x.role}>)\n`).join("\n")
if(isimler === null) isimler = "Kullanıcı hiç kayıt olmamış"
if(isimler === undefined) isimler = "Kullanıcı hiç kayıt olmamış"
//------------------------------------------------KAYITLAR-----------------------------------------------\\      


const embed = new MessageEmbed()
.setColor("0x2f3136")
        .setThumbnail(user.user.avatarURL ({ dynamic: true}))     
    .setAuthor(`Bu Kullanıcı ${sayi-1} Kere Kayıt Olmuş`) 
    .setDescription(`
    ${isimler}`)
    .setColor("0x2f3136")
.setFooter("APPLE 💖 Jessical")
message.channel.send(embed)
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['isimler', 'eski-isim'],
  permLevel: 0,
}

exports.help = {
      name: "nicks"
  
}