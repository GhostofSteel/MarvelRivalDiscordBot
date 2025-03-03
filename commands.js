import "dotenv/config";
import { getRPSChoices } from "./game.js";
import { capitalize, InstallGlobalCommands } from "./utils.js";

// Get the game choices from game.js
function createCommandChoices() {
   const choices = getRPSChoices();
   const commandChoices = [];

   for (let choice of choices) {
      commandChoices.push({
         name: capitalize(choice),
         value: choice.toLowerCase(),
      });
   }

   return commandChoices;
}

// Simple test command
const TEST_COMMAND = {
   name: "test",
   description: "Basic command",
   type: 1,
   integration_types: [0, 1],
   contexts: [0, 1, 2],
};

//History command
const HISTORY_COMMAND = {
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
};
const ALL_COMMANDS = [TEST_COMMAND, HISTORY_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
