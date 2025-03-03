import "dotenv/config";

export async function DiscordRequest(endpoint, options) {
   // append endpoint to root API URL
   const url = "https://discord.com/api/v10/" + endpoint;
   // Stringify payloads
   if (options.body) options.body = JSON.stringify(options.body);
   // Use fetch to make requests
   const res = await fetch(url, {
      headers: {
         Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
         "Content-Type": "application/json; charset=UTF-8",
         "User-Agent": "DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)",
      },
      ...options,
   });
   // throw API errors
   if (!res.ok) {
      const data = await res.json();
      console.log(res.status);
      throw new Error(JSON.stringify(data));
   }
   // return original response
   return res;
}

export async function InstallGlobalCommands(appId, commands) {
   // API endpoint to overwrite global commands
   const endpoint = `applications/${appId}/commands`;

   try {
      // This is calling the bulk overwrite endpoint: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
      await DiscordRequest(endpoint, { method: "PUT", body: commands });
   } catch (err) {
      console.error(err);
   }
}

// Simple method that returns a random emoji from list
export function getRandomEmoji() {
   const emojiList = [
      "😭",
      "😄",
      "😌",
      "🤓",
      "😎",
      "😤",
      "🤖",
      "😶‍🌫️",
      "🌏",
      "📸",
      "💿",
      "👋",
      "🌊",
      "✨",
   ];
   return emojiList[Math.floor(Math.random() * emojiList.length)];
}

export function capitalize(str) {
   return str.charAt(0).toUpperCase() + str.slice(1);
}

export function marvelAPI() {
   const url = "https://marvelrivalsapi.com/api/v1/";
   const myHeaders = new Headers();
   myHeaders.append("x-api-key", process.env.MRAPI_KEY);

   const options = {
      headers: myHeaders,
   };
   return [url, options];
}

export async function getMarvelUID(name, marvelAPI) {
   const nameId = await fetch(marvelAPI[0] + "find-player/" + name, marvelAPI[1])
      .then((response) => {
         if (!response.ok) {
            throw new Error("Network response was not ok when getting uid");
         }
         return response.json();
      })
      .then((data) => {
         return data.uid;
      })
      .catch((error) => {
         console.error("Error:", error);
      });
   return await nameId;
}

export async function getMarvelHistory(nameId, marvelAPI) {
   const data = await fetch(
      marvelAPI[0] + "player/" + nameId + "/match-history?skip=0",
      marvelAPI[1]
   )
      .then((response) => {
         if (!response.ok) {
            throw new Error("Network response was not ok when getting match history");
         }
         return response.json();
      })
      .then((data) => {
         data = data.match_history.slice(0, 4);
         return data;
      })
      .catch((error) => {
         console.error("Error:", error);
      });
   let dataReturn = {};
   for (let i = 0; i < data.length; i++) {
      dataReturn["match_ " + i] = {
         mapIMG: data[i].map_thumbnail,
         season: data[i].match_season,
         time: data[i].match_play_duration / 60 + " min",
         isWin: data[i].match_player.is_win.is_win,
         playerStats: {
            hero: data[i].match_player.player_hero.hero_name,
            heroIMG: data[i].match_player.player_hero.hero_type,
            kills: data[i].match_player.player_hero.kills,
            deaths: data[i].match_player.player_hero.deaths,
            assists: data[i].match_player.player_hero.assists,
            damageDealt: data[i].match_player.player_hero.total_hero_damage,
            damageTaken: data[i].match_player.player_hero.total_damage_taken,
            healing: data[i].match_player.player_hero.total_hero_heal,
         },
      };
   }
   console.log(dataReturn);
   return await JSON.stringify(dataReturn, null, 2);
}
