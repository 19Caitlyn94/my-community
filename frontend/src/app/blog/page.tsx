import React from "react";
import { ResponsiveCard } from "@/app/_components";

import { blogData } from "@/data/data";

type Props = {};

const Blog = (props: Props) => {
  if (!blogData) {
    return <div>No blog data found</div>;
  }

  return (
    <div>
      <h1 className="text-2xl mb-6">Blog</h1>
      {blogData.map((b) => (
        <div key={`blog-card-${b.slug}`} className="mb-6">
          <ResponsiveCard
            title={b.title}
            description={b.description}
            btnName={b.btnName}
            image={b.image}
            to={`/blog/${b.slug}`}
          />
        </div>
      ))}
    </div>
  );
};

export default Blog;
