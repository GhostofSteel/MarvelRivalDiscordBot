const url = "https://marvelrivalsapi.com/";
const myHeaders = new Headers();
myHeaders.append("x-api-key", process.env.MRAPI_KEY);

const options = {
   headers: myHeaders,
};

const data = await fetch(url + "/rivals/maps/map_1161.png", options);
console.log(data);
