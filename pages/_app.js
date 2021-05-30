import "../styles/globals.css";
import Head from "next/head";
import { MDXProvider } from "@mdx-js/react";
import CodeBlock from "../components/CodeBlock/CodeBlock";

const components = {
  pre: (props) => <div {...props} />,
  code: CodeBlock,
};

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script async src="https://cdn.splitbee.io/sb.js" />
      </Head>

      <div className="antialiased text-gray-900">
        <MDXProvider components={components}>
          <Component {...pageProps} />
        </MDXProvider>
      </div>
    </>
  );
}

export default MyApp;
