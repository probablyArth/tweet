const QUOTES_BASE_API_URL = "https://zenquotes.io/api";

const getDailyQuotes = async (): Promise<{
  quote: string;
  author: string;
}> => {
  return fetch(`${QUOTES_BASE_API_URL}/today`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return {
        quote: data[0].q as string,
        author: data[0].a as string,
      };
    });
};

export default getDailyQuotes;
