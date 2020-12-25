import Head from "next/head";
import SeoImage from "../SeoImage/SeoImage";

interface IPostSeoProps {
  description: string
  title: string
  slug: string
}

export default function PostSeo({ title, description, slug }: IPostSeoProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://blog.albingroen.com/posts/${slug}`} />
      <meta property="og:title" content="{title}" />
      <meta property="og:description" content={description} />

      <meta property="twitter:url" content={`https://blog.albingroen.com/posts/${slug}`} />
      <meta property="twitter:title" content="{title}" />
      <meta property="twitter:description" content={description} />

      <SeoImage title={title} />
    </Head>
  )
}