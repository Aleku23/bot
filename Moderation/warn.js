const Discord = require("discord.js")
const config = require("../../config.json");
const prefix = config.prefix;

const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

  //!warn @daeshan <reason>
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("No can do pal!");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("Couldn't find them yo");
  if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("They waaaay too kewl");
  let reason = args.join(" ").slice(22);
  let target = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });

  let warnEmbed = new Discord.RichEmbed()
  .setColor('#00ff54')
  .setAuthor(`Moderation: Warns`,target.user.avatarURL)
  .addField("Warned:", `${target.user} (\`ID:${target.user.id}\`) `, true )
  .addField("Reason:", reason, true)
  .addField("Warn By:", `${message.author.username} (\`ID:${message.author.id}\`)`, true)
  .addField("Warnings", warns[wUser.id].warns, true)
  .setTimestamp()
  .setFooter(bot.user.username, bot.user.displayAvatarURL);


  let warnchannel = message.guild.channels.find(`name`, "logs");
  if(!warnchannel) return message.reply("Couldn't find channel");

  warnchannel.send(warnEmbed);

  if(warns[wUser.id].warns == 2){
    let muterole = message.guild.roles.find(`name`, "Muted");
    if(!muterole) return message.reply("You should create that role dude.");

    let mutetime = "10s";
    await(wUser.addRole(muterole.id));
    message.channel.send(`<@${wUser.id}> has been temporarily muted`);

    setTimeout(function(){
      wUser.removeRole(muterole.id)
      message.reply(`<@${wUser.id}> has been unmuted.`)
    }, ms(mutetime))
  }
  if(warns[wUser.id].warns == 3){
    message.guild.member(wUser).ban(reason);
    message.reply(`<@${wUser.id}> has been banned.`)
  }

}


  

module.exports.help = {
  name: "warn",
  aliases: "",
    usage: `**${prefix}**warn`,
    description: "",
    noalias: "No Aliases",
    accessableby: "Moderators"


}