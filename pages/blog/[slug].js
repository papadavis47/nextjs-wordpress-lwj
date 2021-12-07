import { gql } from "@apollo/client";
import { client } from "../../lib/apollo.js";
import Link from "next/link";

export default function BlogPage({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
      <Link href='/'>
        <a>&larr; Back to Home</a>
      </Link>
    </div>
  );
}

export async function getStaticPaths() {
  const result = await client.query({
    query: gql`
      query GetWordPressPosts {
        posts {
          nodes {
            slug
          }
        }
      }
    `,
  });

  return {
    paths: result.data.posts.nodes.map(({ slug }) => {
      return {
        params: { slug },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const result = await client.query({
    query: gql`
      query GetWordPressPostBySlug($slug: String!) {
        postBy(slug: $slug) {
          title
          content
        }
      }
    `,
    variables: { slug },
  });

  return {
    props: {
      post: result.data.postBy,
    },
  };
}
