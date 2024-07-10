import { createCanvas, loadImage, registerFont } from "canvas";
import path from "path";
import { GuildMember } from "discord.js";
import * as fs from "fs";

// Register the custom font
const fontPath = path.resolve(
  __dirname,
  "../assets/fonts/Poppins-ExtraBold.ttf",
);
registerFont(fontPath, {
  family: "Poppins",
  weight: "800",
  style: "extra-bold",
});

/**
 * Creates a welcome banner for a new guild member.
 *
 * @param {GuildMember} guildMember - The guild member to create the banner for.
 * @returns {Promise<Buffer>} - A promise that resolves to a buffer containing the image data.
 */
export async function createBanner(guildMember: GuildMember): Promise<Buffer> {
  try {
    // Create a canvas with the specified width and height
    const canvas = createCanvas(512, 302);
    const ctx = canvas.getContext("2d");

    // Load the background image
    const background = await loadImage(
      path.join(__dirname, "../assets/banner.jpg"),
    );

    // Draw the background image on the canvas
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Set the member name and truncate if it's too long
    let memberName = guildMember.displayName;
    ctx.font = "35px Poppins";
    ctx.fillStyle = "rgb(40, 40, 40)";
    if (memberName.length > 15) memberName = memberName.slice(0, 15) + "...";

    // Draw the welcome text on the canvas
    ctx.fillText(`WELCOME \n${memberName}`, 20, 150);

    // Convert the canvas to a buffer
    const buffer = canvas.toBuffer("image/png");

    // Save the buffer as a PNG file
    fs.writeFileSync("banner.png", buffer);

    // Return the buffer
    return buffer;
  } catch (error) {
    console.error("Error creating banner:", error);
    throw error;
  }
}
