import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { parseExpression } from "cron-parser";
import { useEffect, useState } from "react";
import { timeInHoursMinutesSeconds } from "../utils";

export default function Home() {
  const [time, setTime] = useState(0);
  const [formattedTime, setFormattedTime] = useState(
    timeInHoursMinutesSeconds(time)
  );
  useEffect(() => {
    const jobTime = parseExpression(
      process.env.NEXT_PUBLIC_JOB_TIME as string,
      { utc: true }
    );
    setTime(jobTime.next().toDate().getTime());
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    setFormattedTime(timeInHoursMinutesSeconds(time));
  }, [time]);

  return (
    <>
      <Head>
        <title>Tweet Stuff</title>
        <meta name="description" content="This tweets some stuff for me" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Time Until Next Tweet
            <br />
            <code
              className={styles.code}
            >{`${formattedTime.hours} hours  ${formattedTime.minutes} minutes  ${formattedTime.seconds}  seconds`}</code>
          </p>
        </div>
        <div className={styles.description}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hosted On{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </main>
    </>
  );
}
