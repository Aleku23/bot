const Discord = require("discord.js")
const config = require("../../config.json");
const prefix = config.prefix;


module.exports.run = async (bot, message, args) => {

    message.channel.send("Pining...").then(m => {
        let ping = m.createdTimestamp = message.createdTimestamp
        let choices = ["Is this really my ping","Is it okay? ","I hope it isn't bad"]
        let response = choices[Math.floor(Math.random() * choices.length)]
        
          m.edit(`${response}: \`${Math.round(bot.ping)}\`API!`)

     })
     

}


module.exports.help = {
    name: "ping",
    aliases: "",
    usage: `**${prefix}**ping`,
    description: "",
    noalias: "No Aliases",
    accessableby: "Members"

}