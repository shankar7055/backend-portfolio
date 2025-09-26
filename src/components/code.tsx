import * as React from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";

interface CodeProps {
  code: string;
  grid?: boolean;
  theme?: any;
  keepBackground?: boolean;
}

export async function Code({ code, grid, theme, keepBackground = false }: CodeProps) {
  const highlightedCode = await highlightCode(code, { grid, theme, keepBackground });
  return (
    <section
      dangerouslySetInnerHTML={{
        __html: highlightedCode,
      }}
    />
  );
}
 
async function highlightCode(code: string, options: Partial<CodeProps> = {}) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      keepBackground: options.keepBackground ?? false,
      grid: options.grid,
      theme: options.theme,
    })
    .use(rehypeStringify)
    .process(code);
 
  return String(file);
}