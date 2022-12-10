import { FC } from "react";
import useSWR from "swr";
import styles from "./HackerNewsCard.module.css";

import { HackerNewsCardProps } from "./HackerNewsCard.types";

const HackerNewsCard: FC<HackerNewsCardProps> = ({ newsId }) => {
  const { data, error, isLoading } = useSWR(
    `https://hacker-news.firebaseio.com/v0/item/${newsId}.json?print=pretty`,
    async (url) => {
      const res = await fetch(url);

      const data = await res.json();

      return data;
    }
  );

  if (error) return <div> Failed to load </div>;

  if (isLoading) return <div> Loading... </div>;

  const { title, url, by } = data || {};

  return (
    title &&
    url &&
    by && (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className={styles.hackerNewsCard}
      >
        <p>{title}</p>
        <p>by {by}</p>
      </a>
    )
  );
};

export default HackerNewsCard;
