import { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import HackerNewsList from "../components/HackerNewsList";

const LIMIT_PER_PAGE = 100;

type HomeProps = {
  data: HackerNewsSet;
};

type HackerNewsSet = number[];

export default function Home({ data }: HomeProps) {
  const [newsIds, setNewsIds] = useState(data);

  const handleLoadMore = () => console.log("click");

  return (
    <main className={styles.main}>
      <Head>
        <title>Hacker News</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className={styles.container}>
        <h1 className={styles.title}> HackerNews List </h1>

        <HackerNewsList newsIds={newsIds} />

        <button className={styles.button} onClick={handleLoadMore}>
          {" "}
          Load more...{" "}
        </button>
      </section>
    </main>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(
    `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty&limitToFirst=${LIMIT_PER_PAGE}&orderBy="$key"`
  );
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
