const CategoryTabs = () => {
  const categories = ["All", "International", "Superliga", "Romania"];

  return (
    <div style={{ display: "flex", gap: "10px", overflowX: "auto" }}>
      {categories.map((cat) => (
        <button key={cat}>{cat}</button>
      ))}
    </div>
  );
}

export default CategoryTabs;