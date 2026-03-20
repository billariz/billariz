/**
 * Copyright (C) 2025 Uppli SAS — Billariz
 *
 * This file is part of Billariz, licensed under the GNU Affero General
 * Public License v3.0 (AGPL-3.0). You may use, modify and distribute
 * this software under the terms of the AGPL-3.0.
 *
 * For commercial use without AGPL obligations, contact:
 * contact@billariz.com | contact@uppli.fr
 * https://billariz.com
 */

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";
import rehypeHighlight from "rehype-highlight";
import MermaidRenderer from "./MermaidRenderer";

const MarkdownRenderer = ({ content }) => (
  <div className="prose prose-invert max-w-none">
    <ReactMarkdown
      remarkPlugins={[remarkSlug, remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          const lang = match && match[1];
          const codeContent = String(children).trim();

          if (lang === "mermaid") {
            return <MermaidRenderer chart={codeContent} />;
          }

          return (
            <pre className={className} {...props}>
              <code>{children}</code>
            </pre>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  </div>
);

export default MarkdownRenderer;