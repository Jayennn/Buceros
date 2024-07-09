import {createCanvas, loadImage, registerFont} from "canvas";
import path from "path";
import {Client, GuildMember} from "discord.js";
import * as fs from "fs";

const fontPath = path.resolve(__dirname, "../assets/fonts/Poppins-ExtraBold.ttf");
registerFont(fontPath, { family: 'Poppins', weight: "800", style: "extra-bold" });

export async function createBanner(guildMember: GuildMember, client: Client) {
    try {
        const canvas = createCanvas(512, 302);
        const ctx = canvas.getContext('2d');
        const background = await loadImage(path.join(__dirname, "../assets/banner.jpg"));

        // Draw background image
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        // Draw welcome text with member name
        let memberName = guildMember.displayName;
        ctx.font = '50px Poppins';
        ctx.fillStyle = 'rgb(40, 40, 40)';
        if(memberName.length > 4) memberName = memberName.substring(0, 5).toUpperCase();
        ctx.fillText(`WELCOME \n${memberName}`, 10, 100);


        // Save canvas as buffer
        const buffer = canvas.toBuffer('image/png');

        // Optionally, save the buffer to a file
        fs.writeFileSync('banner.png', buffer);

        return buffer;
    } catch (error) {
        console.error('Error creating banner:', error);
        throw error; // Propagate the error for handling elsewhere
    }
}


