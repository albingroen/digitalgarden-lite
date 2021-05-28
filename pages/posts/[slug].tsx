import matter from "gray-matter";
import { useRouter } from "next/router";
import hydrate from "next-mdx-remote/hydrate";
import renderToString from "next-mdx-remote/render-to-string";
import Link from "next/link";
import { useRef } from "react";
import Logo from "../../components/Logo/Logo";
import PostSeo from "../../components/PostSeo/PostSeo";
import { getAllPostSlugs, getPostdata } from "../../lib/posts";

const components = {};

export default function Post({ source, frontMatter }) {
  const { query } = useRouter();

  const content = hydrate(source, { components });

  const articleContent = useRef<HTMLDivElement>(null);

  return (
    <>
      <PostSeo
        description={frontMatter.excerpt}
        slug={query.slug as string}
        image={frontMatter.image}
        title={frontMatter.title}
      />

      <div className="px-8 py-12 mx-auto max-w-screen-lg">
        <Logo />

        <div className="flex items-center justify-between mt-12 ">
          <Link href="/">
            <span className="text-blue-500 cursor-pointer transition hover:text-blue-600">
              Back to all posts
            </span>
          </Link>

          {articleContent.current && (
            <span className="font-mono text-sm font-semibold tracking-wide text-gray-500 uppercase">
              Read time: ~
              {Math.round(
                articleContent.current.textContent.trim().split(" ").length /
                  200
              )}{" "}
              minutes
            </span>
          )}
        </div>

        <article
          ref={articleContent}
          className="mx-auto mt-12 prose prose-blue prose-lg max-w-screen-lg"
        >
          <header>
            <h1>{frontMatter.title}</h1>
            <p>{frontMatter.excerpt}</p>
          </header>

          <hr />

          <div>{content}</div>
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
