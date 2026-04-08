import { fetchArticlesByCategory } from "../../../lib/api";
import ArticleList from "@/components/ArticleList";
import CategoryTabs from "@/components/CategoryTabs";
import { notFound } from "next/navigation";

const CategoryPage = async({ params }: any) => {
  // Await params 
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  console.log("PARAMS:", params);
  console.log("SLUG:", slug);

  
  if (!slug) {
    return <p>Category not found</p>;
  }
  
  const articles = await fetchArticlesByCategory(slug);
  
  if (!articles || articles.length === 0) {
    return notFound(); // show 404 page
  }
  
    return (
    <main style={{ padding: "10px" }}>
      <CategoryTabs />

      <h2 style={{ textTransform: "capitalize" }}>{slug}</h2>

      <ArticleList articles={articles} />
    </main>
  );
}

export default CategoryPage