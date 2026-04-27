import { fetchArticleById } from "@/lib/api";
import { notFound } from "next/navigation";
import {Box, Typography, Container} from "@mui/material";
import { formatDateCustom } from "@/helpers";

const ArticlePage = async ( { params }: any) => {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    const articleData = await fetchArticleById(id);
    const newDateFormat = formatDateCustom(articleData.article.createdAt, 'yyyy-MM-dd', 'HH:mm')
    if (!articleData.article) {
        return notFound(); // 404 page return if not found
    }
    const paragraphs = articleData.article.content.split("\n");
    const articleCategoryUpperCase = articleData.article.category.toUpperCase()

    return (
        <Container sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
                {/* Category */}
                {articleData.article.category && (
                <Typography
                    variant="caption"
                    sx={{
                        backgroundColor: "primary.main",
                        color: "white",
                        px: 1,
                        py: 0.5,
                        borderRadius: 1
                    }}
                >
                    {articleCategoryUpperCase}
                </Typography>
                )}

                {/* Title */}
                <Typography variant="h4" gutterBottom>
                    {articleData.article.title}
                </Typography>

                {/* Meta */}
                <Typography variant="body2" color="text.secondary">
                    By {articleData.authorName} • {newDateFormat.date} {newDateFormat.time}
                </Typography>

                {/* Image */}
                
                <Box
                    component="img"
                    src="https://www.soccerpunter.com/images/h2h/og/3444/1026.png"
                    alt="test img"
                    sx={{
                        width: "90%",
                        borderRadius: 2,
                        my: 2
                    }}
                />
                

                {/* Content */}
                {paragraphs.map((p: any, i: any) => (
                <Typography
                    key={i}
                    sx={{
                        lineHeight: 1.8,
                        fontSize: "1.1rem"
                    }}
                >
                    {p}
                </Typography>
                ))}
        </Container>
    )
}

export default ArticlePage;