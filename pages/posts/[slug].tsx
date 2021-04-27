import matter from "gray-matter";
import hydrate from "next-mdx-remote/hydrate";
import renderToString from "next-mdx-remote/render-to-string";
import Link from "next/link";
import Logo from "../../components/Logo/Logo";
import PostSeo from "../../components/PostSeo/PostSeo";
import { getAllPostSlugs, getPostdata } from "../../lib/posts";

const components = {};

export default function Posts({ source, frontMatter }) {
  const content = hydrate(source, { components });

  return (
    <>
      <PostSeo
        description={frontMatter.excerpt}
        title={frontMatter.title}
        slug={frontMatter.slug}
      />

      <div className="max-w-screen-lg mx-auto py-12 px-8">
        <Logo />

        <Link href="/">
          <span className="mt-12 inline-block text-blue-500 underline cursor-pointer">
            Back to all posts
          </span>
        </Link>

        <article className="prose prose-blue prose-lg mx-auto max-w-screen-lg mt-12">
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
