import {AttachmentBuilder, Client, EmbedBuilder, Events, GatewayIntentBits, REST, TextChannel} from "discord.js";
import dotenv from "dotenv";
import {createBanner} from "./helper/createBanner";

dotenv.config();
const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;
const CHANNEL_ID = process.env.WELCOME_CHANNEL_ID;


const rest = new REST({version: '10'}).setToken(TOKEN ?? "");
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
        // GatewayIntentBits.GuildMessages,
        // GatewayIntentBits.MessageContent
    ]
});

client.once(Events.ClientReady, (client) => {
    console.log("Ready!", client.user.tag);
});

client.on(Events.GuildMemberAdd, async(message) => {
    try {
        if(typeof GUILD_ID !== "undefined") {
            const client = message.client;
            const imageBuffer = await createBanner(message, client);
            const welcomeChannel =  await message.client.channels.fetch(CHANNEL_ID ?? "") as TextChannel;
            const attachment = new AttachmentBuilder("../assets/banner.jpg");

            const embed = new EmbedBuilder()
                .setTitle(`Hallo, ${message.user.username}`)
                .setDescription(
                    `
                        Selamat datang di server discord\n
                        INFORMATIKA 24
                        \n
                    `
                )
                .setThumbnail(message.avatarURL({
                    size: 64,
                    extension: "jpg"
                }))
                .setImage("attachment://banner.jpg")
                .setFooter({text: "AYAM GORWENG"})

            await welcomeChannel.send({
                content: `<@${message.id}> Welcome`,
                allowedMentions: {
                    users: [message.id]
                },
                embeds: [embed],
                files: [attachment]
            });
        }
    } catch (err){
        console.log(err);
    }
});


async function main(): Promise<void> {
    console.log("BOT READY")
    await client.login(TOKEN);
}

try {
    main();
} catch (err){
    console.error(err);
}
