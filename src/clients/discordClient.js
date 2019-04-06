import Discord from 'discord.js';
import auth from 'auth.json';
import twitchClient from 'twitchClient.js';

const client = new Discord.Client();


client.on('ready', () => {
    console.log("Let's do this!");
});

client.on('message', message => {
    if (message.content.contains('!aretheystreaming')) {
        let streamerToSearch = message.content.split(' ')[1];
        let isStreaming = twitchClient.isStreaming(streamerToSearch);
        if (isStreaming) {
            message.channel.send(`Yes, ${streamerToSearch} is currently streaming. Go check out his channel!`);
        } else {
            message.channel.send(`No, ${streamerToSearch} is currently not streaming. Check again later!`);
        } 
        
    }
});

client.login(auth.token);