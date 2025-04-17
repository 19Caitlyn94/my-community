import React from "react";
import Image from "next/image";
import { blogData } from "@/data/data";

type Props = { params: Promise<{ slug: string }> };

const Blogpost = async ({ params }: Props) => {
  const slug = (await params).slug;
  const blogpost = blogData.find((p) => p.slug === slug);

  if (!blogpost) {
    return <div>Blogpost not found</div>;
  }

  return (
    <div>
      <h1 className="text-3xl mb-10">{blogpost.title}</h1>
      <Image
        width="550"
        height="550"
        className="mb-10 w-full"
        alt={blogpost.title}
        src={blogpost.image}
      />
      <div
        className="text-lg"
        dangerouslySetInnerHTML={{ __html: blogpost.html }}
      ></div>
    </div>
  );
};

export default Blogpost;
