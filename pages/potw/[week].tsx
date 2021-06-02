import Head from "next/head";
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

      <div className="px-0 py-12 mx-auto max-w-screen-lg sm:px-8">
        <header className="px-5 sm:px-0">
          <h1 className="text-2xl font-semibold sm:font-medium sm:text-3xl">
            {title}
          </h1>
          <p className="mt-1 text-sm text-gray-500 sm:mt-3 sm:text-base">
            {description}
          </p>
        </header>

        {products.length ? (
          <div className="flex flex-col w-full mt-5 bg-white border rounded-none divide-y sm:rounded-md shadow-sm sm:mt-8">
            {products.map((product, i: number) => (
              <a
                className="flex items-center justify-between px-5 py-3 cursor-pointer sm:p-4 group transition hover:bg-blue-50 focus:outline-none focus:ring-2"
                href={product.link}
                key={product.name}
                target="_blank"
                rel="noopener"
              >
                <div className="flex items-center space-x-3 sm:space-x-5">
                  <img
                    className={`w-8 sm:w-10 ${
                      product.rounded ? "rounded-full" : "rounded sm:rounded-lg"
                    } ${
                      product.bordered ? "border" : ""
                    } object-cover object-center`}
                    alt={`${product.name} logotype`}
                    src={product.logotype}
                  />

                  <div>
                    <h2 className="text-sm font-medium sm:text-base">
                      <span>{i + 1}.</span> <span>{product.name}</span>
                    </h2>
                    <p className="mt-0 text-xs text-gray-500 sm:text-sm sm:mt-px">
                      {product.description}
                    </p>
                  </div>
                </div>

                <span className="text-lg text-blue-500 transition-none group-hover:text-blue-600 sm:text-sm">
                  <span className="hidden sm:inline">Go to product </span>
                  &rarr;
                </span>
              </a>
            ))}
          </div>
        ) : (
          <p className="px-5 py-3 mt-5 text-sm text-gray-400 bg-white border rounded-none sm:p-4 sm:rounded-md shadow-sm sm:mt-8 sm:text-base">
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
