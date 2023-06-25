require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on('ready', (c) => {
  console.log(`✅ ${c.user.tag} is online.`);
});

client.on('interactionCreate', async (interaction) => {
  try {
    if (!interaction.isButton()) return;
    await interaction.deferReply({ ephemeral: true });

    const role = interaction.guild.roles.cache.get(interaction.customId);
    if (!role) {
      interaction.editReply({
        content: "I couldn't find that role",
      });
      return;
    }

    const hasRole = interaction.member.roles.cache.has(role.id);

    if (hasRole) {
      await interaction.member.roles.remove(role);
      await interaction.editReply(`Role ${role} has been removed. Remember, risks are the stepping stones to extraordinary rewards. Embrace the uncertainty, push your limits, and unlock new possibilities on your journey to greatness.`);
      return;
    }

    await interaction.member.roles.add(role);
    await interaction.editReply(`Congratulations! You've claimed the ${role} role. Remember, no risk, no reward. Embrace this opportunity and let your journey begin! Make sure to join Dice Gang 🎲 and roll the dice of possibilities!`);
  } catch (error) {
    console.log(error);
  }
});

client.login(process.env.TOKEN);
