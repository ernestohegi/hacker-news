import { FC } from "react";

import HackerNewsCard from "../HackerNewsCard";

const HackerNewsList: FC<{ newsIds: number[] }> = ({ newsIds }) => (
  <section>
    {newsIds.map((newsId) => (
      <HackerNewsCard key={newsId} newsId={newsId} />
    ))}
  </section>
);

export default HackerNewsList;
