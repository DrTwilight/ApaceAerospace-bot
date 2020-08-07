const { Command } = require('discord.js-commando');
const querystring = require("querystring");
const r2 = require("r2");
const CAT_API_URL = 'https://api.thecatapi.com/';
const CAT_API_KEY   = "471c2c23-09c9-49f5-80cb-b297f31ad813";// get one free from theCatAPI.com

module.exports = class CatCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'cat',
            group: 'fun',
            memberName: 'cat',
            description: 'Meow.',
            throttling: {
              usages: 2,
              duration: 10,
            },
        });
    }
    
    async run(message, args) {
      try{
        var images = await this.loadImage(message.author.username);
    
        var image = images[0];
    
        console.log('message processed','showing image.id:',image.id)
        message.channel.send({files: [ image.url ] } );
    
      }catch(error)
      {
        console.log(error)
      }
    }

    async loadImage(sub_id)
    {

      var headers = {
          'X-API-KEY': CAT_API_KEY,
      }
      var query_params = {
        //'has_breeds':true,
        'mime_types':'jpg,png',
        'size':'med',  
        'sub_id': sub_id, 
        'limit' : 1
      }

      let queryString = querystring.stringify(query_params);
    
      try {
        let _url = CAT_API_URL + `v1/images/search?${queryString}`;
        var response = await r2.get(_url , {headers} ).json
      } catch (e) {
          console.log(e)
      }
      return response;
    }
}