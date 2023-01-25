const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");


exports.run = (client, message, args) => {
if(![ayarlar.register].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
	
	return message.channel.send("Yetkin Yok Moruq <a:aslan:1038485951472738394>")
    let kanal = args[1];
    let kullanici = message.mentions.members.first()
    if (!kullanici) return message.channel.send("**Taşıyacagın kişiyi etiketlemelisin!**")
    if (!kanal) return message.channel.send("**Taşıyacağı kanalin ID'sini belirtmeyi unuttun.**")
   
    kullanici.voice.setChannel(`${kanal}`)
        .then(() =>
            message.channel.send(`<a:tacc:1065354092228132875> ${kullanici} <a:tacc:1065354092228132875> <#${kanal}> adli kanala taşındı <a:mark2:1065353991422222346>`))
        .catch(console.error);
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['üyeyitasi','tasi'],
    permLevel: 0
};
exports.help = {
    name: 'taşı',
    description: 'İstediğiniz kişiyi bir sesli kanalından diğerine taşır.',
    usage: 'taşı [kullanici] [kanal id]'
};