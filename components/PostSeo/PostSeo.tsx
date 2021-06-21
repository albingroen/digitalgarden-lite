import Head from "next/head";
import SeoImage from "../SeoImage/SeoImage";

interface IPostSeoProps {
  description: string;
  keywords: string[];
  image?: string;
  title: string;
  slug: string;
}

export default function PostSeo({
  description,
  keywords,
  title,
  image,
  slug,
}: IPostSeoProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      <meta name="keywords" content={keywords.join(", ")} />
      <meta name="author" content="Albin Groen" />

      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`https://blog.albingroen.com/posts/${slug}`}
      />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      <meta
        property="twitter:url"
        content={`https://blog.albingroen.com/posts/${slug}`}
      />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />

      <SeoImage source={image} title={title} />
    </Head>
  );
}
