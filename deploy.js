import "dotenv/config";
import { REST, Routes } from "discord.js";

const commands = [
   {
      name: "history",
      description: "Check match history",
      options: [
         {
            type: 3,
            name: "nickname",
            description: "Enter your marvel rivals nickname",
            requiered: true,
         },
      ],
      type: 1,
      integration_types: [0, 1],
      contexts: [0, 1, 2],
   },
];

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

console.log(process.env.DISCORD_TOKEN);
const register = async () => {
   console.log("wewww");
   try {
      console.log("Registering commands");
      await rest.put(Routes.applicationGuildCommand(process.env.APP_ID, process.env.GUILD_ID), {
         body: commands,
      });
      console.log("register success");
   } catch (error) {
      console.log("error", error);
   }
};

register();
