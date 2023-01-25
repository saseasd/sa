const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');
const ms = require('ms');


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


////////////
client.on('guildMemberAdd', async member => {
   await member.roles.add(`1064612305679171737`) //id yazan yere verilecek rol (unregistered)
   await member.setNickname(`İsim | Oyuncu İsmi`) //yeni gelen kullanıcının adını değiştirme
let member2 = member.user 
let zaman = new Date().getTime() - member2.createdAt.getTime()
var user = member2 
var takizaman = [];
if(zaman < 604800000) {
takizaman = ' <:avali:1038484860429406329> Tehlikeli bilader, a desen seni bıçaklar <a:haha:1038486162274275398>'
} else {
takizaman = `<a:mark2:1065353991422222346> Güvenli, gizli sırrımızı öğrenebilir <:avaliicok:1038486296009646140>`}require("moment-duration-format");
  let zaman1 = new Date().getTime() - user.createdAt.getTime()
  const gecen = moment.duration(zaman1).format(` YY **[Yıl,]** DD **[Gün,]**`) 
  let dbayarfalanfilan = await db.fetch(`takidbayar${member.guild.id}`)
  let message = member.guild.channels.cache.find(x => x.id === `1064612327623753768`) //id yazan kısma kanal id'si [orn: register-chat]
   const taki = new Discord.MessageEmbed()
  .setTitle(
      "<a:tacc:1065354092228132875> WELCOME TO JessicaL <a:tacc:1065354092228132875>"
    )
    .setDescription(`<a:2251worldrainbow1:1065708268598607974> Sunucumuza Hoşgeldin <a:crown:1065354014889353337>  ${member} <:animekalp:1038484658293317692> 
<:emoji_51:1044144562874093648> Seninle Beraber **${message.guild.memberCount}** Kişiyiz <a:emoji_49:1044144478782509066>
<a:deynek:1043573234957828166> <@&1064612293930913872> Rolündeki Yetkililer Seninle İlgilenecektir <a:emoji_16:1038486941127147531> 
<:tlcWholesomeCatStare:1044148749276041266> <#1064612329058209813> Talimatları Uygulayıp Giriş Yapabilirsin <a:sonsuzkalp:1065354073567670343>

<:animekalp:1038484658293317692> Hesap Açılalı: **${gecen}** Olmuş <a:aslan:1038485951472738394>
<a:star:1065354058036158546> Bu Kullanıcı:**${takizaman}**
`)
.setColor('PURPLE')
     client.channels.cache.get(ayarlar.kayıtkanal).send(taki) // kayıt mesaj
  
          });

//////////////
///////////
client.on('guildMemberAdd', async (member) => {
  if(db.has(`${member.guild.id}_otorol`)) {
    var rolID = db.fetch(`${member.guild.id}_otorol`)
    member.roles.add(rolID)
  } else {
    return;
  }
  if(db.has(`${member.guild.id}_otokanal`)) {
    var kanal = client.channels.cache.get(db.fetch(`${member.guild.id}_otokanal`))
    const embed = new Discord.MessageEmbed()
    .setDescription(`Yeni katılan ${member} kullanıcısına <@&${rolID}> rolü verildi`)
    .setTimestamp()
    kanal.send(embed)
  } else {
    return;
  }
})
///////////
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
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
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



client.on("ready", async function() {
    client.channels.cache.get(ayarlar.botkanal).join()
    .catch(err => {
    throw err;
    })
    })


//////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////