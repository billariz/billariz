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

import React, { useState } from "react";
import LANGUAGES from "../constants/languages";
import useLocales from "../hooks/useLocales";

//Icons
import { ChevronDown, ChevronUp } from "lucide-react";

function Languages() {
  const { currentLang, allLang, onChangeLang } = useLocales();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = LANGUAGES.find(
    (lang) => lang.lang === currentLang?.lang,
  );

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const selectLanguage = (lang) => {
    onChangeLang(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="font-primary flex items-center gap-2 rounded-full px-3 py-2 sm:px-4 sm:py-2.5 lg:px-6 lg:py-3.5 border-2 border-primary text-xs sm:text-sm lg:text-lg text-primary font-medium leading-6"
      >
        {currentLanguage && (
          <>
            <img
              src={currentLanguage.flag}
              alt={`${currentLanguage.lang} flag`}
              className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
            />
            <span className="uppercase">{currentLanguage.lang}</span>
            <ChevronDown
              className={`w-3 h-3 sm:w-4 sm:h-4 transform transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 min-w-[100px] bg-tertiary sm:min-w-[120px] rounded-2xl shadow-md z-10">
          {allLang.map((lang) => (
            <div
              key={lang.lang}
              onClick={() => selectLanguage(lang.lang)}
              className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <img
                src={lang.flag}
                alt={`${lang.lang} flag`}
                className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
              />
              <span className="text-primary text-sm sm:text-base">
                {lang.lang}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Languages;
