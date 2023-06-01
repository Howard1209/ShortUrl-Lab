import express from 'express';
import { readTextFile } from './getkeys.js';
import { createUrl, getUrl } from './model/database.js'
import { client, cacheKey } from './model/redis.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 3000;

app.get('/', (req, res) => res.send('hihi'));


const filename = 'keys.txt'; 
let keys = readTextFile(filename);

app.post('/url', async(req, res) => {
  try {
    const { url } = req.body;
    const key = keys.pop();
    await createUrl(key, url);
    if (keys.length < 200) {
      keys = keys.concat(readTextFile(filename));
    }
    res.send({key,url});
  } catch(error) {
    return res.status(500).send({ error: error.message });
  }
});

app.get('/:key', cacheKey, async(req, res) => {
  try {
    const { key } = req.params;
    const [result] = await getUrl(key);
    if (client.isReady) {
      await client.set(key, JSON.stringify(result.originalurl), 'EX', 3600 * 24 * 30);
    }
    res.redirect(result.originalurl);
  } catch(error) {
    return res.status(500).send({ error: error.message });
  }
})

app.listen(PORT, () => console.log(`Server is running on localhost:${PORT}`));
