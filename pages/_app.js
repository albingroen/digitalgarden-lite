import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script async src="https://cdn.splitbee.io/sb.js" />
      </Head>

      <div className="antialiased text-gray-900">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
