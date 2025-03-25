require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);

    // 🔹 Automatically send a message every 2 hours
    const discussionChannelId = "1353038831489777841"; // Replace with actual channel ID
    setInterval(async () => {
        try {
            const channel = await client.channels.fetch(discussionChannelId);
            if (channel) {
                channel.send("💬 Hey everyone! Feel free to share your thoughts and discuss anything here. Let's keep the conversation going! 🚀");
            } else {
                console.log("Discussion channel not found.");
            }
        } catch (error) {
            console.error("Error fetching the discussion channel:", error);
        }
    }, 2 * 60 * 60 * 1000); // 2 hours in milliseconds
});

// 🔹 Welcome New Members
client.on('guildMemberAdd', async member => {
    const generalChannelId = "1353432218932088873"; 
    const welcomeChannelId = "1353038830231617589"; 

    try {
        const channel1 = await member.guild.channels.fetch(generalChannelId);
        const channel2 = await member.guild.channels.fetch(welcomeChannelId);

        if (channel1) {
            channel1.send(`🎉 Welcome to the server, ${member.user}! 🎉  
Hey @everyone, let's give a warm welcome to ${member.user}!  
Feel free to introduce yourself, explore the channels, and join the conversation! 🚀😊`);
        }

        if (channel2) {
            channel2.send(`🎉 Welcome, ${member.user}! 🎉  
We’re excited to have you in our collaboration-focused community. This space is all about sharing ideas and working together.  
Please introduce yourself, explore the channels, and engage with others. Looking forward to collaborating with you!`);
        }
    } catch (error) {
        console.error("Error fetching welcome channels:", error);
    }
});

client.login(DISCORD_BOT_TOKEN);
