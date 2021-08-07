const express = require("express");
const app = express();

app.listen(() => console.log('phantom Bot Ready !'));

app.use('/ping', (req, res) => {
  res.send(new Date());
});

const Discord = require("discord.js");
const fs = require("fs");

const client = new Discord.Client();
const config = require("./config.js");
client.config = config;
client.queue = new Map()

fs.readdir("./EventsCompiler/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./EventsCompiler/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});
client.CommandsCompiler = new Discord.Collection()

fs.readdir("./CommandsCompiler/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./CommandsCompiler/${file}`);
    let commandName = file.split(".")[0];
    console.log(`${commandName} Is Ready Now..`);
    client.CommandsCompiler.set(commandName, props);
  });
});


client.login(config.token);



//Use ' node . ' to start the bot