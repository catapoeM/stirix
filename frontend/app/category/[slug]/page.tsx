import { fetchArticlesByCategory } from "@/lib/api";
import ArticleList from "@/components/ArticleList";
import CategoryTabs from "@/components/CategoryTabs";

const CategoryPage = async ({ params }: any) => {
  const { slug } = params;

  const articles = await fetchArticlesByCategory(slug);
console.log(articles, ' articles')
  return (
    <main style={{ padding: "10px" }}>
      <CategoryTabs/>
      
      <h2 style={{ textTransform: "capitalize" }}>{slug}</h2>

      <ArticleList articles={articles}/>
    </main>
  );
}

export default CategoryPage;