const redis = require("redis");

const HOST = process.env.REDIS_HOST;
const PORT = process.env.REDIS_PORT;
const PASSWORD = process.env.REDIS_PASSWORD;
const USER = process.env.REDIS_USER;

const client = redis.createClient({
    url: `redis://${USER}:${PASSWORD}@${HOST}:${PORT}` 
});

client.on('error', err => console.log(err));

module.exports = client;