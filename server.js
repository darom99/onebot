require("events").EventEmitter.defaultMaxListeners = 200;
const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
// ================================ { • consts • } ================================

const { Client, RichEmbed } = require("discord.js");
var { Util } = require("discord.js");
const { prefix, devs, fix } = require("./config");
const client = new Client({ disableEveryone: true });
const ytdl = require("ytdl-core");
const canvas = require("canvas");
const convert = require("hh-mm-ss");
const fetchVideoInfo = require("youtube-info");
const botversion = require("./package.json").version;
const simpleytapi = require("simple-youtube-api");
const moment = require("moment");
const fs = require("fs");
const util = require("util");
const gif = require("gif-search");
const opus = require("node-opus");
const ms = require("ms");
const jimp = require("jimp");
const { get } = require("snekfetch");
const guild = require("guild");
const dateFormat = require("dateformat");
const YouTube = require("simple-youtube-api");
const youtube = new YouTube("AIzaSyAXaeBh837k38o_lwSADet8UTO7X21DGsY"); //تعديل اساسي سوي اي بي اي جديد
const hastebins = require("hastebin-gen");
const getYoutubeID = require("get-youtube-id");
const yt_api_key = "AIzaSyAXaeBh837k38o_lwSADet8UTO7X21DGsY"; ///تعديل اساسي سوي اي بي اي جديد
const pretty = require("pretty-ms");
client.login(fix);
const queue = new Map();
var table = require("table").table;
const Discord = require("discord.js");
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// ================================ { • help • } ================================
client.on("ready", () => {
  client.user.setActivity(prefix + "help", { type: "PLAYING" });
  client.user.setStatus("ONLINE");
});
client.on("message", fix => {
  if (fix.content === prefix + "help") {
    let Dashboard = `Moderation Commands :
> ${prefix}invite
> ${prefix}user
> ${prefix}bot
> ${prefix}join
> ${prefix}info
> ${prefix}lock
> ${prefix}unlock
> ${prefix}say
> ${prefix}embed
> ${prefix}clear
[ __ welcome / leave __ ]

Security Commands :
> ${prefix}anti ban [number]
> ${prefix}anti kick [number]
> ${prefix}anti channelD [number]
> ${prefix}anti channelC [number]
> ${prefix}anti roleD [number]
> ${prefix}anti roleC [number]
> ${prefix}anti time [number]
> ${prefix}antibots [on / off]
> ${prefix}settings
`;
    var addserver = `https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=2080374975`;
    var SUPPORT = `https://discord.gg/q2Bchd5`;
    let embed = new Discord.RichEmbed().setTitle(`${client.user.username}`)
      .setDescription(`**${Dashboard}**
    **[Add To Your Server ](${addserver})** | **[ Server Support](${SUPPORT})**`);
    fix.author.send(embed);
    fix.react("✔");
  }
});

client.on("message", pixelbot => {
  // itzZa1D - Codes Team.
  if (pixelbot.content.startsWith(prefix + "user")) {
    // itzZa1D - Codes Team.
    if (pixelbot.author.bot) return;
    if (!pixelbot.guild)
      return pixelbot.reply("**:x: - This Command is only done on Servers**");
    pixelbot.guild.fetchInvites().then(invites => {
      // itzZa1D - Codes Team.
      let personalInvites = invites.filter(
        i => i.inviter.id === pixelbot.author.id
      );
      let inviteCount = personalInvites.reduce((p, v) => v.uses + p, 0);
      var roles = pixelbot.member.roles
        .map(roles => `**__${roles.name}__ |**`)
        .join(` `);
      let pixeluser = new Discord.RichEmbed() // itzZa1D - Codes Team.
        .setColor("#00000")
        .setTitle(" :beginner: :heartpulse:   | Use  r Info") // itzZa1D - Codes Team.
        .setAuthor(pixelbot.author.username, pixelbot.author.avatarURL)
        .addField("**✽ Name :**   ", pixelbot.author.username, true)
        .addField("**✽ Tag :**   ", pixelbot.author.discriminator, true)
        .addField("**✽ ID :** ", pixelbot.author.id, true) // itzZa1D - Codes Team.
        .addField(
          "**✽ Joined At :**   ",
          moment(pixelbot.joinedAt).format("D/M/YYYY h:mm a "),
          true
        )
        .addField(
          "**✽ Created At :**    ",
          moment(pixelbot.joinedAt).format("D/M/YYYY h:mm a "),
          true
        )
        .addField("**✽ Total invites :**    ", inviteCount, true)
        .setTimestamp(); // itzZa1D - Codes Team.

      pixelbot.channel.sendEmbed(pixeluser).then(c => {}); // itzZa1D - Codes Team.
    });
  }
}); // itzZa1D - Codes Team.
// ======== { • join • }======== //
client.on("message", message => {
  if (!message.guild) return;
  if (message.content === prefix + "join") {
    if (message.member.voiceChannel) {
      message.member.voiceChannel
        .join()
        .then(connection => {
          message.reply("**Joined**");
        })
        .catch(console.log);
    } else {
      message.reply("**Firs You Join A Voice**");
    }
  }
});
// ======== { • say embed • }======== //
client.on("message", message => {
  if (message.author.bot) return;

  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);
  if (command === "say") {
    if (!message.channel.guild)
      return message.channel
        .send("**Sorry But You Dont Have Permission** ADMINSTRATOR")
        .then(m => m.delete(5000));
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        "**Sorry But You Dont Have Permission** ADMINSTRATOR"
      );
    message.delete();
    message.channel.sendMessage(args.join(" "));
  }
  if (command == "embed") {
    if (!message.channel.guild)
      return message.channel
        .send("**Sorry But You Dont Have Permission** ADMINSTRATOR")
        .then(m => m.delete(5000));
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        "**Sorry But You Dont Have Permission** ADMINSTRATOR"
      );
    let say = new Discord.RichEmbed()
      .setDescription(args.join("  "))
      .setColor("RAMDOM");
    message.channel.sendEmbed(say);
    message.delete();
  }
});
client.on("message", zaid => {
  if (zaid.content === prefix + "bot") {
    const bot = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setColor("#00000")
      .addField(
        "✽ **Bot Ping** : ",
        `» ${Date.now() - zaid.createdTimestamp}` + " ms",
        true
      )
      .addField("**Servers** :  ", `» ${client.guilds.size}`, true)
      .addField("**Channels** : ", `» ${client.channels.size} `, true)
      .addField("**Users** : ", `» ${client.users.size} `, true)
      .addField("**Bot Name** :  ", `» ${client.user.tag} `, true)
      .addField("**Bot Owner** :  ", `» <@634758087034667018> `, true) // تعديل مهم عدل هذا الرقم لايدي حسابك
      .addField("**Bot Sponser** :  ", `» <@701204004452958269> `, true)
      .addField(
        "**Bot Helpers** :  ",
        `» <@620770708645216257> | <@689427120090513438> `,
        true
      )
      .setImage(
        "https://media.discordapp.net/attachments/726475175415119884/758115296409550868/image0.png"
      )
      .setFooter(zaid.author.username, zaid.author.avatarURL);
    zaid.channel.send(bot);
  }
});
client.on("typingStart", (ch, user) => {
  if (user.presence.status === "offline") {
    ch.send(`${user} برای ئەزیزم خۆت ئۆفلاین مەکە`).then(msg => {
      msg.delete(10000);
    });
  }
});

client.on("message", msg => {
  if (msg.content === "Slaw") {
    msg.reply(`╔══❖•⊰᯽⊱┈─╌❊╌─┈⊰᯽⊱•❖══╗

                ‌                      ســـــڵاو لـە تــۆش گــــوڵ

                  

╚══❖•⊰᯽⊱┈─╌❊╌─┈⊰᯽⊱•❖══╝`);
  }
});
client.on("message", msg => {
  if (msg.content === "slaw") {
    msg.reply(`╔══❖•⊰᯽⊱┈─╌❊╌─┈⊰᯽⊱•❖══╗

                ‌                      ســـــڵاو لـە تــۆش گــــوڵ

                  

╚══❖•⊰᯽⊱┈─╌❊╌─┈⊰᯽⊱•❖══╝`);
  }
});
client.on("message", msg => {
  if (msg.content === "سلاو") {
    msg.reply(`╔══❖•⊰᯽⊱┈─╌❊╌─┈⊰᯽⊱•❖══╗

                ‌                      ســـــڵاو لـە تــۆش گــــوڵ

                  

╚══❖•⊰᯽⊱┈─╌❊╌─┈⊰᯽⊱•❖══╝`);
  }
});
client.on("message", msg => {
  if (msg.content === "سڵاو") {
    msg.reply(`╔══❖•⊰᯽⊱┈─╌❊╌─┈⊰᯽⊱•❖══╗

                ‌                      ســـــڵاو لـە تــۆش گــــوڵ

                  

╚══❖•⊰᯽⊱┈─╌❊╌─┈⊰᯽⊱•❖══╝`);
  }
});
// ======== { • invite • }======== //
client.on("message", message => {
  if (message.content.startsWith(`${prefix}invite`)) {
    var embed = new Discord.RichEmbed()
      .setTitle("✨ | ClickHere To Add " + `${client.user.username}` + " .")
      .setURL(
        "https://discordapp.com/oauth2/authorize?client_id=" +
          `${client.user.id}` +
          "&scope=bot&permissions=2080374975"
      )
      .setTimestamp()
      .setFooter(`Requested By | ${message.author.username}`)
      .setImage(
        "https://media.discordapp.net/attachments/758134203371225109/758142295387537438/image0.png"
      )
      .setColor("RANDOM");
    message.channel.send({ embed });
  }
});
client.on("message", async message => {
  if (message.content.startsWith(prefix + "lock")) {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return;
    if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS"))
      return;
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: false
    });
    message.channel.send(`🔒 **has been locked.**`);
  }
});

client.on("message", async message => {
  if (message.content.startsWith(prefix + "unlock")) {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return;
    if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS"))
      return;
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: null
    });
    message.channel.send(`🔓 **has been unlocked.**`);
  }
});
client.on("message", async message => {
  if (message.content.startsWith(prefix + "info")) {
    let oi = message.mentions.users.first()
      ? message.mentions.users.first().id
      : message.author.id;
    let Tag = message.mentions.users.first()
      ? message.mentions.users.first().tag
      : message.author.tag;
    let Username = message.mentions.users.first()
      ? message.mentions.users.first().username
      : message.author.username;
    let Avatar = message.mentions.users.first()
      ? message.mentions.users.first().avatarURL
      : message.author.avatarURL;

    message.guild.fetchInvites().then(invs => {
      let member = client.guilds.get(message.guild.id).members.get(oi);
      let personalInvites = invs.filter(i => i.inviter.id === oi);
      let urll = invs.filter(i => i.inviter.id === oi);
      let link = urll.reduce(
        (p, v) =>
          v.url + ` , Total de membros recrutados no convite: ${v.uses}.\n` + p,
        `\nServidor: ${message.guild.name} \n `
      );
      let inviteCount = personalInvites.reduce((p, v) => v.uses + p, 0);
      let inviteCode = personalInvites.reduce((p, v) => v.code);
      let possibleInvites = [["Total de membros recrutados:"]];
      possibleInvites.push([inviteCount, inviteCode]);
      let user = message.mentions.users.first() || message.author;
      let mem = message.guild.member(user);
      let millisJoined = new Date().getTime() - mem.joinedAt.getTime();
      let daysJoined = millisJoined / 1000 / 60 / 60 / 24;
      var inviteInfo = new Discord.RichEmbed()
        .setTitle(`:incoming_envelope: **[INVITE INFO]** ${Username}`)
        .addField(
          "**Count Invites**",
          `**➥** [ Member **${Number(inviteCount)}** ]   `
        )
        .addField(
          "**Joined Server**",
          `**➥** [ From  **${daysJoined.toFixed(0)}** day ]   `
        )
        .addField(
          "**Your Invite Link**  ",
          `**➥** [ **https://discord.gg/${inviteCode || "Zm2U6we"}** ]   `
        )
        .setImage("")
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter(Tag, Avatar);

      message.channel.send(inviteInfo);
    });
  }
});

client.on("message", message => {
  if (message.author.bot) return; ///Pixel Team
  if (message.content.startsWith(prefix + "clear")) {
    if (!message.channel.guild)
      return message.reply(`** This Command For Servers Only**`);
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(`** You don't have Premissions!**`);
    if (!message.guild.member(client.user).hasPermission("MANAGE_GUILD"))
      return message.channel.send(`**I don't have Permission!**`);
    let args = message.content.split(" ").slice(1);
    let messagecount = parseInt(args);
    if (args > 100)
      return message
        .reply(`** The number can't be more than **100** .**`)
        .then(messages => messages.delete(5000));
    if (!messagecount) args = "100";
    message.channel
      .fetchMessages({ limit: messagecount })
      .then(messages => message.channel.bulkDelete(messages))
      .then(msgs => {
        message.channel
          .send(`** Done , Deleted \`${msgs.size}\` messages.** `)
          .then(messages => messages.delete(5000));
      });
  }
});

// ======== { • welcome • }======== //
client.on("guildMemberAdd", member => {
  let welcomer = member.guild.channels.find(
    channel => channel.name === "welcome"
  );
  if (!welcomer) return;
  if (welcomer) {
    moment.locale("en-ly");
    var h = member.user;
    let fix = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setThumbnail(h.avatarURL)
      .setAuthor(h.username, h.avatarURL)
      .addField("🧔🏻 | You Are Number :", member.guild.memberCount)
      .addField(
        "⌚️ | Create Your Account Time :",
        `${moment(member.user.createdAt).format(
          "D/M/YYYY h:mm a"
        )} **\n** \`${moment(member.user.createdAt).fromNow()}\``,
        true
      )
      .addField(
        "⌚️ | Join Server Time :",
        `${moment(member.joinedAt).format("D/M/YYYY h:mm a")} \n\`\`${moment(
          member.joinedAt
        )
          .startOf(" ")
          .fromNow()}\`\``,
        true
      )
      .setImage(
        "https://media.discordapp.net/attachments/725981750135619594/758130413159055370/image0.gif"
      )
      .setFooter(
        `${h.tag}`,
        "https://media.discordapp.net/attachments/725981750135619594/758130413159055370/image0.gif"
      );

    welcomer.send({ embed: fix });
  }
});
client.on("guildMemberAdd", member => {
  let welcomer = member.guild.channels.find(
    channel => channel.name === "welcome"
  );
  if (!welcomer) return;
  if (welcomer) {
    moment.locale("en-ly");
    var h = member.user;
    let fix = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setThumbnail(h.avatarURL)
      .setAuthor(h.username, h.avatarURL)
      .addField("🧔🏻 | You Are Number :", member.guild.memberCount)
      .addField(
        "⌚️ | Create Your Account Time :",
        `${moment(member.user.createdAt).format(
          "D/M/YYYY h:mm a"
        )} **\n** \`${moment(member.user.createdAt).fromNow()}\``,
        true
      )
      .addField(
        "⌚️ | Join Server Time :",
        `${moment(member.joinedAt).format("D/M/YYYY h:mm a")} \n\`\`${moment(
          member.joinedAt
        )
          .startOf(" ")
          .fromNow()}\`\``,
        true
      )
      .setImage(
        "https://media.discordapp.net/attachments/725981750135619594/758130413159055370/image0.gif"
      )
      .setFooter(
        `${h.tag}`,
        "https://media.discordapp.net/attachments/725981750135619594/758130413159055370/image0.gif"
      );

    member.send({ embed: fix });
  }
});
client.on("guildMemberRemove", member => {
  let welcomer = member.guild.channels.find(
    channel => channel.name === "leave"
  );
  if (!welcomer) return;
  if (welcomer) {
    moment.locale("en-ly");
    var h = member.user;
    let fix = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setThumbnail(h.avatarURL)
      .setAuthor(h.username, h.avatarURL)
      .addField("🧔🏻| Server Member :", member.guild.memberCount)
      .addField(
        "⌚️|Create Your Account Time :",
        `${moment(member.user.createdAt).format(
          "D/M/YYYY h:mm a"
        )} **\n** \`${moment(member.user.createdAt).fromNow()}\``,
        true
      )
      .addField(
        "⌚️| Join Server Time :",
        `${moment(member.joinedAt).format("D/M/YYYY h:mm a")} \n\`\`${moment(
          member.joinedAt
        )
          .startOf(" ")
          .fromNow()}\`\``,
        true
      )
      .setImage(
        "https://images-ext-2.discordapp.net/external/IT_azDpUuqrhszicdzAkaUe12utJF6mt_rc8_IH16P8/https/images-ext-1.discordapp.net/external/cAlzLJlPEYQ0fbL8s3VHtl4mkHIyL8UgGXcyF9bRcE0/https/images-ext-1.discordapp.net/external/EEJ4nzd59LHbC7gf5sBFB_OTkGVELK4LhZXlfsJFwRI/https/media.discordapp.net/attachments/691035325564452966/691064476081848330/image0.gif"
      )
      .setFooter(
        `${h.tag}`,
        "https://images-ext-2.discordapp.net/external/IT_azDpUuqrhszicdzAkaUe12utJF6mt_rc8_IH16P8/https/images-ext-1.discordapp.net/external/cAlzLJlPEYQ0fbL8s3VHtl4mkHIyL8UgGXcyF9bRcE0/https/images-ext-1.discordapp.net/external/EEJ4nzd59LHbC7gf5sBFB_OTkGVELK4LhZXlfsJFwRI/https/media.discordapp.net/attachments/691035325564452966/691064476081848330/image0.gif"
      );

    welcomer.send({ embed: fix });
  }
});
// ======== { • security • }======== //
const tpoints = {};
const vpoints = {};
let anti = JSON.parse(fs.readFileSync("./antigreff.json", "UTF8"));
let config = JSON.parse(fs.readFileSync("./config.json", "UTF8"));
client.on("message", message => {
  if (!message.channel.guild) return;
  let user = anti[message.guild.id + message.author.id];
  let num = message.content
    .split(" ")
    .slice(2)
    .join(" ");
  if (!anti[message.guild.id + message.author.id])
    anti[message.guild.id + message.author.id] = {
      actions: 0
    };
  if (!config[message.guild.id])
    config[message.guild.id] = {
      banLimit: 4,
      chaDelLimit: 4,
      chaCrLimit: 4,
      roleDelLimit: 4,
      kickLimits: 4,
      roleCrLimits : 4,
      time: 0.5
    };
  if (message.content.startsWith(prefix + "anti")) {
    if (message.author.id !== message.guild.owner.user.id)
      return message.channel.send(
        "**❌ | Only `OwnerShip` Can Use This Command .**"
      );
    if (message.content.startsWith(prefix + "anti ban")) {
      if (!num)
        return message.channel.send(
          "**❌ | Type A `Number` After Commands .**"
        );
      if (isNaN(num))
        return message.channel.send("**❌ | Only Type `Number` .**");
      config[message.guild.id].banLimit = num;
      message.channel.send(
        `**✔️ | Changed \`Anti Ban\` To : ${config[message.guild.id].banLimit} **`
      );
    }
    if (message.content.startsWith(prefix + "anti kick")) {
      if (!num)
        return message.channel.send(
          "**❌ | Type A `Number` After Commands .**"
        );
      if (isNaN(num))
        return message.channel.send("**❌ | Only Type `Number` .**");
      config[message.guild.id].kickLimits = num;
      message.channel.send(
        `**✔️ | Changed \`Anti Kick\` To : ${config[message.guild.id].kickLimits}**`
      );
    }
    if (message.content.startsWith(prefix + "anti roleD")) {
      if (!num)
        return message.channel.send(
          "**❌ | Type A `Number` After Commands .**"
        );
      if (isNaN(num))
        return message.channel.send("**❌ | Only Type `Number` .**");
      config[message.guild.id].roleDelLimit = num;
      message.channel.send(
        `**✔️ | Changed \`Role Delete\` To : ${config[message.guild.id].roleDelLimit}**`
      );
    }
    if (message.content.startsWith(prefix + "anti roleC")) {
      if (!num)
        return message.channel.send(
          "**❌ | Type A `Number` After Commands .**"
        );
      if (isNaN(num))
        return message.channel.send("**❌ | Only Type `Number` .**");
      config[message.guild.id].roleCrLimits = num;
      message.channel.send(
        `**✔️ | Changed \`Role Create\` To : ${config[message.guild.id].roleCrLimits}**`
      );
    }
    if (message.content.startsWith(prefix + "anti channelD")) {
      if (!num)
        return message.channel.send(
          "**❌ | Type A `Number` After Commands .**"
        );
      if (isNaN(num))
        return message.channel.send("**❌ | Only Type `Number` .**");
      config[message.guild.id].chaDelLimit = num;
      message.channel.send(
        `**✔️ | Changed \`Channel Delete\` To : ${config[message.guild.id].chaDelLimit}**`
      );
    }
    if (message.content.startsWith(prefix + "anti channelC")) {
      if (!num)
        return message.channel.send(
          "**❌ | Type A `Number` After Commands .**"
        );
      if (isNaN(num))
        return message.channel.send("**❌ | Only Type `Number` .**");
      config[message.guild.id].chaCrLimit = num;
      message.channel.send(
        `**✔️ | Changed \`Channel Create\` To : ${config[message.guild.id].chaCrLimit}**`
      );
    }
    if (message.content.startsWith(prefix + "anti time")) {
      if (!num)
        return message.channel.send(
          "**❌ | Type A `Number` After Commands .**"
        );
      if (isNaN(num))
        return message.channel.send("**❌ | Only Type `Number` .**");
      config[message.guild.id].time = num;
      message.channel.send(
        `**✔️ | Changed \`Time\` To : ${config[message.guild.id].time}**`
      );
    }
  }
  fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(e) {
    if (e) throw e;
  });
  fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(e) {
    if (e) throw e;
  });
});
client.on("channelDelete", async channel => {
  const entry1 = await channel.guild
    .fetchAuditLogs({
      type: "CHANNEL_DELETE"
    })
    .then(audit => audit.entries.first());
  console.log(entry1.executor.username);
  const entry = entry1.executor;
  if (!config[channel.guild.id])
    config[channel.guild.id] = {
      banLimit: 4,
      chaDelLimit: 4,
      chaCrLimit: 4,
      roleDelLimit: 4,
      kickLimits: 4,
      roleCrLimits: 4,
      time: 0.5
    };
  if (!anti[channel.guild.id + entry.id]) {
    anti[channel.guild.id + entry.id] = {
      actions: 1
    };
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
  } else {
    anti[channel.guild.id + entry.id].actions = Math.floor(
      anti[channel.guild.id + entry.id].actions + 1
    );
    console.log("TETS");
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
    if (
      anti[channel.guild.id + entry.id].actions >=
      config[channel.guild.id].chaDelLimit
    ) {
      channel.guild.members
        .get(entry.id)
        .ban()
        .catch(e =>
          channel.guild.owner.send(
            `**❗️ | ${entry.username} Has \`Delete\` Many Channels .**`
          )
        );
      anti[channel.guild.id + entry.id].actions = "0";
      fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
      fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
    }
  }

  fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(e) {
    if (e) throw e;
  });
  fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(e) {
    if (e) throw e;
  });
});

client.on("channelCreate", async channel => {
  if (!["text", "category", "voice"].includes(channel.type.toLowerCase()))
    return;
  if (!config[channel.guild.id])
    config[channel.guild.id] = {
      banLimit: 4,
      chaDelLimit: 4,
      chaCrLimit: 4,
      roleDelLimit: 4,
      kickLimits: 4,
      roleCrLimits: 4,
      time: 0.5
    };
  const entry1 = await channel.guild
    .fetchAuditLogs({
      type: "CHANNEL_CREATE"
    })
    .then(audit => audit.entries.first());
  console.log(entry1.executor.username);
  const entry = entry1.executor;

  if (!anti[channel.guild.id + entry.id]) {
    anti[channel.guild.id + entry.id] = {
      actions: 1
    };
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
  } else {
    anti[channel.guild.id + entry.id].actions = Math.floor(
      anti[channel.guild.id + entry.id].actions + 1
    );
    console.log("TETS");
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
    if (
      anti[channel.guild.id + entry.id].actions >=
      config[channel.guild.id].chaCrLimit
    ) {
      channel.guild.members
        .get(entry.id)
        .ban()
        .catch(e =>
          channel.guild.owner.send(
            `**❗️ | ${entry.username} Has \`Create\` Many Channels .**`
          )
        );
      anti[channel.guild.id + entry.id].actions = "0";
      fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
      fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
    }

    fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(e) {
      if (e) throw e;
    });
    fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(
      e
    ) {
      if (e) throw e;
    });
  }
});
client.on("roleDelete", async channel => {
  const entry1 = await channel.guild
    .fetchAuditLogs({
      type: "ROLE_DELETE"
    })
    .then(audit => audit.entries.first());
  console.log(entry1.executor.username);
  const entry = entry1.executor;
  if (!config[channel.guild.id])
    config[channel.guild.id] = {
      banLimit: 4,
      chaDelLimit: 4,
      chaCrLimit: 4,
      roleDelLimit: 4,
      kickLimits: 4,
      roleCrLimits: 4,
      time: 0.5
    };
  if (!anti[channel.guild.id + entry.id]) {
    anti[channel.guild.id + entry.id] = {
      actions: 1
    };
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
  } else {
    anti[channel.guild.id + entry.id].actions = Math.floor(
      anti[channel.guild.id + entry.id].actions + 1
    );
    console.log("TETS");
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
    if (
      anti[channel.guild.id + entry.id].actions >=
      config[channel.guild.id].roleDelLimit
    ) {
      channel.guild.members
        .get(entry.id)
        .ban()
        .catch(e =>
          channel.guild.owner.send(
            `**❗️ | ${entry.username} Has \`Delete\` Many Roles .**`
          )
        );
      anti[channel.guild.id + entry.id].actions = "0";
      fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
      fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
    }
  }

  fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(e) {
    if (e) throw e;
  });
  fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(e) {
    if (e) throw e;
  });
});

client.on("roleCreate", async channel => {
  const entry1 = await channel.guild
    .fetchAuditLogs({
      type: "ROLE_CREATE"
    })
    .then(audit => audit.entries.first());
  console.log(entry1.executor.username);
  const entry = entry1.executor;
  if (!config[channel.guild.id])
    config[channel.guild.id] = {
      banLimit: 4,
      chaDelLimit: 4,
      chaCrLimit: 4,
      roleDelLimit: 4,
      kickLimits: 4,
      roleCrLimits: 4,
      time: 0.5
    };
  if (!anti[channel.guild.id + entry.id]) {
    anti[channel.guild.id + entry.id] = {
      actions: 1
    };
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
  } else {
    anti[channel.guild.id + entry.id].actions = Math.floor(
      anti[channel.guild.id + entry.id].actions + 1
    );
    console.log("TETS");
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
    if (
      anti[channel.guild.id + entry.id].actions >=
      config[channel.guild.id].roleCrLimits
    ) {
      channel.guild.members
        .get(entry.id)
        .ban()
        .catch(e =>
          channel.guild.owner.send(
            `**❗️ | ${entry.username} Has \`Create\` Many Roles .**`
          )
        );
      anti[channel.guild.id + entry.id].actions = "0";
      fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
      fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
    }
  }

  fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(e) {
    if (e) throw e;
  });
  fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(e) {
    if (e) throw e;
  });
});

client.on("guildBanAdd", async (guild, user) => {
  const entry1 = await guild
    .fetchAuditLogs({
      type: "MEMBER_BAN_ADD"
    })
    .then(audit => audit.entries.first());
  console.log("ban: " + entry1.executor.username);
  const entry = entry1.executor;
  if (!config[guild.id])
    config[guild.id] = {
      banLimit: 4,
      chaDelLimit: 4,
      chaCrLimit: 4,
      roleDelLimit: 4,
      kickLimits: 4,
      roleCrLimits: 4,
      time: 0.5
    };
  if (!anti[guild.id + entry.id]) {
    anti[guild.id + entry.id] = {
      actions: 1
    };
    setTimeout(() => {
      anti[guild.id + entry.id].actions = 0;
    }, config[guild.id].time * 1000);
  } else {
    anti[guild.id + entry.id].actions = Math.floor(
      anti[guild.id + entry.id].actions + 1
    );
    setTimeout(() => {
      anti[guild.id + entry.id].actions = 0;
    }, config[guild.id].time * 1000);
    if (anti[guild.id + entry.id].actions >= config[guild.id].banLimit) {
      guild.members
        .get(entry.id)
        .ban()
        .catch(e =>
          guild.owner.send(
            `**❗️ | ${entry.username} Has \`Ban\` Many Members .**`
          )
        );
      anti[guild.id + entry.id].actions = 0;
      fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
      fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
    }
  }

  fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(e) {
    if (e) throw e;
  });
  fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(e) {
    if (e) throw e;
  });
});

client.on("guildKickAdd", async (guild, user) => {
  const entry1 = await guild
    .fetchAuditLogs({
      type: "MEMBER_KICK"
    })
    .then(audit => audit.entries.first());
  console.log(entry1.executor.username);
  const entry = entry1.executor;
  if (!config[guild.id])
    config[guild.id] = {
      banLimit: 4,
      chaDelLimit: 4,
      chaCrLimit: 4,
      roleDelLimit: 4,
      kickLimits: 4,
      roleCrLimits: 4,
      time: 0.5
    };
  if (!anti[guild.id + entry.id]) {
    anti[guild.id + entry.id] = {
      actions: 1
    };
    setTimeout(() => {
      anti[guild.id + entry.id].actions = 0;
    }, config[guild.id].time * 1000);
  } else {
    anti[guild.id + entry.id].actions = Math.floor(
      anti[guild.id + entry.id].actions + 1
    );
    console.log("TETS");
    setTimeout(() => {
      anti[guild.id + entry.id].actions = 0;
    }, config[guild.id].time * 1000);
    if (anti[guild.id + entry.id].actions >= config[guild.id].banLimit) {
      guild.members
        .get(entry.id)
        .ban()
        .catch(e =>
          guild.owner.send(
            `**❗️ | ${entry.username} Has \`Kick\` Many Members .**`
          )
        );
      anti[guild.id + entry.id].actions = 0;
      fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
      fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
    }
  }

  fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(e) {
    if (e) throw e;
  });
  fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(e) {
    if (e) throw e;
  });
});

client.on("guildMemberRemove", async member => {
  const entry1 = await member.guild
    .fetchAuditLogs()
    .then(audit => audit.entries.first());
  if (entry1.action === "MEMBER_KICK") {
    const entry2 = await member.guild
      .fetchAuditLogs({
        type: "MEMBER_KICK"
      })
      .then(audit => audit.entries.first());
    const entry = entry2.executor;
    if (!config[member.guild.id])
      config[guild.id] = {
        banLimit: 4,
        chaDelLimit: 4,
        chaCrLimit: 4,
        roleDelLimit: 4,
        kickLimits: 4,
        roleCrLimits: 4,
        time: 0.5
      };
    if (!anti[member.guild.id + entry.id]) {
      anti[member.guild.id + entry.id] = {
        actions: 1
      };
      setTimeout(() => {
        anti[member.guild.id + entry.id].actions = 0;
      }, config[member.guild.id].time * 1000);
    } else {
      anti[member.guild.id + entry.id].actions = Math.floor(
        anti[member.guild.id + entry.id].actions + 1
      );
      console.log("TETS");
      setTimeout(() => {
        anti[member.guild.id + entry.id].actions = 0;
      }, config[member.guild.id].time * 1000 || 30000);
      if (
        anti[member.guild.id + entry.id].actions >=
        config[member.guild.id].kickLimits
      ) {
        member.guild.members
          .get(entry.id)
          .ban()
          .catch(e =>
            member.owner.send(
              `**❗️ | ${entry.username} Has \`Kick\` Many Members .**`
            )
          );
        anti[member.guild.id + entry.id].actions = 0;
        fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(
          e
        ) {
          if (e) throw e;
        });
        fs.writeFile(
          "./antigreff.json",
          JSON.stringify(anti, null, 2),
          function(e) {
            if (e) throw e;
          }
        );
      }
    }

    fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(e) {
      if (e) throw e;
    });
    fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(
      e
    ) {
      if (e) throw e;
    });
  }
});
// ======== { • anti bots • }======== //

let antibots = JSON.parse(fs.readFileSync("./antibots.json", "utf8")); //require antihack.json file
client.on("message", message => {
  if (message.content.startsWith(prefix + "antibots on")) {
    if (!message.channel.guild) return;
    if (!message.member.hasPermission("Ownership")) return;
    antibots[message.guild.id] = {
      onoff: "On"
    };
    message.channel.send(`**➕ | The antibots is \`ON\`.**`);
    fs.writeFile("./antibots.json", JSON.stringify(antibots), err => {
      if (err)
        console.error(err).catch(err => {
          console.error(err);
        });
    });
  }
});

client.on("message", message => {
  if (message.content.startsWith(prefix + "antibots off")) {
    if (!message.channel.guild) return;
    if (!message.member.hasPermission("Ownership")) return;
    antibots[message.guild.id] = {
      onoff: "Off"
    };
    message.channel.send(`**➖ | The antibots is \`OFF\`.**`);
    fs.writeFile("./antibots.json", JSON.stringify(antibots), err => {
      if (err)
        console.error(err).catch(err => {
          console.error(err);
        });
    });
  }
});

client.on("guildMemberAdd", member => {
  if (!antibots[member.guild.id])
    antibots[member.guild.id] = {
      onoff: "on"
    };
  if (antibots[member.guild.id].onoff === "Off") return;
  if (member.user.bot) return member.kick();
});

fs.writeFile("./antibots.json", JSON.stringify(antibots), err => {
  if (err)
    console.error(err).catch(err => {
      console.error(err);
    });
});
// ======== { • settings • }======== //

client.on("message", message => {
  let Tag = message.mentions.users.first()
    ? message.mentions.users.first().tag
    : message.author.tag;
  let Avatar = message.mentions.users.first()
    ? message.mentions.users.first().avatarURL
    : message.author.avatarURL;
  if (!message.content.startsWith(prefix)) return;
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + "settings")) {
    if (!message.member.hasPermission("Ownership"))
      return message.channel.send(
        "**Sorry But You Dont Have Permission** OwnerShip "
      );
    let embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setAuthor(Tag, Avatar)
      .setTitle("✨ | ClickHere To Add " + `${client.user.username}` + " .")
      .setURL(
        "https://discordapp.com/oauth2/authorize?client_id=" +
          `${client.user.id}` +
          "&scope=bot&permissions=2080374975"
      )
      .setDescription(
        `AntiBan
Enabled:🟢 
Maximum Ban : ${config[message.guild.id].banLimit}
-
AntiKick
Enabled:🟢 
Maximum Kick : ${config[message.guild.id].kickLimits}
-
AntiChannelD
Enabled:🟢 
Maximum Delete : ${config[message.guild.id].chaDelLimit}
-
AntiChannelC
Enabled:🟢 
Maximum Create : ${config[message.guild.id].chaCrLimit}
-
AntiRoleD
Enabled:🟢 
Maximum Delete : ${config[message.guild.id].roleDelLimit}
-
AntiRoleC
Enabled:🟢 
Maximum Create : ${config[message.guild.id].roleCrLimits}
-
AntiTime
Enabled:🟢 
Maximum Time : ${config[message.guild.id].time}
`
      )
      .setFooter(Tag, Avatar);
    message.channel.send(embed);
  }
});
// ======== { • anti spam • }======== //

const antispam = require("discord-anti-spam"); //the main function for the anti spam
const AntiSpam = new antispam({
  warnThreshold: 3, // Amount of messages sent in a row that will cause a warning.
  banThreshold: 5, // Amount of messages sent in a row that will cause a ban
  maxInterval: 1000, // Amount of time (in ms) in which messages are cosidered spam.
  warnMessage: "{@user}, Stop spamming.", // Message will be sent in chat upon warning.
  banMessage: "**{user_tag} ** has been banned for spam.", // Message will be sent in chat upon banning.
  maxDuplicatesWarning: 7, // Amount of same messages sent that will be considered as duplicates that will cause a warning.
  maxDuplicatesBan: 10, // Amount of same messages sent that will be considered as duplicates that will cause a ban.
  deleteMessagesAfterBanForPastDays: 7, // Amount of days in which old messages will be deleted. (1-7)
  ignoreBots: false, // Ignore bot messages
  verbose: true // Extended Logs from module
});

AntiSpam.on("warnEmit", member =>
  console.log(`Attempt to warn ${member.user.tag}.`)
);
AntiSpam.on("warnAdd", member => console.log(`${member.user.tag} a ete warn.`));
AntiSpam.on("kickEmit", member =>
  console.log(`Attempt to kick ${member.user.tag}.`)
);
AntiSpam.on("kickAdd", member => console.log(`${member.user.tag} a ete kick.`));
AntiSpam.on("banEmit", member =>
  console.log(`Attempt to ban ${member.user.tag}.`)
);
AntiSpam.on("banAdd", member => console.log(`${member.user.tag} a ete ban.`));
AntiSpam.on("dataReset", () => console.log("Module cache has been cleared."));

client.on("ready", () => console.log(`Logged in as ${client.user.tag}.`));

client.on("message", msg => {
  AntiSpam.message(msg);
});
// ======== { • anti reklam • }======== //
client.on("message", msg => {
  if (msg.author.bot) return;
  if (msg.content.includes("http")) {
    if (msg.member.hasPermission("MANAGE_EMOJIS")) return;
    if (!msg.channel.guild) return;
    msg.delete();
    msg.reply("```You cant send link .```");
  }
});
// ======== { • anti everyone • }======== //
client.on("message", msg => {
  if (msg.author.bot) return;
  if (msg.content.includes("@everyone")) {
    if (msg.member.hasPermission("MENTION_EVERYONE")) return;
    if (!msg.channel.guild) return;
    msg.delete();
    msg.reply("```You cant send everyone .```");
  }
});
// ======== { • anti here • }======== //
client.on("message", msg => {
  if (msg.author.bot) return;
  if (msg.content.includes("@here")) {
    if (msg.member.hasPermission("MENTION_EVERYONE")) return;
    if (!msg.channel.guild) return;
    msg.delete();
    msg.reply("```You cant send here .```");
  }
});
////////KILLUA//////
client.on("message" , message => {
 
if(message.channel.type === 'dm') {
 
if (message.content.startsWith("https://discord.gg/")) {
 
  message.author.send(`ڕیکلامەکات بە سەرکەوتویی کرا ئێستا تۆش ئەو سێرڤەرە لە ریکلام دانی
https://discord.gg/atcD6Ak`)
 
  client.channels.get("762633929122381828").send(
`> Nerdra la layan <@${message.author.id}> 
${message.content}`)
}
    }
        })
