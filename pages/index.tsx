import Head from "next/head";
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

      <div className="px-8 py-12 mx-auto max-w-screen-lg">
        <div className="flex items-center justify-between">
          <Logo />
          <div className="flex items-center space-x-6">
            <a
              className="text-blue-500 cursor-pointer transition hover:text-blue-600"
              href="https://albingroen.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              About Albin
            </a>
            <a
              className="text-blue-500 cursor-pointer transition hover:text-blue-600"
              href="https://portfolio.albingroen.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              Portfolio
            </a>
          </div>
        </div>

        <h1 className="mt-12 text-5xl font-bold">Blog</h1>

        <h2 className="mt-8 text-lg text-gray-700">{description}</h2>

        <div className="mt-12 grid gap-6 grid-cols-1 lg:grid-cols-2">
          {posts.map((post) => {
            return (
              <a href={`/posts/${post.slug}`} key={post.slug}>
                <div className="p-6 overflow-hidden bg-white border cursor-pointer select-none rounded-md shadow-sm transition hover:bg-gray-100">
                  <span className="text-xl font-semibold">{post.title}</span>
                  <p className="mt-2 text-gray-500">{post.excerpt}</p>
                  <p className="mt-4 text-sm font-semibold tracking-wide text-green-500 uppercase">
                    {post.date}
                  </p>
                </div>
              </a>
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
