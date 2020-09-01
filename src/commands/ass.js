exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    /*
    const Discord = require("discord.js");

    if (!message.channel.nsfw) return message.channel.send("This command can not be used here, go to a NSFW channel instead.");

    const ahegao = all('ahegao')
        console.log(ahegao)
        const kEmbed = new Discord.MessageEmbed()
        .setImage(ahegao)
        .setColor("RANDOM")
        .setFooter(`Requested by: ${message.author.tag}`);

        message.channel.send(kEmbed);
        */
       const snekfetch = require("snekfetch")
       const Discord = require("discord.js");
   
       if (!message.channel.nsfw) return message.channel.send("This command can not be used here, go to a NSFW channel instead.");
   

       const id = [Math.floor(Math.random() * 4923)];
       const res = await snekfetch.get(`http://api.obutts.ru/butts/${id}`);
       const preview = res.body[0]["PREVIEW".toLowerCase()];
       const image = `http://media.obutts.ru/${preview}`;

       const embed = new Discord.MessageEmbed()
           .setFooter('http://obutts.ru/')
           .setImage(image)
           .setColor('#CEA0A6');
       return message.channel.send({ embed });
   };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
  };
  
  exports.help = {
    name: "ass",
    category: "NSFW",
    description: "Gives you a ass.",
    usage: "ass"
  };