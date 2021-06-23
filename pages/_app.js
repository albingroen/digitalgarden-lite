import "../styles/globals.css";
import Head from "next/head";
import { MDXProvider } from "@mdx-js/react";
import CodeBlock from "../components/CodeBlock/CodeBlock";
import ImageZoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const components = {
  pre: (props) => <div {...props} />,
  code: CodeBlock,
  img: (props) => (
    <ImageZoom>
      <img {...props} style={{ margin: 0 }} />
    </ImageZoom>
  ),
};

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script async src="https://cdn.splitbee.io/sb.js" />
      </Head>

      <MDXProvider components={components}>
        <Component {...pageProps} />
      </MDXProvider>
    </>
  );
}

export default MyApp;
