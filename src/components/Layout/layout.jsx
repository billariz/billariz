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

import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ disableFooter = false, children }) {
  return (
    <div className="bg-tertiary relative">
      <Header />
      {children}
      {!disableFooter && <Footer />}
    </div>
  );
}

export default Layout;
