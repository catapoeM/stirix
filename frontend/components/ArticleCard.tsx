type Props = {
    title: string;
    image: string;
    content: string;
}

const ArticleCard = ({ title, image, content }: Props) => {
    return (
        <div style={{marginBottom: "20px"}}>
            <img src={image} alt={title} style={{width: "100%"}} />

            <h3>{title}</h3>

            <p>{content.slice(0, 80)}...</p>
        </div>
    )
}

export default ArticleCard;