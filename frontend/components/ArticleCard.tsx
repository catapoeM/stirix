"use client"
import Link from "next/link";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  Box
} from "@mui/material";

type Props = {
    _id?: string;
    title: string;
    summary: string;
    image: string;
    content: string;
}

const ArticleCard = ({ _id, title, summary, image, content }: Props) => {
    return (
        <Card 
        sx={{ 
            mb: 2, 
            borderRadius: 3 ,
            transition: "0.2s",
            "&:hover": {
                transform: "scale(1.01)"
            }
        }}>
            <CardActionArea component={Link} href={`/article/${_id}`}>
                
                {/* Image */}
                <CardMedia
                    component="img"
                    image="https://www.soccerpunter.com/images/h2h/og/3444/1026.png"
                    alt={title}
                    sx={{
                        height: 210,
                        objectFit: "cover"
                    }}
                />

                {/* Content */}
                <CardContent>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        
                        <Typography variant="h6">
                            {title}
                        </Typography>

                        <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden"
                            }}
                        >
                            {summary}
                        </Typography>

                        <Typography variant="body2">
                            {content.slice(0, 80)}...
                        </Typography>

                    </Box>
                </CardContent>

            </CardActionArea>
        </Card>
    )
}

export default ArticleCard;