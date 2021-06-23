import Head from "next/head";
import { useState } from "react";
import Logo from "../components/Logo/Logo";
import { getSortedPosts } from "../lib/posts";

export default function Home({ posts, description, title }) {
  const [search, setSearch] = useState<string>("");

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
              About the author
            </a>
          </div>
        </div>

        <h1 className="mt-12 text-4xl font-bold sm:mt-24 sm:text-5xl">
          Albin Groen's blog
        </h1>

        <p className="mt-2 text-base text-gray-500 sm:mt-4 sm:text-lg">
          Weekly blog posts about technology, design and business
        </p>

        <input
          className="w-full px-4 py-2 mt-8 bg-transparent border rounded sm:w-auto dark:border-gray-700"
          onChange={(e) => setSearch(e.currentTarget.value)}
          placeholder="Search for a blog post..."
          value={search}
          type="text"
        />

        <div className="mt-8 grid gap-6 grid-cols-1 lg:grid-cols-2">
          {posts
            .sort((a, b) => Number(!!b.image) - Number(!!a.image))
            .filter(
              (post) =>
                !post.draft &&
                JSON.stringify(post)
                  .toLowerCase()
                  .includes(search.toLowerCase())
            )
            .map((post) => {
              return (
                <a href={`/posts/${post.slug}`} key={post.slug}>
                  <div className="p-6 overflow-hidden bg-white border cursor-pointer select-none dark:border-gray-700 dark:bg-gray-800 rounded-md shadow-sm transition hover:bg-gray-100 dark:hover:bg-gray-900">
                    {post.image && (
                      <img
                        className="object-cover object-center w-full h-32 mb-6 rounded sm:h-64"
                        alt={`${post.title} thumbnail`}
                        src={post.image}
                      />
                    )}
                    <h3 className="text-xl font-semibold">{post.title}</h3>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                      {post.excerpt}
                    </p>
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
