"use client"
import ArticleCard from "./ArticleCard";

type Article = {
  _id: string;
  title: string;
  content: string;
  summary: string;
  image: string;
};

const ArticleList = ({articles}: {articles: Article[]}) => {
  if (!articles || articles.length === 0) {
    return <p>No articles found.</p>
  }
  return (
    <div>
      {articles.map((article) => (
        <ArticleCard key={article._id} {...article} />
      ))}
    </div>
  );
}

export default ArticleList;