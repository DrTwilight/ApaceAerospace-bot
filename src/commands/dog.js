const randomPuppy = require('random-puppy');
exports.run = async (client, message, args) => {
  const reddit = [
    'dogpictures',
    'dogs',
    'rarepuppers',
    'dogswithjobs',
    'WhatsWrongWithYourDog',
  ];

  const subreddit = reddit[Math.floor(Math.random() * reddit.length)];
  const dog = await randomPuppy(subreddit);
  message.channel.send({
    files: [{
      attachment: dog,
      name: 'dog.png',
    }],
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User',
};

exports.help = {
  name: 'dog',
  category: 'Fun',
  description: 'It returns a dog.',
  usage: 'dog',
};
