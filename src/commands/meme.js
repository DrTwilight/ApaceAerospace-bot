const randomPuppy = require('random-puppy');
exports.run = async (client, message, args) => {
    let reddit = [
        "meme",
        "animemes",
        "MemesOfAnime",
        "animememes",
        "AnimeFunny",
        "dankmemes",
        "dankmeme",
        "wholesomememes",
        "MemeEconomy",
        "techsupportanimals",
        "meirl",
        "me_irl",
        "2meirl4meirl",
        "AdviceAnimals",
        "furry_irl"
    ]

    let subreddit = reddit[Math.floor(Math.random() * reddit.length)];
    const meme = await randomPuppy(subreddit)
    message.channel.send({
        files: [{
            attachment: meme,
            name: 'meme.png'
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
    name: "meme",
    category: "Fun",
    description: "It returns a meme.",
    usage: "meme"
  };