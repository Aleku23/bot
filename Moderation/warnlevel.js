const fs = require("fs");
const Discord = require("discord.js")
const config = require("../../config.json");
const prefix = config.prefix;

let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

    let target = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
     if (!target) return message.reply('Please specify a member to mute!');

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You can't do that.");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("Couldn't find them yo");
  let warnlevel = warns[wUser.id].warns;

  let embed = new Discord.RichEmbed()
  .setColor('#00ff54')
  .setAuthor(target.user.tag, target.user.avatarURL)
  .setDescription(`Are **${warnlevel}w** in accest moment! `)
  message.channel.send(embed)

}

module.exports.help = {
  name: "warnlevel",
  aliases: "",
  usage: `**${prefix}**warnlevel`,
  description: "",
  noalias: "No Aliases",
  accessableby: "Moderators"
}
