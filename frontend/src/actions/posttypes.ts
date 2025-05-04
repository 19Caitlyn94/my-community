import { BACKEND_URL } from "@/app/_utils/config";
import { type PostType } from "@/types/posttypes";
import { cache } from "react";

export const fetchPostTypes = cache(async () => {
  try {
    const response = await fetch(`${BACKEND_URL}api/posttypes`, {
      method: "GET",
      cache: "force-cache",
      next: {
        revalidate: 86400 // Cache for 24 hours (1 day)
      }
    });

    const res = await response.json();

    if (!response.ok) {
      return { error: res };
    }

    return { error: null, data: res.results };
  } catch (error) {
    console.error("Error fetching posttypes:", error);
    return { error };
  }
});

export const getPostTypesOptions = async () => {
  const { data, error } = await fetchPostTypes();
  if (error) {
    return { error };
  }
  return {
    error: null,
    data: data.map((postType: PostType) => ({
      label: postType.name,
      value: postType.slug
    }))
  };
};

export const getPostTypeBySlug = async (slug: string) => {
  try {
    const { data, error } = await fetchPostTypes();

    if (error) {
      return { error };
    }

    const postType = data.find((p: PostType) => p.slug === slug);

    if (!postType) {
      return {
        error: `Post type with slug '${slug}' not found`,
        data: null
      };
    }

    return {
      error: null,
      data: {
        name: postType.name,
        color: postType.color
      }
    };

  } catch (error) {
    console.error("Error getting post type:", error);
    return { error };
  }
};
