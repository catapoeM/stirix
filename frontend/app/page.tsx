import { fetchArticlesByCategory } from "@/lib/api";
import ArticleList from "@/components/ArticleList";

const HomePage = async () => {
  const articles = await fetchArticlesByCategory("all");

  return (
    <main style={{ padding: "10px" }}>

      <h2>Ultimele știri</h2>

      <ArticleList articles={articles} />
    </main>
  );
}

export default HomePage;