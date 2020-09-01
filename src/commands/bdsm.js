exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const snekfetch = require("snekfetch")
    const Discord = require("discord.js");

    if (!message.channel.nsfw) return message.channel.send("This command can not be used here, go to a NSFW channel instead.");
    let reddit = [
        "bdsm",
        "bondage",
        "hentaibondage"
   ]

   let subreddit = reddit[Math.floor(Math.random() * reddit.length)];
    try {
     const { body } = await snekfetch
         .get(`https://www.reddit.com/r/${subreddit}.json?sort=top&t=week`)
         .query({ limit: 800 });
     const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
     if (!allowed.length) return message.channel.send('It seems we are out of fresh memes!, Try again later.');
     const randomnumber = Math.floor(Math.random() * allowed.length)
     const embed = new Discord.MessageEmbed()
     .setColor(0x00A2E8)
     .setTitle(allowed[randomnumber].data.title)
     .setDescription("Posted by: " + allowed[randomnumber].data.author)
     .setImage(allowed[randomnumber].data.url)
     .addField("Other info:", "Up votes: " + allowed[randomnumber].data.ups + " / Comments: " + allowed[randomnumber].data.num_comments)
     .setFooter(`Requested by: ${message.author.tag}`)
     message.channel.send(embed)
 } catch (err) {
     return console.log(err);
 }
}

exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: [],
 permLevel: "User"
};

exports.help = {
 name: "bdsm",
 category: "NSFW",
 description: "Gives you bdsm porn.",
 usage: "bdsm"
};