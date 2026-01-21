const {createClient} = require('redis');

const redis = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-15817.c99.us-east-1-4.ec2.cloud.redislabs.com',
        port: 15817
    }
});

module.exports=redis;
