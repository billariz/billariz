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

const NAVIGATION = [
  { name: "navigation.home", href: "/" },
  { name: "navigation.documentation",
      children: [
      { name: "navigation.documentations.swagger-ui", href: "/documentation/swagger-ui", picto: "braces" },
      { name: "navigation.documentations.download", href: "", file:"/swagger.json", picto: "filejson"},
      { name: "navigation.documentations.auth", href: "/documentation/auth", picto: "login"},
      ],
  },
  {
    name: "navigation.guides",
    children: [
      { name: "navigation.guide.overview", href: "/guide/overview", picto: "summarize" },
      { name: "navigation.guide.model", href: "/guide/model", picto: "lan"},
      { name: "navigation.guide.orchestration", href: "/guide/orchestration", picto: "sync"},
    ],
  },
  { name: "navigation.pricing", href: "/Pricing" },
];

export default NAVIGATION;
