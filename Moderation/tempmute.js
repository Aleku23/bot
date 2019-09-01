const Discord = require("discord.js")
const config = require("../../config.json");
const prefix = config.prefix;




module.exports.run = async (bot, message, args) => {
    //!tempmute @user 1s/m/h/d

    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tomute) return message.reply("Couldn't find user.");
    if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
    let muterole = message.guild.roles.find(`name`, "Muted");
    //start of create role
    if(!muterole){
      try{
        muterole = await message.guild.createRole({
          name: "Muted",
          color: "#000000",
          permissions:[]
        })
        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          });
        });
      }catch(e){
        console.log(e.stack);
      }
    }
    let target = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    let logs = message.guild.channels.find('name', config.logsChannel);

    if (!target) return message.reply('Please specify a member to mute!');
    
    if (!logs) return message.reply(`Please create a channel called ${config.logsChannel} to log the bans!`);
 
    let mutetime = args[1];
    if(!mutetime) return message.reply("You didn't specify a time!");
  
    await(tomute.addRole(muterole.id));
    let embed = new Discord.RichEmbed()
  .setColor('#00ff54')
  .setAuthor(`Moderation: Muted`,target.user.avatarURL)
  .addField("Muted:", `${target.user} (\`ID:${target.user.id}\`) `, true )
  .addField("Time:", `${ms(ms(mutetime))}`, true )
  .addField("Muted By:", `${message.author.username} (\`ID:${message.author.id}\`)`)

  .setTimestamp()
  .setFooter(bot.user.username, bot.user.displayAvatarURL);

  message.channel.send(`${target.user.username} was mute by ${message.author.username}.`);

  logs.send(embed);



  
    setTimeout(function(){
      tomute.removeRole(muterole.id);
      let eembed = new Discord.RichEmbed()
      .setColor('#00ff54')
      .setAuthor(`Moderation: UnMuted`,target.user.avatarURL)
      .addField("Unmuted:", `${target.user} (\`ID:${target.user.id}\`) `, true )
      .addField("Time:", `${ms(ms(mutetime))}`, true )
      .addField("Muted By:", `${message.author.username} (\`ID:${message.author.id}\`)`)
    
      .setTimestamp()
      .setFooter(bot.user.username, bot.user.displayAvatarURL);
      logs.send(eembed);
      
    }, ms(mutetime));
  
  

  }

module.exports.help = {
  name: "mute", 
    aliases: "",
    usage: `**${prefix}**mute`,
    description: "Assign a mute to a member!",
    noalias: "No Aliases!",
    accessableby: "Moderators!"

};