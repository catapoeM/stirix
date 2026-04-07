import ArticleCard from "./ArticleCard";

const dummyData = [
  {
    title: "Romania wins important match",
    image: "https://via.placeholder.com/400",
    content: "Romania had a great performance...",
  },
  {
    title: "Superliga latest updates",
    image: "https://via.placeholder.com/400",
    content: "Latest news from Superliga...",
  },
];

const ArticleList = () => {
  return (
    <div>
      {dummyData.map((article, index) => (
        <ArticleCard key={index} {...article} />
      ))}
    </div>
  );
}

export default ArticleList;