import Head from "next/head";
import Link from "next/link";
import Logo from "../components/Logo/Logo";
import { getSortedPosts } from "../lib/posts";

export default function Home({ posts, description, title }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="Description" content={description}></meta>
        <title>{title}</title>
        <meta charSet="utf-8" />
      </Head>

      <Logo />

      <h1>{title}</h1>

      <p>{description}</p>

      <hr />

      {posts.map((post) => (
        <Link as={`/posts/${post.slug}`} href="/posts/[slug]" key={post.slug}>
          <div className="list-post">
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
          </div>
        </Link>
      ))}
    </>
  );
}

export async function getStaticProps() {
  const siteData = await import(`../config.json`);

  return {
    props: {
      title: siteData.default.title,
      description: siteData.default.description,
      posts: getSortedPosts(),
    },
  };
}
