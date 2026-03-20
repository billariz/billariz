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

import { useEffect, useState, useMemo } from "react";
import Layout from "@/components/Layout/layout";
import GuidePager from "@/components/GuidePager";
import { useRef } from "react";
import { Github, Pencil, MessageSquarePlus } from "lucide-react";
import useLocales from "@/hooks/useLocales";

const GITHUB_DOCS_BASE = "https://github.com/billariz/billariz/edit/main/public/docs";


function slugify(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function splitSections(content, tocDepth) {
  const sections = content
    .split(new RegExp(`^#{1,${tocDepth || 1}}\\s+`, "gm"))
    .filter(Boolean);

  return sections.map((section, index) => {
    const titleMatch = section.match(/^(.+)\n/);
    const title = titleMatch ? titleMatch[1].trim() : `Section ${index + 1}`;
    const body = titleMatch ? section.slice(titleMatch[0].length) : section;
    return { id: index, title, body: `# ${title}\n${body}` };
  });
}

function extractSubHeadings(markdown) {
  const lines = markdown.split('\n');
  const headings = lines.filter(line =>
    line.startsWith('## ') || line.startsWith('### ')
  );

  return headings.map(line => {
    const level = line.startsWith('### ') ? 3 : 2;
    const text = line.replace(/^###? /, '').trim();
    const slug = text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
    return { level, text, slug };
  });
}

export default function GuidePage({ file = "billariz-guide-overview.md", tocDepth }) {
    const { translate } = useLocales();
    const [content, setContent] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const sections = useMemo(() => splitSections(content, tocDepth), [content]);
    
    const sectionsRef = useRef([]);
    sectionsRef.current = sections;

    useEffect(() => {
        fetch(`/docs/${file}`)
            .then((res) => res.text())
            .then((text) => setContent(text));
    }, []);

    useEffect(() => {
      const handleClick = (e) => {
          const anchor = e.target.closest("a[href^='#']");
          if (!anchor) return;
    
          const hash = anchor.getAttribute("href").substring(1);
    
          const matchIndex = sectionsRef.current.findIndex(
            (s) => slugify(s.title) === hash
          );
    
          if (matchIndex !== -1) {
            e.preventDefault();
            setCurrentIndex(matchIndex);
          }
        };
    
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
      }, [setCurrentIndex]);


    function slugify(str) {
        return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
    }
    
    const currentSection = sections[currentIndex];
    const subHeadings = useMemo(
    () => extractSubHeadings(currentSection?.body || ""),
    [currentSection]
    );

    return (
        <Layout>
        <div className="guide-container pt-30">
            {/* Sidebar TOC */}
            <div className="guide-sidebar w-80 pr-4 sticky h-screen overflow-y-auto border-r border-gray-300">
                <div className="sticky top-0">
                    <ul className="space-y-1 text-base">
                        {content
                        .split("\n")
                        .filter(line => {
                            const match = line.match(/^#{1,6}\s+/);
                            if (!match) return false;
                            const level = match[0].trim().length;
                            return level <= (tocDepth || 1);
                        })
                        .map((line, index) => {
                            const level = line.match(/^#+/)?.[0].length || 1;
                            const title = line.replace(/^#{1,6}\s+/, "").trim();
                            const slug = slugify(title);

                            return (
                            <li key={slug}>
                                <button
                                    onClick={() => {
                                    const headings = content.match(new RegExp(`^#{1,${tocDepth || 1}}\\s+.+$`, "gm"));
                                    const matchIndex = headings.findIndex((h) =>
                                        slugify(h.replace(/^#{1,6}\s+/, "").trim()) === slug
                                    );
                                    if (matchIndex !== -1) setCurrentIndex(matchIndex);
                                    }}
                                    className={`text-left w-full break-words whitespace-normal ${level === 1 ? "pl-3" : "pl-8"} py-2 rounded-md transition
                                        text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer
                                        ${currentIndex === index ? "bg-gray-100 dark:bg-gray-800 font-semibold" : ""}
                                    `}
                                    >
                                    {title}
                                </button>
                            </li>
                            );
                        })}
                    </ul>
                </div>
            </div>


            {/* Main Content */}
            <div className="guide-content flex-1">
                <GuidePager section={currentSection} />

                {/* Contribute banner */}
                <div className="mt-10 rounded-2xl border border-gray-700 bg-tertiary px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-primary font-primary">
                      {translate("guide.contribute.title")}
                    </p>
                    <p className="text-xs text-gray-400 mt-1 font-secondary">
                      {translate("guide.contribute.description")}
                    </p>
                  </div>
                  <div className="flex gap-3 shrink-0">
                    <a
                      href={`${GITHUB_DOCS_BASE}/${file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-600 text-sm text-primary hover:border-secondary hover:text-secondary transition font-medium"
                    >
                      <Pencil className="w-4 h-4" />
                      {translate("guide.contribute.edit")}
                    </a>
                    <a
                      href="https://github.com/billariz/billariz/issues/new?labels=documentation"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-tertiary text-sm font-medium hover:opacity-90 transition"
                    >
                      <MessageSquarePlus className="w-4 h-4" />
                      {translate("guide.contribute.suggest")}
                    </a>
                  </div>
                </div>

                   <div className="flex justify-between mt-12 border-t border-gray-700 pt-6">
                {currentIndex > 0  && sections[currentIndex - 1] && (
                    <button
                    onClick={() => setCurrentIndex(currentIndex - 1)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-base text-white rounded-md shadow transition cursor-pointer"
                    >
                    ← <span className="truncate max-w-[200px]">{sections[currentIndex - 1].title}</span>
                    </button>
                )}
                {currentIndex < sections.length - 1 && sections[currentIndex + 1] && (
                    <button
                    onClick={() => setCurrentIndex(currentIndex + 1)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-base text-white rounded-md shadow transition ml-auto cursor-pointer"
                    >
                    <span className="truncate max-w-[200px]">{sections[currentIndex + 1].title}</span> →
                    </button>
                )}
            </div>
            </div>

            {/* Menu de droite */}
            <div className="w-64 pr-4 pl-4 text-sm border-l border-gray-700">
            <div className="sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto">
                <p className="font-semibold text-gray-400 mb-2">Dans cette section</p>
                <ul className="space-y-1">
                 {subHeadings.map((item, i) => (
                    <li key={i} className={`pl-${(item.level - 2) * 4}`}>
                    <a
                        href={`#${item.slug}`}
                        className="text-blue-300 hover:underline cursor-pointer"
                    >
                        {item.text}
                    </a>
                    </li>
                ))}
                </ul>
            </div>
            </div>

         
        </div>
        </Layout>
    );
}