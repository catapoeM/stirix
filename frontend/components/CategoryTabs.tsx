"use client"

import { useRouter } from "next/navigation";

const CategoryTabs = () => {
  const router = useRouter();

  const categories = [
    {label: "All", slug: "all"}, 
    {label: "International", slug: "international"}, 
    {label: "Superliga", slug: "superliga"}, 
    {label: "Romania", slug: "romania"},
  ];

  return (
    <div style={{ display: "flex", gap: "10px", overflowX: "auto" }}>
      {categories.map((cat) => (
        <button 
        key={cat.slug}
        onClick={() => router.push(`/category/${cat.slug}`)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}

export default CategoryTabs;