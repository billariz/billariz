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

import Layout from "@/components/Layout/layout";
import { Container } from "@/components/container";

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { initReactI18next } from "react-i18next";

import { useEffect, useRef } from "react";

const Docu = () => {
const redocRef = useRef(null);

return (
  <Layout>
    <div style={{ padding: "2rem" }}>
      <SwaggerUI
        url="/swagger.json"
        docExpansion="list"                   // 'none', 'list', 'full'
        defaultModelsExpandDepth={1}         // cacher tous les modèles à gauche
        defaultModelExpandDepth={2}           // profondeur des objets
        displayRequestDuration={true}         // durée des requêtes
        persistAuthorization={true}           // mémoriser le token
        deepLinking={true}                    // ancrage vers les sections
        tryItOutEnabled={true}                // bouton Try it out
        syntaxHighlight={{ theme: "monokai" }}// thème de coloration JSON
        layout="BaseLayout"                   // ou 'StandaloneLayout'
      />
    </div>
    </Layout>
);

};
export default Docu;
