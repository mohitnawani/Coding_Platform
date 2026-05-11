const {createClient} = require('redis');

const redis = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
    host: 'redis-12509.c277.us-east-1-3.ec2.cloud.redislabs.com',
        port: 12509
    }
});

module.exports=redis;
