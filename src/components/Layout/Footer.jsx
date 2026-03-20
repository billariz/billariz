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

import NAVIGATION from "@/constants/navigation";
import LEGAL from "@/constants/legal";
import useLocales from "@/hooks/useLocales";
import { Github } from "lucide-react";

export default function Footer() {
  const { translate } = useLocales();
  return (
    <footer className="relative">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-8 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="flex flex-col gap-4">
            <img src="/images/Logo.svg" className="w-56 lg:w-72" />
            <a
              href="https://github.com/billariz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-primary dark:text-[#e6f0ff] hover:border-secondary hover:text-secondary transition text-sm font-medium"
            >
              <Github className="w-4 h-4" />
              github.com/billariz
            </a>
          </div>
          <div>
            <div className="md:col-span-1">
              <h3 className="text-2xl lg:text-3xl font-medium text-primary font-primary">
                {translate("navigation.navigation")}
              </h3>
              <ul role="list" className="mt-3.5 lg:mt-6 space-y-4">
                {NAVIGATION.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-lg lg:text-xl text-primary font-primary hover:text-secondary"
                    >
                      {translate(item.name)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <div className="md:col-span-1">
              <h3 className="text-2xl lg:text-3xl font-medium text-primary font-primary">
                {translate("navigation.legal")}
              </h3>
              <ul role="list" className="mt-3.5 lg:mt-6 space-y-4">
                {LEGAL.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-lg lg:text-xl text-primary font-primary hover:text-secondary"
                    >
                      {translate(item.name)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        </div>
        <img src="/images/hero.svg" alt="Hero Illustration" className="absolute bottom-15 left-5 w-60 lg:w-72 h-auto opacity-80 pointer-events-none" />
        <div className="bg-primary h-[0.5px] mt-5" />
          <p className="py-5 font-primary md:text-l text-primary text-center md:order-1 ">
            &copy; {translate("footer.copyright")}
          </p>
          <img src="/images/light.png" alt="Light" className="absolute hidden lg:block bottom-0 opacity-80 w-[450px] h-[450px]"/>
          <img src="/images/illustration1.svg" alt="Illustration Right" className="absolute bottom-10 right-5 w-60 lg:w-72 h-auto opacity-80 pointer-events-none" />
    </footer>
  );
}
