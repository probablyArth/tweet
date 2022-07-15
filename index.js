require("dotenv").config();
const twt = require("twitter-api-v2");
const axios = require("axios");
const CronJob = require("cron").CronJob;

const QUOTES_BASE_API_URL = "https://zenquotes.io/api";
const API_KEY = process.env.API_KEY;
const API_KEY_SECRET = process.env.API_KEY_SECRET;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const JOB_TIME = process.env.JOB_TIME;

const getQuote = async () => {
  const data = await (await axios.get(`${QUOTES_BASE_API_URL}/today`)).data[0];
  return { quote: data.q, author: data.a };
};

const tweet = async (status) => {
  const client = new twt.TwitterApi({
    appKey: API_KEY,
    appSecret: API_KEY_SECRET,
    accessToken: ACCESS_TOKEN,
    accessSecret: ACCESS_TOKEN_SECRET,
  });
  return await client.v2.tweet(status);
};

const job = new CronJob(
  JOB_TIME,
  async () => {
    const quote = await getQuote();
    await tweet(
      `"${quote.quote}" \n\n ${quote.author} \n\n Follow for daily quotes!`
    );
  },
  null,
  true,
  "Asia/Kolkata"
);

job.start();
