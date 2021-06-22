import Highlight, { defaultProps } from "prism-react-renderer";
import Dracula from "prism-react-renderer/themes/palenight";
import { ClipboardIcon, ClipboardCheckIcon } from "@heroicons/react/outline";
import copy from "copy-to-clipboard";
import { useState } from "react";

const CodeBlock = ({ children, className }) => {
  const [copied, setCopied] = useState(false);

  const language = className
    ? className.replace(/language-/, "")
    : "javascript";

  return (
    <div className="border-gray-700">
      <div className="flex items-center justify-between p-4 text-base font-medium leading-none tracking-wide text-gray-400 capitalize bg-gray-700 border border-gray-600 rounded-b-none rounded-md">
        {language}
        <button
          aria-aria-label="Copy code"
          onClick={() => {
            copy(children);
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
            }, 2000);
          }}
          className="cursor-pointer hover:text-gray-300"
        >
          {copied ? (
            <ClipboardCheckIcon className="w-5" />
          ) : (
            <ClipboardIcon className="w-5" />
          )}
        </button>
      </div>

      <Highlight
        {...defaultProps}
        code={children}
        language={language}
        theme={Dracula}
      >
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className="border-gray-600 dark:border-b dark:border-l dark:border-r"
            style={{
              ...style,
              borderTopRightRadius: 0,
              borderTopLeftRadius: 0,
              padding: "20px",
              margin: 0,
            }}
          >
            {tokens
              .filter((_, i) => i !== tokens.length - 1)
              .map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CodeBlock;
