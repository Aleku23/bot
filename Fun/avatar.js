const Discord = require("discord.js")
const config = require("../../config.json");
const prefix = config.prefix;


module.exports.run = async (bot, message, args) => {
    let user = message.mentions.users.first() || message.author;
    let embed = new Discord.RichEmbed()
     .setAuthor(message.author.tag, message.author.displayAvatarURL)
     .setImage(user.displayAvatarURL)
     .setTimestamp()
    .setFooter(bot.user.username, bot.user.displayAvatarURL)
    message.channel.send(embed)
     
}



module.exports.help = {
    name: "avatar",
    aliases: "",
    usage: `**${prefix}**avatar`,
    description: "",
    noalias: "No Aliases",
    accessableby: "Members"

}