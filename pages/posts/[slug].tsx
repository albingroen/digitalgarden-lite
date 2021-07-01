import matter from "gray-matter";
import { useRouter } from "next/router";
import hydrate from "next-mdx-remote/hydrate";
import renderToString from "next-mdx-remote/render-to-string";
import { useEffect, useRef } from "react";
import Logo from "../../components/Logo/Logo";
import PostSeo from "../../components/PostSeo/PostSeo";
import { getAllPostSlugs, getPostdata } from "../../lib/posts";
import authors from "../../lib/authors";

const components = {};

export default function Post({ source, frontMatter }) {
  const { query, push } = useRouter();

  const content = hydrate(source, { components });

  const articleContent = useRef<HTMLDivElement>(null);

  const author = frontMatter.author && authors[frontMatter.author];

  useEffect(() => {
    if (frontMatter.draft) {
      push("/");
    }
  }, []);

  if (frontMatter.draft) {
    return null;
  }

  return (
    <>
      <PostSeo
        description={frontMatter.excerpt}
        keywords={frontMatter.tags}
        slug={query.slug as string}
        image={frontMatter.image}
        title={frontMatter.title}
      />

      <div className="px-8 py-12 mx-auto max-w-screen-lg">
        <div className="flex items-center justify-between">
          <Logo />

          <a href="/">
            <span className="text-blue-500 cursor-pointer transition hover:text-blue-600">
              Back to all posts
            </span>
          </a>
        </div>

        <article className="mt-12 sm:mt-24">
          <header>
            <h1 className="text-4xl font-bold leading-snug sm:text-5xl">
              {frontMatter.title}
            </h1>
            <p className="mt-6 text-lg font-medium text-gray-400 sm:text-xl">
              {frontMatter.excerpt}
            </p>

            <div className="flex flex-col items-start justify-between mt-8 sm:items-center sm:mt-6 space-y-8 sm:space-y-0 sm:flex-row">
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  {articleContent.current && (
                    <span className="font-mono text-sm font-semibold tracking-wide text-gray-400 uppercase dark:text-gray-500">
                      Read time: ~
                      {Math.round(
                        articleContent.current.textContent.trim().split(" ")
                          .length / 200
                      )}{" "}
                      minutes
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center mt-2 gap-1.5 sm:gap-2">
                  {frontMatter.tags.map((tag) => (
                    <span
                      className="inline-block py-1 px-1 sm:py-1 sm:px-1.5 sm:py-px text-xs sm:text-sm leading-none text-blue-500 bg-blue-50 border border-blue-300 rounded-sm shadow-sm"
                      key={tag}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-5">
                <img
                  className="object-cover object-center w-12 rounded-full"
                  alt={`Author avatar`}
                  src={author.avatar}
                />
                <div>
                  <h5 className="font-mono text-lg font-medium">
                    {author.name}
                  </h5>
                  <p className="text-gray-500">Posted {frontMatter.date}</p>
                </div>
              </div>
            </div>
          </header>

          <hr className="my-10 opacity-75 dark:opacity-10" />

          <div
            ref={articleContent}
            className="mx-auto prose prose-blue prose-lg max-w-screen-lg dark:prose-light"
          >
            <div>{content}</div>
          </div>
        </article>
      </div>
    </>
  );
}

export const getStaticProps = async ({ params }) => {
  const source = await getPostdata(params.slug);
  const { content, data } = matter(source);

  const mdxSource = await renderToString(content, {
    components,
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = getAllPostSlugs();

  return {
    paths,
    fallback: false,
  };
};
