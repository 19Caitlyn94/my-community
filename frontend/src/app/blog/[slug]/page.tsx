import React from "react";

import { blogData } from "@/data/data";

type Props = { params: Promise<{ slug: string }> };

const Blogpost = async ({ params }: Props) => {
  const slug = (await params).slug;
  const blogpost = blogData.find((p) => p.slug === slug);
  return (
    <div>
      <h1 className="text-3xl mb-10">{blogpost.title}</h1>
      <img className="mb-10" src={"https://placehold.co/900x600"} />
      {/* TODO Sanitize this html */}
      <div
        className="text-lg"
        dangerouslySetInnerHTML={{ __html: blogpost.html }}
      ></div>
    </div>
  );
};

export default Blogpost;
