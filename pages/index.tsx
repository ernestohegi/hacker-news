import { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import HackerNewsList from "../components/HackerNewsList";
import LoadingSpinner from "../components/LoadingSpinner";

const OFFSET = 3;

type HomeProps = {
  data: HackerNewsSet;
};

type HackerNewsSet = number[];

const fetchNews = async (offset: number) => {
  const res = await fetch(
    `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty&limitToFirst=${offset}&orderBy="$key"`
  );

  const data = await res.json();

  return data;
};

export default function Home({ data = [] }: HomeProps) {
  const [newsIds, setNewsIds] = useState(data);
  const [offset, setOffset] = useState(OFFSET);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = async () => {
    const newOffset = offset + OFFSET;

    setIsLoading(true);

    const data = await fetchNews(newOffset);

    setOffset(newOffset);

    setIsLoading(false);

    setNewsIds([
      ...newsIds,
      ...data.filter((newsId: number) => !newsIds.includes(newsId)),
    ]);
  };

  return (
    <main className={styles.main}>
      <Head>
        <title>Hacker News</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.title}> HackerNews List </h1>

      <HackerNewsList newsIds={newsIds} />

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <button className={styles.button} onClick={handleLoadMore}>
          Load more
        </button>
      )}
    </main>
  );
}

export async function getServerSideProps() {
  const data = await fetchNews(OFFSET);

  return { props: { data } };
}
