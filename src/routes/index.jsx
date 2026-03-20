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

import Pricing from "@/pages/Pricing";
import Docu from "@/pages/Docu";
import Home from "@/pages/Home";
import LegalMentions from "@/pages/LegalMentions";
import { Navigate, useRoutes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import GuidePage from "../pages/Guide";

export default function Router() {
  
  const location = useLocation();

  // Injection script HubSpot au montage
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://js.hs-scripts.com/${import.meta.env.VITE_HUBSPOT_ID}.js`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (script && document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Tracking SPA HubSpot sur chaque navigation
  useEffect(() => {
    if (window._hsq) {
      window._hsq.push(["setPath", location.pathname + location.search]);
      window._hsq.push(["trackPageView"]);
    }
  }, [location]);

  return useRoutes([
    {
      path: "/",
      children: [
        {
          index: true,
          element: <Home />,
        },
        { path: "pricing", element: <Pricing /> },
        { path: "documentation/swagger-ui", element: <Docu /> },
        { path: "documentation/auth", element: <GuidePage file = "billariz-api-auth.md" tocDepth={1} /> },
        { path: "guide/overview", element: <GuidePage file = "billariz-guide-overview.md" tocDepth={1} /> },
        { path: "guide/model", element: <GuidePage file = "billariz-guide-model.md" tocDepth={2}/> },
        { path: "guide/orchestration", element: <GuidePage file = "billariz-guide-orchestration.md" tocDepth={1}/> },
        { path: "legal", element: <LegalMentions /> },
        { path: "404", element: <div>Page Not Found</div> }, // Add 404 route
        { path: "*", element: <Navigate to="404" replace /> }, // Don't use leading slash here
      ],
    },
  ]);
}
