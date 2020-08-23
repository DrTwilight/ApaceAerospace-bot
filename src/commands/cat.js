const randomPuppy = require('random-puppy');
exports.run = async (client, message, args) => {
    let reddit = [
      "catpictures",
      "cats",
      "CatGhost"
    ]

    let subreddit = reddit[Math.floor(Math.random() * reddit.length)];
    const cat = await randomPuppy(subreddit)
    message.channel.send({
        files: [{
            attachment: cat,
            name: 'cat.png'
        }]
    })
};
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
  };
  
  exports.help = {
    name: "cat",
    category: "Fun",
    description: "It returns a cat.",
    usage: "cat"
  };