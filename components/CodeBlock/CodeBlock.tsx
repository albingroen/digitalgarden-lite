import Highlight, { defaultProps } from "prism-react-renderer";
import Dracula from "prism-react-renderer/themes/palenight";

const CodeBlock = ({ children, className }) => {
  const language = className
    ? className.replace(/language-/, "")
    : "javascript";

  return (
    <div className="border-gray-700">
      <div className="p-4 text-base font-medium leading-none tracking-wide text-gray-400 capitalize bg-gray-700 border border-gray-600 rounded-b-none rounded-md">
        {language}
      </div>

      <Highlight
        {...defaultProps}
        code={children}
        language={language}
        theme={Dracula}
      >
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className="border-b border-l border-r border-gray-600"
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
