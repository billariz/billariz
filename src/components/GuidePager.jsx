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
import MermaidRenderer from "@/components/MermaidRenderer"; // adapte si nécessaire
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const GuidePager = ({ section }) => {

  return (
    <div className="flex gap-8 pr-10 min-h-[200vh]">
      <div className="prose prose-invert max-w-none px-4">
        {section ? (
          <div className="markdown-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkSlug]}
          rehypePlugins={[rehypeHighlight]}
          components={{
              code({ node, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                const lang = match && match[1];
                const codeContent = String(children).trim();

                if (lang === "mermaid") {
                  return <MermaidRenderer chart={codeContent} />;
                }

                if (!codeContent.includes('\n') && codeContent.length < 100) {
                  return (
                    <span className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-2 py-0.5 rounded-full text-sm font-medium">
                      {codeContent}
                    </span>
                  );
                }

                return (
                  <SyntaxHighlighter
                    language={lang}
                    style={oneDark}
                    PreTag="div"
                    customStyle={{ borderRadius: '0.5rem', padding: '1rem', fontSize: '0.85rem' }}
                    wrapLongLines
                  >
                    {codeContent}
                  </SyntaxHighlighter>
                );
              },
              table: ({ children }) => (
                <div className="overflow-x-auto">
                  <table className="table-auto border border-gray-300 dark:border-gray-600 w-full text-sm">
                    {children}
                  </table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
                  {children}
                </thead>
              ),
              th: ({ children }) => (
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left font-semibold">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  {children}
                </td>
              ),
              h1: ({ node, ...props }) => (
                <h1 className="text-4xl font-bold leading-tight tracking-tight mb-6 text-gray-100" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-2xl font-semibold mt-5 mb-3 text-gray-100" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-200" {...props} />
              ),
              h4: ({ node, ...props }) => (
                <h4 className="text-lg font-semibold mt-3 mb-1 text-gray-200" {...props} />
              ),
            }}
        >
          {section.body}
        </ReactMarkdown>
          </div>
        ) : (
          <p className="text-red-500">Aucune section à afficher.</p>
        )}
       
      </div>
    </div>
  );
};

export default GuidePager;
