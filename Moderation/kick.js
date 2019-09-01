

const config = require("../../config.json");
const prefix = config.prefix;

module.exports.run = async (bot, message, args) => {

    let target = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let reason = args.slice(1).join(' ');
    let logs = message.guild.channels.find('name', config.logsChannel);

    if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply('You do not have permissions to use this command!s');

    if (!target) return message.reply('Please specify a member to kick!');
    if (!reason) return message.reply('Please specify a reason for this kick!');
    if (!logs) return message.reply(`Please create a channel called ${config.logsChannel} to log the kicks!`);
    
    let embed = new discord.RichEmbed()
    .setColor('#00ff54')
    .setAuthor(`Moderation: Kicked`,target.user.avatarURL)
    .addField("Kick:", `${target.user.username} (\`ID:${target.user.id}\`) `, true )
    .addField("Reason:", reason, true)
    .addField("Kicked By:", `${message.author.username} (\`ID:${message.author.id}\`)`)
    .setTimestamp()
    .setFooter(bot.user.username, bot.user.displayAvatarURL);


    message.channel.send(`${target.user.username} was kicked by ${message.author} for ${reason}`);
    target.kick(reason);
    logs.send(embed);

    
    
   

};

       

module.exports.help = {
  name: "kick", 
    aliases: "",
    usage: `**${prefix}**kick`,
    description: "Assign a kick to a member!",
    noalias: "No Aliases!",
    accessableby: "Moderators!"

};