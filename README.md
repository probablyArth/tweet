# Tweet

Automations for twitter (WIP)

### Cron Jobs

```sh
/api/cron/dailyQuotes #tweet a quote from https://zenquotes.io/api/today
```

### Env Variables

```sh
API_KEY=twitter_api_key
API_KEY_SECRET=twitter_api_key_secret
ACCESS_TOKEN=twitter_access_token
ACCESS_TOKEN_SECRET=twitter_access_token_secret
SECRET_KEY=verySecretIndeed
NEXT_PUBLIC_JOB_TIME="30 14 * * *" # run 14:30 UTC every day of every week of every month
```

you can use [cronTab](https://crontab.guru/) to learn more about cron expressions

### Deployment

The Cron Jobs totally depends on [Vercel]("https://vercel.com/"), currently testing it so its a WIP
