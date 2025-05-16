import { type SanityDocument } from "next-sanity";
import { client } from "@/utils/sanity/client"

const getPageData = async (query : string) => {
    const POSTS_QUERY = query;
    const query_options = { next: { revalidate: 30 } };;
    try {
        const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, query_options);
        return posts;
    } catch {
        return false;
    }
}

export { getPageData };