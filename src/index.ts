import {
  AttachmentBuilder,
  Client,
  EmbedBuilder,
  Events,
  GatewayIntentBits,
  TextChannel,
} from "discord.js";
import dotenv from "dotenv";
import { createBanner } from "./helper/createBanner";

// Load environment variables from .env file
dotenv.config();
const TOKEN = process.env.DISCORD_TOKEN;
// const CLIENT_ID = process.env.CLIENT_ID;
// const GUILD_ID = process.env.GUILD_ID;
const CHANNEL_ID = process.env.WELCOME_CHANNEL_ID;

// Create a new Discord client instance with the necessary intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    // GatewayIntentBits.GuildMessages,
    // GatewayIntentBits.MessageContent
  ],
});

// Log a message once the client is ready
client.once(Events.ClientReady, (client) => {
  console.log("Ready!", client.user.tag);
});

// Event listener for when a new member joins the guild
client.on(Events.GuildMemberAdd, async (member) => {
  try {
    // Create a welcome banner for the new member
    const imageBuffer = await createBanner(member);

    // Create an attachment for the banner image
    const attachment = new AttachmentBuilder(imageBuffer, {
      name: "banner.jpg",
    });

    // Create an embed message to welcome the new member
    const embed = new EmbedBuilder()
      .setTitle(`Hallo, ${member.user.username}`)
      .setDescription(
        `
          Selamat datang di server discord\n
          INFORMATIKA 24
        `,
      )
      .setThumbnail(
        member.user.displayAvatarURL({
          size: 64,
          extension: "jpg",
        }),
      )
      .setImage("attachment://banner.jpg");

    // Fetch the welcome channel and send the welcome message with the embed and banner
    const welcomeChannel = (await member.client.channels.fetch(
      CHANNEL_ID ?? "",
    )) as TextChannel;
    await welcomeChannel.send({
      content: `<@${member.id}> Welcome`,
      allowedMentions: {
        users: [member.id],
      },
      embeds: [embed],
      files: [attachment],
    });
  } catch (err) {
    console.log(err);
  }
});

// Main function to login the client
async function main(): Promise<void> {
  console.log("BOT READY");
  await client.login(TOKEN);
}

// Execute the main function
try {
  main();
} catch (err) {
  console.error(err);
}
