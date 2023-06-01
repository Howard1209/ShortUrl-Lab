import redis from 'redis';
import dotenv from 'dotenv';

dotenv.config();
export const client = redis.createClient({
  password: process.env.REDIS_PASSWORD,
});

client.connect();

client.on('connect', () => {
  console.log('Redis Client Connected');
});
client.on('error', (err) => console.log('Redis Client Connection Error', err));

export async function cacheKey(req, res, next) {
  // Check if Redis is connected
  if (!client.isReady) {
    return next();
  }
  const { key } = req.params;
  // Check cache first
  const cachePost = await client.get(key);
  console.log(cachePost);
  if (cachePost) {
    res.redirect(JSON.parse(cachePost));
    return;
  }
  return next();
}
