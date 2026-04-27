import { fetchArticlesByCategory } from "../../../lib/api";
import ArticleList from "@/components/ArticleList";
import { notFound } from "next/navigation";

const CategoryPage = async({ params }: any) => {
  // Await params 
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  if (!slug) {
    return <p>Category not found</p>;
  }
  
  const articles = await fetchArticlesByCategory(slug);
  
  if (!articles || articles.length === 0) {
    return notFound(); // show 404 page
  }
  
    return (
    <main>

      <h2 style={{ textTransform: "capitalize" }}>{slug}</h2>

      <ArticleList articles={articles} />
    </main>
  );
}

export default CategoryPage