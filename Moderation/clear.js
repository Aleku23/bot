const discord = require("discord.js");
const config = require("../../config.json");
const prefix = config.prefix;

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("No.");
    if(!args[0]) return message.channel.send("no");
    message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`✔️`).then(msg => msg.delete(2000));
  });

};

module.exports.help = {
  name: "clear", 
    aliases: "",
    usage: `**${prefix}**ban`,
    description: "Information order!",
    noalias: "No Aliases!",
    accessableby: "Moderators!"

};