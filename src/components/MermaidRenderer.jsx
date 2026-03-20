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

import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

const MermaidRenderer = ({ chart }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            mermaid.initialize({ startOnLoad: false, theme: "dark" });
            mermaid.render(`mermaid-${Date.now()}`, chart)
                .then(({ svg }) => {
                    containerRef.current.innerHTML = svg;
                })
                .catch((err) => {
                    containerRef.current.innerHTML = `<pre style="color:red;">${err.message}</pre>`;
                });
        }
    }, [chart]);

    return <div ref={containerRef} className="my-4" />;
};

export default MermaidRenderer;