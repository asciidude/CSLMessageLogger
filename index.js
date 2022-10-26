require('dotenv').config();

const { color } = require('console-log-colors');
const { Client } = require('discord.js-selfbot-v13');
const client = new Client({ checkUpdate: false });

const fs = require('fs');

if(!fs.existsSync(__dirname + '/config.json')) {
    console.log(`${color.redBG('[Exception | FileNotFound]')} Unable to find file "config.json"`);
}

/**
 * Log layout:
 * [Notification] <Notification>
 * [Exception | <ExceptionType|Unspecified>] <Error>
 * [Log | <LogType|Unspecified> | <Guild Name> (<GID>)] <Tag>: <Message>
 */

let config;
client.on('ready', async () => {
    config = JSON.parse(await fs.readFileSync(__dirname + '/config.json', 'utf8'));
    console.log(`${color.blue('[Notification]')} CSLMessageLogger has been successfully started`);
});

client.on('messageCreate', async (message) => {
    if(message.author == null) return;
    if(!config.modules.guilds.bots && message.author.bot) return;
    if(message.guild != null && config.modules.servers_ignore.includes(message.guild.id)) return;

    if(
        config.modules.servers.length > 0
        && config.modules.servers.includes(message.guild.id)
    ) {
        if(message.guild == null) return;
        if(message.author.id === client.user.id) return;

        if(config.modules.guilds.create) {
            if(!config.modules.guilds.bots) {
                if(message.author.bot) return;
            }

            console.log(`${color.greenBright(`[Log | MessageCreate | ${message.guild.name} (${message.guild.id}) | #${message.channel.name}] `)}`
                                           + `${color.gray(message.author.tag)}: ${message.content}`);
            
            return;
        }
    }

    if(config.modules.servers.length === 0) {
        if(message.guild == null) return;
        if(message.author.id === client.user.id) return;
    
        if(config.modules.guilds.create) {
            if(!config.modules.guilds.bots) {
                if(message.author.bot) return;
            }
    
            console.log(`${color.greenBright(`[Log | MessageCreate | ${message.guild.name} (${message.guild.id}) | #${message.channel.name}] `)}`
                                           + `${color.gray(message.author.tag)}: ${message.content}`);
        }
    }

    if(config.modules.dms.create && message.channel.type == 'DM') {
        console.log(`${color.greenBright(`[Log | MessageCreate | ${message.author.tag}]`)} ${message.content}`);
    }
});

client.on('messageDelete', async (message) => {
    if(message.author == null) return;
    if(!config.modules.guilds.bots && message.author.bot) return;
    if(message.guild != null && config.modules.servers_ignore.includes(message.guild.id)) return;

    if(
        config.modules.servers.length > 0
        && config.modules.servers.includes(message.guild.id)
    ) {
        if(message.guild == null) return;
        if(message.author.id === client.user.id) return;

        if(config.modules.guilds.delete) {
            console.log(`${color.redBright(`[Log | MessageDelete | ${message.guild.name} (${message.guild.id})] | #${message.channel.name}] `)}`
                                         + `${color.gray(message.author.tag)}: ${message.content}`);
        }
    }

    if(config.modules.servers.length === 0) {
        if(message.guild == null) return;
        if(message.author.id === client.user.id) return;
    
        if(config.modules.guilds.delete) {
            console.log(`${color.redBright(`[Log | MessageDelete | ${message.guild.name} (${message.guild.id})] | #${message.channel.name}] `)}`
                                         + `${color.gray(message.author.tag)}: ${message.content}`);
        }
    }

    if(config.modules.dms.delete && message.channel.type == 'DM') {
        console.log(`${color.redBright(`[Log | MessageDelete | ${message.author.tag}]`)} ${message.content}`);
    }
});

client.on('messageUpdate', async (oldMessage, newMessage) => {
    if(oldMessage.author == null || newMessage.author == null) return;
    if(!config.modules.guilds.bots && newMessage.author.bot) return;
    if(newMessage.guild != null && config.modules.servers_ignore.includes(newMessage.guild.id)) return;

    if(
        config.modules.servers.length > 0
        && config.modules.servers.includes(newMessage.guild.id)
    ) {
        if(newMessage.guild == null) return;
        if(newMessage.author.id === client.user.id) return;

        if(config.modules.guilds.edit) {
            console.log(`${color.bgGreenBright(`[Log | MessageEdit | ${newMessage.guild.name} (${newMessage.guild.id}) | #${newMessage.channel.name}]`)} `
                                             + `${color.gray(newMessage.author.tag)}: ${oldMessage.content} > ${newMessage.content}`);
        }

        return;
    }

    if(config.modules.servers.length === 0) {
        if(newMessage.guild == null) return;
        if(newMessage.author.id === client.user.id) return;
    
        if(config.modules.guilds.edit) {
            console.log(`${color.bgGreenBright(`[Log | MessageEdit | ${newMessage.guild.name} (${newMessage.guild.id}) | #${newMessage.channel.name}]`)} `
                                             + `${color.gray(newMessage.author.tag)}: ${oldMessage.content} > ${newMessage.content}`);
        }
    }

    if(config.modules.dms.edit && oldMessage.channel.type == 'DM') {
        console.log(`${color.bgGreenBright(`[Log | MessageEdit | ${newMessage.author.tag}]`)} ${oldMessage.content} > ${newMessage.content}`);
    }
});

client.login(process.env.TOKEN).catch(() => {
    console.log(`${color.redBG('[Exception | TokenError]')} Unable to login. Your token could be invalid or this script could be outdated.`);
    process.exit(-1);
});
