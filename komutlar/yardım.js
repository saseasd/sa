const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");
const ayarlar = require('../ayarlar.json');


exports.run = async(client, message, args) => {

    if(![ayarlar.register].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("**Bu Komut Yetkililere Özel Sıradan Kullanıcı Kullanamaz.**")
  
    message.channel.send(new MessageEmbed()
    .setColor("#660099")
    .setFooter("APPLE 💖 Jessical", client.user.avatarURL())
    .setDescription(`**JessicaL Register**
<a:tacc:1065354092228132875> **Klan Üyesi Kayıt** - .k @Kullanıcı İsim Oyuncu İsmi
<a:tacc:1065354092228132875> **Özel Üye Kayıt** - .ou @Kullanıcı İsim Oyuncu İsmi
<a:tacc:1065354092228132875> **Misafir Üye Kayıt** - .m @Kullanıcı İsim Oyuncu İsmi
<a:tacc:1065354092228132875> **Dost Klan Kayıt** - .dk @Kullanıcı İsim Oyuncu İsmi
<a:tacc:1065354092228132875> **Kayıtsıza Atma** - .kayıtsız @kullanıcı
<a:tacc:1065354092228132875> **Nick Değiştirme** - .nick @kullanıcı isim Oyuncu İsmi
<a:tacc:1065354092228132875> **İsim Kontrol** - .isimler @Kullanıcı
<a:tacc:1065354092228132875> **Toplam Kayıt** - .sorgu @Kullanıcı
<a:tacc:1065354092228132875> **Top Teyit** - .topteyit
<a:tacc:1065354092228132875> **Kayıt Sıfırlama** - .sıfırla @Kullanıcı
<a:tacc:1065354092228132875> **Mesaj Silme** - .sil <Miktar>
<a:tacc:1065354092228132875> **Odaya Taşıma** - .taşı @Kullanıcı
<a:tacc:1065354092228132875> **Odaya Çekme** - .çek @Kullanıcı
<a:tacc:1065354092228132875> **Odadan Atma** - .kes @Kullanıcı
`)
.setFooter('APPLE 💖 JessicaL')
    );
}
    
    
    exports.conf = { 
        enabled: true, 
        guildOnly: true, 
        aliases: ["yardım", "help", "h", "y"]
        }
        
        exports.help = {
        name: "yardım",
        usage: ".y",
        info: "komutları gösterir"
        }