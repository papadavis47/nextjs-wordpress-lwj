import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { gql } from "@apollo/client";
import { client } from "../lib/apollo.js";
import styles from "../styles/Home.module.css";

export default function Home({ posts, title, content }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next + Headless Wordpress</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>

        {/* <pre>{JSON.stringify(posts, null, 2)}</pre> */}
        <ul>
          {posts.map(({ title, slug, date }) => {
            return (
              <li key={slug}>
                <Link href={`/blog/${slug}`}>
                  <a>
                    [{date}] {title}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const result = await client.query({
    query: gql`
      query GetWordPressPostsAndHomePage {
        pageBy(uri: "/") {
          title
          content
        }
        posts {
          nodes {
            title
            content
            slug
            date
          }
        }
      }
    `,
  });

  return {
    props: {
      posts: result.data.posts.nodes,
      title: result.data.pageBy.title,
      content: result.data.pageBy.content,
    },
  };
}
