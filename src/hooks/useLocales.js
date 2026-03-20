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

import { useTranslation } from "react-i18next";
import LANGUAGES from "../constants/languages";

// ----------------------------------------------------------------------

export default function useLocales() {
  const { i18n, t: translate } = useTranslation();

  const currentLang =
    LANGUAGES?.find((_lang) => _lang.lang === i18n.language) || LANGUAGES[0];

  const handleChangeLanguage = (newLang) => {
    i18n.changeLanguage(newLang);
  };

  return {
    translate,
    currentLang,
    onChangeLang: handleChangeLanguage,
    allLang: LANGUAGES,
  };
}
