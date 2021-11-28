const redis = require("redis");

const REDIS_PORT =  process.env.PORT || 6379

const  client = redis.createClient(REDIS_PORT)



client.on("error", (err) => {
    console.log("Error " + err);
});
 client.connect().then(()=>console.log("redis is connected..."));

module.exports = client;