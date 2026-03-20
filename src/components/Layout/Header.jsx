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

import { Dialog } from "@headlessui/react";
import React from "react";
import { Link } from "react-router-dom";

import NAVIGATION from "@/constants/navigation";
import Languages from "../Languages";

//Hooks
import useLocales from "@/hooks/useLocales";
import { useState } from "react";
import { X, Menu, ChevronDown, Github } from "lucide-react";

//Icons
import MenuBookIcon from '@mui/icons-material/MenuBook';
import StorageIcon from '@mui/icons-material/Storage';
import SummarizeIcon from '@mui/icons-material/Summarize';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import LanIcon from '@mui/icons-material/Lan';
import PageviewIcon from '@mui/icons-material/Pageview';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'; 
import LoginIcon from '@mui/icons-material/Login';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';

const getIconComponent = (name) => {
  switch (name) {
    case "menuBook":
      return <MenuBookIcon className="mr-2" />;
    case "storage":
      return <StorageIcon className="mr-2" />;
    case "summarize":
      return <SummarizeIcon className="mr-2" />;
    case "sync":
      return <SyncAltIcon className="mr-2" />;
    case "lan":
      return <LanIcon className="mr-2" />;
    case "pageview":
      return <PageviewIcon className="mr-2" />;
    case "login":
      return <LoginIcon className="mr-2" />;
    case "filejson":
      return <IntegrationInstructionsIcon className="mr-2" />;
    case "braces":
      return <DeveloperModeIcon className="mr-2" />;
    default:
      return <HelpOutlineIcon className="mr-2" />;
  }
};

export default function Header() {
  const { translate } = useLocales();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("FR");
  const [activeMenu, setActiveMenu] = useState(null);


  return (
    <header className="inset-x-0 top-0 z-50">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link
            to="/"
            className={`lg:-ml-1.5 -m-1.5 p-1.5`}
          >
            <span className="sr-only">Billariz</span>
            <img
              className="md:h-9 md:w-36 w-24 h-6"
              src="/images/Logo.svg"
              alt="Billariz"
            />
          </Link>
        </div>
        <div>
          <div className="flex items-center gap-4 xl:hidden">
            <Languages
              selectedLang={selectedLang}
              setSelectedLang={setSelectedLang}
            />
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center bg-primary rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="hidden xl:flex xl:gap-x-4">
          <div className="hidden xl:flex xl:gap-x-4">
            <div className="hidden xl:flex xl:gap-x-4">
            {NAVIGATION.map((item) =>
              item.children ? (
                <div key={item.name} className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenu(activeMenu === item.name ? null : item.name);
                    }}
                    className="font-primary px-2 py-3 text-xl leading-6 text-primary hover:text-secondary cursor-pointer flex items-center gap-1"
                  >
                    {translate(item.name)}
                    <ChevronDown
                      className={`w-6 h-6 transition-transform duration-200 ${
                        activeMenu === item.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {activeMenu === item.name && (
                    <div className="absolute bg-white dark:bg-tertiary border border-gray-300 dark:border-gray-600 shadow-lg rounded-md mt-2 z-50">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.href}
                          onClick={() => {
                            setActiveMenu(null); // Ferme le menu ouvert
                            child.href==="" ? window.open(child.file, "_blank") : window.location.href = child.href; // Recharge proprement
                          }}
                          className="flex items-center gap-2 whitespace-nowrap px-4 py-2 text-primary hover:text-secondary text-base"
                        >
                          {getIconComponent(child.picto)}
                          {translate(child.name)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => {
                    setActiveMenu(null);
                    window.location.href = item.href;
                  }}
                  className="font-primary px-2 py-3 hover:text-secondary text-xl leading-6 text-primary"
                >
                  {translate(item.name)}
                </Link>
              )
            )}

          </div>
          </div>
        </div>
        <div className="hidden xl:flex xl:flex-1 xl:justify-end gap-3 items-center">
          <a
            href="https://github.com/billariz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-600 text-primary dark:text-[#e6f0ff] hover:border-secondary hover:text-secondary transition text-sm font-medium"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
            <span>GitHub</span>
          </a>
          <Languages
            selectedLang={selectedLang}
            setSelectedLang={setSelectedLang}
          />
        </div>
      </nav>

      {
        //Mobile
      }

      <Dialog
        as="div"
        className="xl:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-tertiary px-4 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-1.5 p-1.5"
            >
              <span className="sr-only">Billariz</span>
              <img
                className="md:h-9 md:w-36 w-24 h-6 lg:hidden"
                src="/images/Logo.svg"
                alt="Billariz"
              />
            </Link>
            <div className="flex items-center gap-2">
              <Languages
                selectedLang={selectedLang}
                setSelectedLang={setSelectedLang}
              />
              <button
                type="button"
                className="rounded-md p-2.5 bg-primary text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {NAVIGATION.map((item) =>
                  item.children ? (
                    <div key={item.name}>
                      <button
                        onClick={() =>
                          setActiveMenu(activeMenu === item.name ? null : item.name)
                        }
                        className="w-full flex justify-between items-center font-primary px-4 py-3 text-xl text-primary hover:text-secondary"
                      >
                        <span className="flex items-center gap-2">
                          {getIconComponent(item.picto)}
                          {translate(item.name)}
                        </span>
                        <ChevronDown
                          className={`w-6 h-6 transition-transform duration-200 ${
                            activeMenu === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {activeMenu === item.name && (
                        <div className="ml-6 mt-2 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              to={child.href}
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setActiveMenu(null);
                                window.location.href = child.href;
                              }}
                              className="block font-primary text-base text-primary hover:text-secondary flex items-center gap-2 px-2 py-2"
                            >
                              {getIconComponent(child.picto)}
                              {translate(child.name)}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        window.location.href = item.href;
                      }}
                      className="block font-primary px-4 py-3 text-xl text-primary hover:text-secondary"
                    >
                      {translate(item.name)}
                    </Link>
                  )
                )}
              </div>
              <div className="py-6 mt-[327px]">
                <a
                  href="https://github.com/billariz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full border border-gray-300 dark:border-gray-600 rounded-full px-4 py-3 text-sm font-medium text-primary hover:text-secondary transition"
                >
                  <Github className="w-5 h-5" />
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
