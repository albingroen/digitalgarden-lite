import matter from "gray-matter";
import hydrate from "next-mdx-remote/hydrate";
import renderToString from "next-mdx-remote/render-to-string";
import Head from "next/head";
import Link from "next/link";
import Logo from "../../components/Logo/Logo";
import { getAllPostSlugs, getPostdata } from "../../lib/posts";

const components = {};

export default function Posts({ source, frontMatter }) {
  const content = hydrate(source, { components });

  return (
    <div className="post">
      <Head>
        <meta name="Description" content={frontMatter.excerpt}></meta>
        <title>{frontMatter.title}</title>
      </Head>

      <Logo />

      <Link href="/">Back to all posts</Link>

      <header>
        <h1>{frontMatter.title}</h1>
        <p>{frontMatter.excerpt}</p>
      </header>

      <hr />

      <div className="content">{content}</div>
    </div>
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
