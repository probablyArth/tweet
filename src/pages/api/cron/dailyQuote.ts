import getDailyQuotes from "@/functions/getDailyQuote";
import { NextApiHandler } from "next";
import { TwitterApi } from "twitter-api-v2";

const API_KEY = process.env.API_KEY as string;
const API_KEY_SECRET = process.env.API_KEY_SECRET as string;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN as string;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.query.SECRET_KEY !== process.env.SECRET_KEY) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized",
      });
    }
    const client = new TwitterApi({
      appKey: API_KEY,
      appSecret: API_KEY_SECRET,
      accessToken: ACCESS_TOKEN,
      accessSecret: ACCESS_TOKEN_SECRET,
    });
    console.log({
      API_KEY,
      API_KEY_SECRET,
      ACCESS_TOKEN,
      ACCESS_TOKEN_SECRET,
    });
    console.log("here");
    const quote = await getDailyQuotes();
    console.log("here");
    const tweet = await client.v2.tweet(`"${quote.quote}"\n\n-${quote.author}`);
    console.log("here");
    const message = `Tweeted ${tweet.data.id}: ${tweet.data.text}`;
    console.log(message);
    return res.json({ message });
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ code: 500, message: "Internal server error" });
  }
};

export default handler;
