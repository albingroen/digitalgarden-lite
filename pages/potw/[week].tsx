import Head from "next/head";
import { useRouter } from "next/router";
import allProducts from "../../potw.json";
import SeoImage from "../../components/SeoImage/SeoImage";

function Potw({ week, image, products }) {
  const description = `Albin's products of the week list #${week}`;
  const title = "Products of the Week";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://blog.albingroen.com/potw/${week}`}
        />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />

        <meta
          property="twitter:url"
          content={`https://blog.albingroen.com/potw/${week}`}
        />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />

        <SeoImage source={image} />
      </Head>

      <div className="bg-gray-50 h-screen overflow-y-auto">
        <div className="max-w-screen-lg mx-auto py-12 px-8">
          <h1 className="font-medium text-3xl">{title}</h1>
          <p className="mt-3 text-gray-500">{description}</p>

          <div className="w-full mt-8 flex flex-col divide-y rounded-md overflow-hidden border shadow-sm bg-white">
            {products.map((product) => (
              <a
                className="p-4 flex items-center justify-between cursor-pointer group transition hover:bg-blue-50"
                href={product.link}
                key={product.name}
                target="_blank"
                rel="noopener"
              >
                <div className="flex items-center space-x-5">
                  <img
                    className="w-10 h-10 rounded object-cover object-center"
                    alt={`${product.name} logotype`}
                    src={product.logotype}
                  />

                  <div>
                    <h2 className="font-medium">{product.name}</h2>
                    <p className="text-sm mt-px text-gray-500">
                      {product.description}
                    </p>
                  </div>
                </div>

                <span className="text-blue-500 transition-none group-hover:text-blue-600">
                  Go to product &rarr;
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

Potw.getInitialProps = async ({ query: { week } }) => {
  const { products, image } = week
    ? allProducts[week as string]
    : { products: [], image: "" };

  return { week, products, image };
};

export default Potw;
