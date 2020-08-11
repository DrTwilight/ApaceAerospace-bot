
const { Command } = require('discord.js-commando');
const ytdl = require('ytdl-core');
const { YOUTUBE_API_KEY, QUEUE_LIMIT } = require("../../Config.json");
const { Util, MessageEmbed } = require("discord.js");
const YoutubeAPI = require("simple-youtube-api");
const youtube = new YoutubeAPI(YOUTUBE_API_KEY);
const { play } = require("../../system/music.js");

module.exports = class PlayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'play',
			group: 'music',
			memberName: 'play',
      description: 'Play a youtube video',
      args: [
          {
              type: 'string',
              prompt: 'What video would you like to search for?',
              key: 'targetsong',
              aliases: ['p'],
              validate: messages => {
                  if(ytdl.validateURL(messages)) return true;
                  if(messages.length > 0) return true;
                  return `...How`
              }
          },
      ],
		});
    }
    async run(message, { targetsong }) {
      let embed = new MessageEmbed();      
      
          //FIRST OF ALL WE WILL ADD ERROR MESSAGE AND PERMISSION MESSSAGE
          if (!targetsong.length) {
            //IF AUTHOR DIDENT GIVE URL OR NAME
            embed.setAuthor("WRONG SYNTAX : Type `play <URL> or text`")
            return message.channel.send(embed);
          }
      
          const { channel } = message.member.voice;
              
          if (!channel) {
            //IF AUTHOR IS NOT IN VOICE CHANNEL
            embed.setAuthor("YOU NEED TO BE IN VOICE CHANNEL :/")
            return message.channel.send(embed);
          }
      
      
          const videoPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
          const playlistPattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi;
          const urlcheck = videoPattern.test(targetsong);
      
          if (!videoPattern.test(targetsong) && playlistPattern.test(targetsong)) {
            embed.setAuthor("I am Unable To Play Playlist for now")
            return message.channel.send(embed);
          }
      
          const serverQueue = message.client.queue.get(message.guild.id);
      
          const queueConstruct = {
            textChannel: message.channel,
            channel,
            connection: null,
            songs: [],
            loop: false,
            volume: 100,
            playing: true
          };
          
          const voteConstruct = {
            vote: 0,
            voters: []
          }
      
          let songData = null;
          let song = null;
      
          if (urlcheck) {
            try {
              songData = await ytdl.getInfo(targetsong);
            
              song = {
                title: songData.videoDetails.title,
                url: songData.videoDetails.video_url,
                duration: songData.videoDetails.lengthSeconds,
                thumbnail: songData.videoDetails.thumbnail.thumbnails[3].url
              };
            } catch (error) {
              if (message.include === "copyright") {
                return message
                  .reply("THERE IS COPYRIGHT CONTENT IN VIDEO -_-")
                  .catch(console.error);
              } else {
                console.error(error);
              }
            }
          } else {
                
            try {
              const result = await youtube.searchVideos(targetsong, 1);
              songData = await ytdl.getInfo(result[0].url);
            
              song = {
                title: songData.videoDetails.title,
                url: songData.videoDetails.video_url,
                duration: songData.videoDetails.lengthSeconds,
                thumbnail: songData.videoDetails.thumbnail.thumbnails[3].url,
              };
            } catch (error) {
              console.log(error)
              if(error.errors[0].domain === "usageLimits") {
                return message.channel.send("Your YT API limit is over and it will be restored under 24 hours")
              }
            }
          }
      
          if (serverQueue) {
              if(serverQueue.songs.length > Math.floor(QUEUE_LIMIT - 1) && QUEUE_LIMIT !== 0) {
            return message.channel.send(`You can not add songs more than ${QUEUE_LIMIT} in queue`)
          }
            
          
            serverQueue.songs.push(song);
            embed.setAuthor("Added New Song To Queue", this.client.user.displayAvatarURL())
            embed.setDescription(`**[${song.title}](${song.url})**`)
            embed.setThumbnail(song.thumbnail)
            .setFooter("Likes - " + songData.videoDetails.likes + ", Dislikes - " +  songData.videoDetails.dislikes)
            
            return serverQueue.textChannel
              .send(embed)
              .catch(console.error);
          } else {
            queueConstruct.songs.push(song);
          }
      
          if (!serverQueue)
            message.client.queue.set(message.guild.id, queueConstruct);
             message.client.vote.set(message.guild.id, voteConstruct);
          if (!serverQueue) {
            try {
              queueConstruct.connection = await channel.join();
              play(queueConstruct.songs[0], message);
            } catch (error) {
              console.error(`Could not join voice channel: ${error}`);
              message.client.queue.delete(message.guild.id);
              await channel.leave();
              return message.channel
                .send({
                  embed: {
                    description: `😭 | Could not join the channel: ${error}`,
                    color: "#ff2050"
                  }
                })
                .catch(console.error);
            }
          }
        }
      };