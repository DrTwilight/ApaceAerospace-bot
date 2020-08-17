exports.run = async (client, message, args, level) => {
    const num = Math.floor(Math.random() * 100000);
    return message.send(`Fursona #${num}`, {
        files: [`https://thisfursonadoesnotexist.com/v2/jpgs/seed${num.toString().padStart(5, '0')}.jpg`]
    });
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
  };
  
  exports.help = {
    name: "furry",
    category: "Fun",
    description: "Responds with a randomly generated fursona.",
    usage: "furry"
  };