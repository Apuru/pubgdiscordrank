var Discord = require("discord.js");
var bot = new Discord.Client();
var fs = require("fs");
var _ = require("underscore");

const PUBGAPI_KEY = '2f9f3589-564f-488d-9326-df5d656ac99f';

const {PubgAPI, PubgAPIErrors} = require('pubg-api-redis');

// If no Redis configuration it wont be cached
const api = new PubgAPI({
  apikey: '2f9f3589-564f-488d-9326-df5d656ac99f',
});



// The Holy Pan

// verify
bot.on("message", msg => {
  let prefix = ".";
  if(!msg.content.startsWith(prefix)) return;
  if(msg.author.bot) return;
  if(msg.type === 'dm') return;
  if (msg.content.startsWith (prefix + "verify")) {

    // request the rank, display to console
    api.profile.byNickname(msg.author.username)
    .then((data) => {
      // filtering data
      for (var key in data.Stats) {
        // find current season
        if (data.Stats[key].Season === '2017-pre3') {
          console.log(data.Stats[key]);
          fs.writeFileSync("new.json", JSON.stringify(data.Stats[key],null, 2));
        }
      }

    //console.log (Object.keys(data.Stats));
    });
  };
});

bot.on("message", msg => {
  let prefix = ".";
  if(!msg.content.startsWith(prefix)) return;
  if(msg.author.bot) return;
  if(msg.type === 'dm') return;
  if (msg.content.startsWith (prefix + "update")) {
    let args = msg.content.split(" ").slice(1);
    let username = args[0];
    // request the rank, display to console
    api.profile.byNickname(username)
      .then((data) => {
      // filtering data
        for (var key in data.Stats) {
          // find current season
          if (data.Stats[key].Season === '2017-pre3' && match ) {
            console.log(data.Stats[key]);
            fs.appendFileSync("new.json", JSON.stringify(data.Stats[key],null, 2));
          }
        }
      });
    }});

// im ready
bot.on('ready', () => {
 console.log('Level 4 armour, ready!');
});


bot.login("TOKEN");
