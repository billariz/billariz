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

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkSlug from "remark-slug";
import remarkStringify from "remark-stringify";
import { toc } from "mdast-util-toc";

export default function useMarkdownTOC(content) {
    if (!content) return "";

    const tree = unified()
        .use(remarkParse)
        .use(remarkSlug)
        .parse(content);

    const table = toc(tree, { minDepth: 1, maxDepth: 2 }).map;

    const result = unified()
        .use(remarkStringify)
        .stringify(table);

    return result;
}