require('dotenv').config();
const { Client, IntentsBitField, ActivityType, PresenceUpdateStatus } = require('discord.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

const ESToptions = { 
  timeZone: 'America/New_York', 
  hour12: true,
  hour: '2-digit', 
  minute: '2-digit', 
};

const NZToptions = { 
  timeZone: 'Pacific/Auckland', 
  hour12: true,
  hour: '2-digit', 
  minute: '2-digit', 
};

function setPresence() {
  const now = new Date();
  const EST = now.toLocaleString('en-US', ESToptions);
  const NZT = now.toLocaleString('en-US', NZToptions);

  client.user.setPresence({ 
    activities: [
       {
        name: "NZ: " + NZT + " - | - US: " + EST,
        type: ActivityType.Custom
       }
      ], 
      status: PresenceUpdateStatus.Online
      
  });
}

client.on('ready', (c) => {
  console.log(`✅ ${c.user.tag} is online.`);

  const now = new Date();
  const msUntilNextMinute = 60000 - (now.getSeconds() * 1000) - now.getMilliseconds();
  
  setPresence();
  
  setTimeout(() => {
    setPresence();
    setInterval(setPresence, 60000);
  }, msUntilNextMinute);
});

client.on('messageCreate', (message) => {
  console.log(message);
});


client.login(process.env.TOKEN);