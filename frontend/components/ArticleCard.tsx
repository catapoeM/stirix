import Link from "next/link";

type Props = {
    _id?: string;
    title: string;
    image: string;
    content: string;
}

const ArticleCard = ({ _id, title, image, content }: Props) => {
    return (
        <Link href={`/article/${_id || ""}`}>
            <div style={{marginBottom: "20px", cursor: "pointer"}}>
                <img src={image} alt={title} style={{width: "100%", borderRadius: "8px"}} />

                <h3>{title}</h3>

                <p>{content.slice(0, 80)}...</p>
            </div>
        </Link>
    )
}

export default ArticleCard;