
const discord = require("discord.js");
const config = require("../../config.json");
const prefix = config.prefix;



module.exports.run = async (bot, message, args) => {
   
    let reason = args.join(' ') ? args.join(' ') : "I'm busy, I will reply as soon possible.";
    let afklist = bot.afk.get(message.author.id);

    if (!afklist) {
        let construct = {
            id: message.author.id,
            reason: reason
        };

        bot.afk.set(message.author.username, construct);
        return message.channel.send(`Now you are afk for: **${reason}**`).then(msg => msg.delete(5000));
    }

};

module.exports.help = {
    name: 'afk',
    aliases: "",
    usage: `**${prefix}**afk`,
    description: "Information order!",
    noalias: "No Aliases!",
    accessableby: "Members!"


};