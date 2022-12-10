import { FC } from "react";
import styles from "./HackerNewsList.module.css";

import HackerNewsCard from "../HackerNewsCard";

const HackerNewsList: FC<{ newsIds: number[] }> = ({ newsIds }) => {
  return (
    <section className={styles.container}>
      {newsIds.map((newsId) => (
        <article className={styles.article} key={newsId}>
          <HackerNewsCard newsId={newsId} />
        </article>
      ))}
    </section>
  );
};

export default HackerNewsList;
