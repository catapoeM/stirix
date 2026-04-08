import { fetchArticleById } from "@/lib/api";
import { notFound } from "next/navigation";

const ArticlePage = async ( { params }: any) => {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    const article = await fetchArticleById(id);

    if (!article) {
        return notFound(); // 404 page return if not found
    }

    return (
        <main 
            style={{ padding: "10px" }}
        >
            <h1>{article.title}</h1>
            <p><strong>Author:</strong> {article.author.username}</p>
            <p>Pe scurt: *{article.summary}*</p>
            <p>{article.content}</p>
            {article.image && <img src={article.image} alt={article.title}/>}
        </main>
    )
}

export default ArticlePage;