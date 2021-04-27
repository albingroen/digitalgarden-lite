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

      <div className="max-w-screen-lg py-12 px-8 mx-auto">
        <Logo />

        <h1 className="text-5xl font-bold mt-12">Blog</h1>

        <h2 className="text-lg mt-8 text-gray-700">{description}</h2>

        <div className="grid gap-4 mt-12 grid-cols-1 lg:grid-cols-2">
          {posts.map((post) => {
            return (
              <Link
                as={`/posts/${post.slug}`}
                href="/posts/[slug]"
                key={post.slug}
              >
                <div className="p-6 border rounded shadow cursor-pointer select-none transition hover:bg-gray-100">
                  <span className="text-xl font-semibold truncate">{post.title}</span>
                  <p className="text-gray-500 mt-2">{post.excerpt}</p>
                  <p className="uppercase mt-4 text-green-500 font-semibold tracking-wide text-sm">
                    {post.date}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
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
