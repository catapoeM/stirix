"use client";

import ArticleList from "../components/ArticleList";
import CategoryTabs from "../components/CategoryTabs";

const HomePage = () => {
  return (
    <main>
      <CategoryTabs />
      <ArticleList />
    </main>
  );
}

export default HomePage;