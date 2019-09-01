const discord = require("discord.js");
const config = require("../../config.json");
const prefix = config.prefix;

module.exports.run = async (bot, message, args) => {


    let target = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let reason = args.slice(1).join(' ');
    let logs = message.guild.channels.find('name', config.logsChannel);

    if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply('You do not have permissions to use this command!s');

    if (!target) return message.reply('Please specify a member to ban!');
    if (!reason) return message.reply('Please specify a reason for this ban!');
    if (!logs) return message.reply(`Please create a channel called ${config.logsChannel} to log the bans!`);
    
    let embed = new discord.RichEmbed()
        
    .setColor('#00ff54')
    .setAuthor(`Moderation: Banned`,target.user.avatarURL)
    .addField("Ban:", `${target.user.username} (\`ID:${target.user.id}\`) `, true )
    .addField("Reason:", reason, true)
    .addField("Banned By:", `${message.author.username} (\`ID:${message.author.id}\`)`)
    .setTimestamp()
    .setFooter(bot.user.username, bot.user.displayAvatarURL);

    message.channel.send(`${target.user.username} was banned by ${message.author} for ${reason}`);
    target.ban(reason);
    logs.send(embed);






};

module.exports.help = {
  name: "ban", 
    aliases: "",
    usage: `**${prefix}**ban`,
    description: "Assign a ban to a member!!",
    noalias: "No Aliases!",
    accessableby: "Moderators!"

};