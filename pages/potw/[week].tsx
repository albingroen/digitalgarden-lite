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

      <div className="max-w-screen-lg mx-auto py-12 px-0 sm:px-8">
        <header className="px-5 sm:px-0">
          <h1 className="font-semibold sm:font-medium text-2xl sm:text-3xl">
            {title}
          </h1>
          <p className="text-gray-500 mt-1 sm:mt-3 text-sm sm:text-base">
            {description}
          </p>
        </header>

        {products.length ? (
          <div className="w-full flex flex-col divide-y rounded-none sm:rounded-md border shadow-sm bg-white mt-5 sm:mt-8">
            {products.map((product, i) => (
              <a
                className="py-3 px-5 sm:p-4 flex items-center justify-between cursor-pointer group transition hover:bg-blue-50 focus:outline-none focus:ring-2"
                href={product.link}
                key={product.name}
                target="_blank"
                rel="noopener"
              >
                <div className="flex items-center space-x-3 sm:space-x-5">
                  <img
                    className="w-8 sm:w-10 rounded sm:rounded-md object-cover object-center"
                    alt={`${product.name} logotype`}
                    src={product.logotype}
                  />

                  <div>
                    <h2 className="font-medium text-sm sm:text-base">
                      <span>{i + 1}.</span> <span>{product.name}</span>
                    </h2>
                    <p className="text-xs sm:text-sm mt-0 sm:mt-px text-gray-500">
                      {product.description}
                    </p>
                  </div>
                </div>

                <span className="text-blue-500 transition-none group-hover:text-blue-600 text-lg sm:text-sm">
                  <span className="hidden sm:inline">Go to product </span>
                  &rarr;
                </span>
              </a>
            ))}
          </div>
        ) : (
          <p className="py-3 px-5 sm:p-4 text-gray-400 rounded-none  sm:rounded-md border shadow-sm bg-white mt-5 sm:mt-8 text-sm sm:text-base">
            There are no products listed for this week yet...
          </p>
        )}
      </div>
    </>
  );
}

Potw.getInitialProps = async ({ query: { week } }) => {
  const initialValue = { products: [], image: "" };

  const { products, image } = week
    ? allProducts[week as string] || initialValue
    : initialValue;

  return { week, products, image };
};

export default Potw;
