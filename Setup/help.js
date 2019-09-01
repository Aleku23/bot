const Discord = require("discord.js")
const config = require("../../config.json");
const prefix = config.prefix;


module.exports.run = async (bot, message, args) => {

    if(args[0] == "help") return message.channel.send(`Just do ${prefix}help instead.`)

    if(args[0]) {
        let command = args[0];

        if(bot.commands.has(command)) {
            command = bot.commands.get(command);
            var SHembed = new Discord.RichEmbed()
            .setThumbnail(bot.user.displayAvatarURL)
       
            .setAuthor(`Helping` , message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(`The bot prefix is: **${prefix}**\n\n**Usage:** ${command.help.usage || "None"}\n**Description:** ${command.help.description || "None"}\n**Accessable by:** ${command.help.accessableby || "Members"}\n**Aliases:** ${command.help.noalias || command.help.aliases}`)
            .setFooter(bot.user.username, bot.user.displayAvatarURL)
            message.channel.send(SHembed);       
        }

    }

    

        if(!args[0]) {
            message.delete();
            let embed = new Discord.RichEmbed()
            .setAuthor( `Help Command!`,message.author.displayAvatarURL )
           
            .setDescription(`**${message.author.username}** check your dm's!`)

            let Semed = new Discord.RichEmbed()
            
            .setAuthor(`Helps`,message.author.displayAvatarURL)
            .setThumbnail(bot.user.displayAvatarURL)
            .setTimestamp()
            .setDescription(`Write **${prefix}help** to see the commands.`)
        .addField('🔨 Admin',  '`kick`, `rejected`, `clear`, `accepted`, `say`') 
        .addField('⚙️ Core',  '`avatar`, `ping`, `serverinfo` ')
            .setFooter(bot.user.username, bot.user.displayAvatarURL);
            message.channel.send(embed).then(m => m.delete(10000));
            message.author.send(Semed)
        }

}

        

module.exports.help = {
    name: "help", 
    aliases: "",
    usage: `**${prefix}**help`,
    description: "Information order!",
    noalias: "No Aliases!",
    accessableby: "Members!"


}