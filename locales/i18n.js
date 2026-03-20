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

const i18next = require('i18next');
const Backend = require('i18next-fs-backend');

i18next.use(Backend).init({
  lng: 'fr',
  fallbackLng: 'en',
  debug: false,
  backend: {
    loadPath: './locales/{{lng}}.json',
  },
  ns: ['translations'],
  defaultNS: 'translations',
  interpolation: {
    escapeValue: false,
  },
});

module.exports = i18next;
