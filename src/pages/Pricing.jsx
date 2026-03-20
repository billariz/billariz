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
import Layout from "@/components/Layout/layout";
import { CheckIcon, Gift, XCircle, ArrowRight, Github } from "lucide-react";
import useLocales from "@/hooks/useLocales";

// ─── Plans avec support (clés i18n) ───────────────────────────────────────
const PLAN_KEYS = ['basic', 'intermediate', 'comfort'];

const featureList = [
  { key: 'usage_right',      details: ['free', 'free', 'free'],                         apply: [true,  true,  true]  },
  { key: 'cost_per_point',   details: ['1€', '1,5€', '2€'],                             apply: [true,  true,  true]  },
  { key: 'cost_per_invoice', details: ['1€', '1,75€', '2€'],                            apply: [true,  true,  true]  },
  { key: 'cost_per_print',   details: ['0,25€', '0,5€', '0,5€'],                        apply: [true,  true,  true]  },
  { key: 'nb_users',         details: ['5', '15', 'unlimited'],                         apply: [true,  true,  true]  },
  { key: 'infra_cost',       details: ['3.000€', 'free', 'free'],                       apply: [true,  true,  true]  },
  { key: 'helpdesk',         details: ['business_hours', 'business_hours', 'custom_sla'],apply: [true,  true,  true]  },
  { key: 'maintenance',      details: ['', '', ''],                                      apply: [true,  true,  true]  },
  { key: 'billing_setup',    details: ['free', 'free', 'free'],                         apply: [true,  true,  true]  },
  { key: 'printshop_setup',  details: ['free', 'free', 'free'],                         apply: [true,  true,  true]  },
  { key: 'billing_workflow', details: ['standard', 'simple', 'advanced'],               apply: [false, true,  true]  },
  { key: 'contract_workflow',details: ['standard', 'simple', 'advanced'],               apply: [false, true,  true]  },
  { key: 'ops_mgmt',         details: ['', 'partial', 'advanced'],                      apply: [false, true,  true]  },
  { key: 'dedicated_contact',details: ['', '', ''],                                      apply: [false, false, true]  },
  { key: 'integration',      details: ['basic', 'standard', 'advanced'],                apply: [true,  true,  true]  },
];

const featureSections = [
  { key: 'plans',    range: [0, 5]  },
  { key: 'features', range: [6, 11] },
  { key: 'advanced', range: [12, 14]},
];

const COMMUNITY_FEATURE_KEYS = ['0', '1', '2', '3', '4', '5'];
const FAQ_KEYS = ['q1', 'q2', 'q3'];

// ─── Composant Community ───────────────────────────────────────────────────
function CommunityPlan({ translate }) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="relative rounded-2xl border-2 border-secondary bg-white dark:bg-[#0b1e3a] shadow-lg p-10 text-center">
        <span className="inline-block mb-4 px-4 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-semibold tracking-wide">
          {translate('pricing.community.badge')}
        </span>
        <h2 className="text-4xl font-bold text-primary dark:text-[#e6f0ff] mb-2">
          {translate('pricing.community.title')}
        </h2>
        <p className="text-2xl font-semibold text-secondary mb-2">
          {translate('pricing.community.subtitle')}
        </p>
        <p className="text-gray-500 dark:text-[#cbd8f0] mb-8">
          {translate('pricing.community.description')}
        </p>
        <a
          href="https://github.com/billariz"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-full font-semibold hover:bg-secondary transition mb-10"
        >
          <Github size={20} />
          {translate('pricing.community.cta')}
        </a>
        <ul className="space-y-3 text-left">
          {COMMUNITY_FEATURE_KEYS.map((key) => (
            <li key={key} className="flex items-center gap-3 text-gray-700 dark:text-[#cbd8f0]">
              <CheckIcon className="h-5 w-5 flex-shrink-0 text-secondary bg-secondary/10 rounded-full p-0.5" />
              {translate(`pricing.community.features.${key}`)}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-gray-400 dark:text-gray-500 italic">
          {translate('pricing.community.note')}
        </p>
      </div>
    </div>
  );
}

// ─── Composant Plans Support ───────────────────────────────────────────────
function SupportPlans({ translate }) {
  const t = (key) => translate(`pricing.support.${key}`);
  const val = (v) => v ? (translate(`pricing.support.values.${v}`) || v) : '';

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-separate">
        <thead>
          <tr>
            <th className="text-left text-base font-semibold p-4"></th>
            {PLAN_KEYS.map((planKey) => (
              <th
                key={planKey}
                className="text-center bg-white dark:bg-[#102a54] rounded-lg shadow-sm p-4 align-top transition-colors transform hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(0,122,255,0.4)] hover:z-10"
              >
                <div className="text-lg font-bold text-gray-900 dark:text-[#e6f0ff]">
                  {t(`plans.${planKey}.name`)}
                </div>
                <br />
                <div className="text-sm italic font-normal text-yellow-500 dark:text-yellow-400">
                  {t(`plans.${planKey}.details`)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {featureSections.map((section, sIdx) => (
            <React.Fragment key={sIdx}>
              <tr>
                <td colSpan={4} className="text-center bg-[#6a5acd]/30 dark:bg-[#6a5acd]/40 text-[#4b3fad] dark:text-[#d6d4f0] font-semibold py-2 rounded-md">
                  {t(`sections.${section.key}`)}
                </td>
              </tr>
              {featureList.slice(section.range[0], section.range[1] + 1).map((feature, idx) => (
                <tr key={idx}>
                  <td className="p-4 text-yellow-500 text-sm font-medium bg-[#e6f0ff] dark:bg-[#0b1e3a] rounded-l-lg">
                    {t(`features.${feature.key}.name`)}
                  </td>
                  {PLAN_KEYS.map((planKey, pIdx) => (
                    <td key={pIdx} className="text-center p-4 bg-white dark:bg-[#102a54] rounded-r-lg hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(0,122,255,0.3)]">
                      {feature.apply[pIdx] ? (
                        feature.details[pIdx] === 'free' ? (
                          <div className="flex justify-center">
                            <Gift className="w-5 h-5 text-yellow-400" />
                          </div>
                        ) : (
                          <div className="flex justify-center items-center gap-x-1">
                            {feature.details[pIdx] && section.key !== 'plans' && (
                              <CheckIcon className="h-5 p-1 bg-secondary rounded-full w-5 flex-none text-tertiary" />
                            )}
                            <span className="text-gray-600 dark:text-[#cbd8f0]">
                              {val(feature.details[pIdx])}
                            </span>
                          </div>
                        )
                      ) : (
                        <div className="flex justify-center">
                          <XCircle className="w-6 h-6 text-gray-300 dark:text-gray-600" />
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Page principale ───────────────────────────────────────────────────────
function Pricing() {
  const [mode, setMode] = useState('community');
  const { translate } = useLocales();

  return (
    <Layout>
      <div className="pt-35 pb-8">
        <div className="mx-auto max-w-screen-2xl px-6 lg:px-20">

          {/* Header */}
          <div className="mx-auto max-w-4xl text-center mb-10">
            <p className="text-3xl lg:text-5xl font-primary font-medium tracking-tight text-primary dark:text-[#e6f0ff] mb-8">
              {translate('pricing.description')}
            </p>

            {/* Toggle */}
            <div className="inline-flex rounded-full border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-[#0b1e3a] p-1">
              <button
                onClick={() => setMode('community')}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  mode === 'community' ? 'bg-primary text-white shadow' : 'text-gray-500 hover:text-primary'
                }`}
              >
                {translate('pricing.toggle.community')}
              </button>
              <button
                onClick={() => setMode('support')}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  mode === 'support' ? 'bg-primary text-white shadow' : 'text-gray-500 hover:text-primary'
                }`}
              >
                {translate('pricing.toggle.support')}
              </button>
            </div>
          </div>

          {mode === 'community' ? <CommunityPlan translate={translate} /> : <SupportPlans translate={translate} />}
        </div>
      </div>

      {/* Demo */}
      <div className="py-14 sm:py-20">
        <div className="mx-auto max-w-screen-2xl px-6 lg:px-20">
          <div className="bg-[#DDD6B8] rounded-xl shadow-sm p-8 flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="hidden lg:block">
              <img src="/images/hero.webp" className="h-[120px] w-[120px]" alt="Billariz" />
            </div>
            <p className="text-lg md:text-2xl text-[#6B7280] font-medium flex-1 text-center lg:text-left px-4">
              {translate('pricing.demo.description')}
            </p>
            <a
              href="mailto:contact@billariz.com?cc=contact@uppli.fr&subject=Demande%20de%20démo%20—%20Billariz"
              className="bg-secondary text-white px-6 py-3 rounded-full hover:bg-gray-800 flex items-center gap-2 transition whitespace-nowrap"
            >
              {translate('pricing.demo.cta')}
              <ArrowRight size={20} />
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div className="mx-auto max-w-screen-2xl px-6 lg:px-20 mt-16">
          <h3 className="text-2xl font-bold text-primary dark:text-[#e6f0ff] mb-8 text-center">
            {translate('pricing.faq.title')}
          </h3>
          <div className="space-y-4 max-w-3xl mx-auto">
            {FAQ_KEYS.map((key) => (
              <div key={key} className="bg-white dark:bg-[#102a54] rounded-xl shadow-sm p-6">
                <h4 className="text-base font-semibold text-primary dark:text-[#e6f0ff] mb-2">
                  {translate(`pricing.faq.${key}.question`)}
                </h4>
                <p className="text-gray-600 dark:text-[#cbd8f0] text-sm">
                  {translate(`pricing.faq.${key}.answer`)}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href="mailto:contact@billariz.com?cc=contact@uppli.fr&subject=Contact%20—%20Billariz"
              className="bg-secondary text-white px-8 py-3 rounded-full hover:bg-gray-800 inline-flex items-center gap-2 transition"
            >
              {translate('pricing.faq.cta')}
              <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Pricing;
