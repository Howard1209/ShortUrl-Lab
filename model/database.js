import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

export const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWWOD,
  database: process.env.MYSQL_DATABASE,
}).promise();

export async function createUrl(key, url){
  await pool.query(`
  INSERT INTO urls (shorturl, originalurl)
  VALUES (?,?)
  `,[key, url]);
}

export async function getUrl(key){
  const [result] = await pool.query(`
  SELECT originalurl FROM urls WHERE shorturl = ?
  `,[key]);
  return result;
}
