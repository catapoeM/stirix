import { fetchArticlesByCategory } from "@/lib/api";
import ArticleList from "@/components/ArticleList";
import CategoryTabs from "@/components/CategoryTabs";

const HomePage = async () => {
  const articles = await fetchArticlesByCategory("all");

  return (
    <main style={{ padding: "10px" }}>
      <CategoryTabs />

      <h2>Latest News</h2>

      <ArticleList articles={articles} />
    </main>
  );
}

export default HomePage;