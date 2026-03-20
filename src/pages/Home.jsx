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

import React, { useState, useEffect } from 'react';

import { Container } from '@/components/container';
import Layout from '@/components/Layout/layout';

//Hooks
import useLocales from '@/hooks/useLocales';

//Icons
import { CheckCircle2, Github, Zap, Droplets, Trash2, LayoutList, Lock, Rocket, GitMerge, Headphones } from 'lucide-react';

import { Link } from 'react-router-dom';

// Sections
import TestimonialsSection from '@/components/Testimonials';
import Stepper from '@/components/Stepper';

const SCREENSHOTS = [
  '/images/screen10.png',
  '/images/screen5.png',
  '/images/screen3.png',
  '/images/screen13.png',
  '/images/screen4.png',
];

function ScreenshotCarousel() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCurrent(i => (i + 1) % SCREENSHOTS.length), 3500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-primary/20" style={{ aspectRatio: '16/9' }}>
      {SCREENSHOTS.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`Billariz screenshot ${i + 1}`}
          className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        />
      ))}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {SCREENSHOTS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="w-2 h-2 rounded-full transition-all"
            style={{ background: i === current ? '#47b9f7' : '#d5ecf8', opacity: i === current ? 1 : 0.4 }}
          />
        ))}
      </div>
    </div>
  );
}

const FOR_WHO = [
  'home.section2.features.1',
  'home.section2.features.2',
  'home.section2.features.3',
  'home.section2.features.4',
];
const FEATURES = [
  'home.section3.features.1',
  'home.section3.features.2',
  'home.section3.features.3',
  'home.section3.features.4',
  'home.section3.features.5',
];
const WHY_US = [
  'home.section5.features.1',
  'home.section5.features.2',
  'home.section5.features.3',
  'home.section5.features.4',
  'home.section5.features.5',
  'home.section5.features.6',
];

const STATS = [
  { value: '3',         key: 'home.stats.items.1' },
  { value: '8',         key: 'home.stats.items.2' },
  { value: '4',         key: 'home.stats.items.3' },
  { value: '100%',      key: 'home.stats.items.4' },
];

const USE_CASES = [
  { icon: <Zap className="w-7 h-7" />,        sector: 'energy' },
  { icon: <Droplets className="w-7 h-7" />,   sector: 'water' },
  { icon: <Trash2 className="w-7 h-7" />,     sector: 'waste' },
  { icon: <LayoutList className="w-7 h-7" />, sector: 'subscriptions' },
];

const OS_CARDS = [
  { icon: <Lock className="w-6 h-6" />,         key: 'license' },
  { icon: <Rocket className="w-6 h-6" />,       key: 'deploy' },
  { icon: <GitMerge className="w-6 h-6" />,     key: 'contribute' },
  { icon: <Headphones className="w-6 h-6" />,   key: 'support' },
];

const TECH_STACK = [
  { label: 'Spring Boot',  color: 'bg-green-900/40 text-green-300 border-green-700' },
  { label: 'React',        color: 'bg-blue-900/40 text-blue-300 border-blue-700' },
  { label: 'Node.js',      color: 'bg-lime-900/40 text-lime-300 border-lime-700' },
  { label: 'PostgreSQL',   color: 'bg-indigo-900/40 text-indigo-300 border-indigo-700' },
  { label: 'Docker',       color: 'bg-sky-900/40 text-sky-300 border-sky-700' },
];

function Home() {
  const { translate } = useLocales();

  return (
    <Layout>
      <div>

        {/* ── HERO ── */}
        <Container>
          <div className="relative mt-12 lg:mt-24">
            <section>
              <div className="grid grid-cols-1 xl:grid-cols-2 lg:gap-10">
                <div className="mx-auto lg:py-10 py-0 space-y-[40px] w-full">
                  <div>
                    {/* Badge open source */}
                    <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full border border-secondary/40 bg-secondary/10 text-secondary text-xs font-medium font-secondary">
                      <Github className="w-3.5 h-3.5" />
                      {translate('home.hero.badge')}
                    </div>

                    <h1 className="font-primary text-primary text-3xl lg:text-6xl font-medium leading-10 lg:leading-18">
                      {translate('home.hero.h1.1')}{' '}
                      <span className="text-secondary">
                        {translate('home.hero.h1.2')}
                      </span>{' '}
                      {translate('home.hero.h1.3')}{' '}
                      <span className="text-secondary">
                        {' '}
                        {translate('home.hero.h1.4')}
                      </span>{' '}
                      {translate('home.hero.h1.5')}
                    </h1>

                    <p className="font-secondary text-sm lg:text-xl text-primary mt-3.5 lg:mt-6">
                      {' '}
                      {translate('home.hero.description')}
                    </p>

                    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 mt-10">
                      <a
                        href="mailto:contact@billariz.com?cc=contact@uppli.fr&subject=Demande%20de%20démo%20—%20Billariz"
                        className="font-primary shadow-style rounded-[100px] text-center px-8 py-3.5 lg:py-5 border-primary lg:text-xl font-medium leading-6 text-primary border-[1px]"
                      >
                        {translate('home.hero.requestDemo')}
                      </a>{' '}
                      <a
                        href="mailto:contact@billariz.com?cc=contact@uppli.fr&subject=Contacter%20un%20expert%20—%20Billariz"
                        className="font-primary shadow-style rounded-[100px] text-center px-8 py-3.5 lg:py-5 bg-primary lg:text-xl font-semibold leading-6 text-tertiary"
                      >
                        {translate('home.hero.contactExpert')}
                      </a>
                    </div>
                  </div>

                  <div className="mx-auto mt-20 w-full sm:w-96 lg:hidden">
                    <img src="/images/hero.webp" alt="Billariz" />
                  </div>
                </div>
                <div className="hidden lg:block">
                  <img
                    src="/images/hero.webp"
                    className="mx-auto h-[620px] 2xl:min-w-2xl"
                    alt="Billariz"
                  />
                </div>
              </div>
            </section>
          </div>
        </Container>

        {/* ── POUR QUI ── */}
        <Container>
          <div className="relative mt-30 lg:mt-24">
            <section>
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-6">
                <div className="border-[1px] shadow-style min-w-76  border-primary rounded-[40px] flex flex-col justify-end px-6 lg:px-8 py-7">
                  <div className="grid grid-cols-2 gap-4 lg:gap-5 mt-10 lg:mt-0">
                    <div className="text-tertiary h-fit self-end font-medium font-primary gap-2 bg-primary text-sm lg:text-lg flex rounded-[100px] px-3 lg:px-4 py-2 items-center">
                      <img src="/images/icons/note.svg" className="w-6 h-6 lg:w-7 lg:h-7" alt={translate('home.section2.contract')} />
                      {translate('home.section2.contract')}
                    </div>
                    <div className="text-tertiary rotate-[14deg] md:rotate-[6deg] xl:rotate-[14deg] mb-3 md:mb-4 font-medium font-primary gap-2 bg-primary text-sm lg:text-lg flex rounded-[100px] px-3 lg:px-4 py-2 items-center">
                      <img src="/images/icons/edit.svg" className="w-6 h-6 lg:w-7 lg:h-7" alt={translate('home.section2.edition')} />
                      {translate('home.section2.edition')}
                    </div>
                    <div className="text-tertiary font-medium font-primary gap-2 bg-primary text-sm lg:text-lg flex rounded-[100px] px-3 lg:px-4 py-2 items-center">
                      <img src="/images/icons/card.svg" className="w-6 h-6 lg:w-7 lg:h-7" alt={translate('home.section2.pricing')} />
                      {translate('home.section2.pricing')}
                    </div>
                    <div className="text-tertiary font-medium font-primary gap-2 bg-primary text-sm lg:text-lg flex rounded-[100px] px-3 lg:px-4 py-2 items-center">
                      <img src="/images/icons/receipt.svg" className="w-6 h-6 lg:w-7 lg:h-7" alt={translate('home.section2.invoicing')} />
                      {translate('home.section2.invoicing')}
                    </div>
                  </div>
                  <div className="h-[1px] bg-primary w-full mt-5 lg:mt-8" />
                  <p className="text-3xl lg:text-5xl text-primary font-primary mt-3 lg:mt-4">
                    {translate('home.section2.forWho')}
                  </p>
                </div>
                <div className="col-span-2 space-y-4">
                  {FOR_WHO.map((i) => (
                    <div key={i} className="flex shadow-style w-full text-[#F8FAFC] bg-tertiary font-secondary font-medium lg:text-xl items-center gap-4 border-[1px] border-primary rounded-3xl py-3.5 lg:py-4 px-6 lg:px-8">
                      <img src="/images/icons/invoice.svg" className="h-10 lg:h-12 w-10 lg:w-12" alt="" />
                      {translate(i)}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </Container>

        {/* ── STATS ── */}
        <Container>
          <div className="relative mt-20 lg:mt-24">
            <section>
              <p className="text-sm lg:text-lg text-secondary font-secondary font-medium text-center mb-8">
                {translate('home.stats.note')}
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {STATS.map(({ value, key }) => (
                  <div key={key} className="border-[1px] border-primary rounded-3xl bg-tertiary shadow-style flex flex-col items-center justify-center py-8 px-4 text-center">
                    <span className="font-primary text-secondary text-4xl lg:text-5xl font-bold">{value}</span>
                    <span className="font-secondary text-primary text-sm lg:text-base mt-3 leading-snug">{translate(key)}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </Container>

        {/* ── FONCTIONNALITÉS ── */}
        <Container>
          <div className="relative mt-30 lg:mt-24">
            <section>
              <div className="grid grid-cols-1 xl:grid-cols-2 lg:gap-10">
                <div className="hidden lg:flex items-center">
                  <ScreenshotCarousel />
                </div>
                <div className="mx-auto lg:py-10 py-0 space-y-[40px] w-full">
                  <div>
                    <p className="text-sm lg:text-lg text-secondary font-secondary font-medium">
                      {translate('home.section3.note')}
                    </p>
                    <h2 className="font-primary text-primary mt-3 text-3xl lg:text-[50px] font-medium leading-10 lg:leading-16">
                      {translate('home.section3.h2.1')}{' '}
                      <span className="text-secondary">{translate('home.section3.h2.2')}</span>
                    </h2>
                    <p className="font-secondary text-sm lg:text-xl text-primary mt-3.5 lg:mt-3">
                      {translate('home.section3.description')}
                    </p>
                    <div className="col-span-2 space-y-4 lg:space-y-6 mt-6 lg:mt-10">
                      {FEATURES.map((i) => (
                        <div key={i} className="flex shadow-style w-full text-sm text-[#F8FAFC] bg-tertiary font-secondary font-medium lg:text-xl items-center gap-3 lg:gap-4 border-[1px] border-primary rounded-3xl py-3.5 lg:py-4 px-6 lg:px-4">
                          <CheckCircle2 color="#d5ecf8" size={32} />
                          {translate(i)}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mx-auto mt-10 w-full lg:hidden">
                    <ScreenshotCarousel />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </Container>

        {/* ── CAS D'USAGE ── */}
        <Container>
          <div className="relative mt-30 lg:mt-24">
            <section>
              <div className="text-center mb-10 lg:mb-14">
                <p className="text-sm lg:text-lg text-secondary font-secondary font-medium">
                  {translate('home.usecases.note')}
                </p>
                <h2 className="font-primary text-primary mt-3 text-3xl lg:text-[50px] font-medium leading-10 lg:leading-14">
                  {translate('home.usecases.h2.1')}{' '}
                  <span className="text-secondary">{translate('home.usecases.h2.2')}</span>
                </h2>
                <p className="font-secondary text-sm lg:text-xl text-primary mt-4 max-w-2xl mx-auto">
                  {translate('home.usecases.description')}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {USE_CASES.map(({ icon, sector }) => (
                  <div key={sector} className="border-[1px] border-primary rounded-3xl bg-tertiary shadow-style px-6 py-7 flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-secondary/10 border border-secondary/30 flex items-center justify-center text-secondary">
                      {icon}
                    </div>
                    <h3 className="font-primary text-primary text-lg lg:text-xl font-semibold">
                      {translate(`home.usecases.sectors.${sector}.title`)}
                    </h3>
                    <p className="font-secondary text-sm lg:text-base text-primary leading-relaxed">
                      {translate(`home.usecases.sectors.${sector}.description`)}
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {[1, 2, 3].map((n) => (
                        <li key={n} className="flex items-start gap-2 text-xs lg:text-sm font-secondary text-primary">
                          <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                          {translate(`home.usecases.sectors.${sector}.items.${n}`)}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </Container>

        {/* ── WORKFLOW ── */}
        <Container>
          <Stepper />
        </Container>

        {/* ── POURQUOI BILLARIZ ── */}
        <Container>
          <div className="relative mt-30 lg:mt-60">
            <section>
              <div className="grid lg:grid-cols-3">
                <div className="col-span-2">
                  <p className="text-sm lg:text-lg text-secondary font-secondary font-medium">
                    {translate('home.section5.note')}
                  </p>
                  <h2 className="font-primary text-primary mt-3 text-3xl lg:text-[50px] font-medium leading-10 lg:leading-16">
                    {translate('home.section5.h2.1')}{' '}
                    <span className="text-secondary">{translate('home.section5.h2.2')}</span>{' '}
                    {translate('home.section5.h2.3')}{' '}
                    <span className="text-secondary">{translate('home.section5.h2.4')}</span>{' '}
                    {translate('home.section5.h2.5')}{' '}
                    <span className="text-secondary">{translate('home.section5.h2.6')}</span>{' '}
                    {translate('home.section5.h2.7')}
                  </h2>
                  <p className="font-secondary text-sm lg:text-xl text-primary mt-3.5 lg:mt-3">
                    {translate('home.section5.description')}
                  </p>
                </div>
              </div>
              <div className="mt-6 lg:mt-14 grid lg:grid-cols-2 gap-x-6 gap-y-6">
                {WHY_US.map((i) => (
                  <div key={i} className="flex shadow-style w-full text-[#F8FAFC] bg-tertiary font-secondary font-semibold lg:text-lg items-center gap-3 lg:gap-4 border-[1px] border-primary rounded-3xl py-4 lg:py-4 px-6 lg:px-6">
                    <img src="/images/icons/invoice.svg" className="h-10 lg:h-12 w-10 lg:w-12" alt="" />
                    {translate(i)}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </Container>

        {/* ── OPEN SOURCE ── */}
        <Container>
          <div className="relative mt-30 lg:mt-24">
            <section>
              <div className="text-center mb-10 lg:mb-14">
                <p className="text-sm lg:text-lg text-secondary font-secondary font-medium">
                  {translate('home.opensource.note')}
                </p>
                <h2 className="font-primary text-primary mt-3 text-3xl lg:text-[50px] font-medium leading-10 lg:leading-14">
                  {translate('home.opensource.h2.1')}{' '}
                  <span className="text-secondary">{translate('home.opensource.h2.2')}</span>
                </h2>
                <p className="font-secondary text-sm lg:text-xl text-primary mt-4 max-w-2xl mx-auto">
                  {translate('home.opensource.description')}
                </p>
              </div>

              {/* 4 cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {OS_CARDS.map(({ icon, key }) => (
                  <div key={key} className="border-[1px] border-primary rounded-3xl bg-tertiary shadow-style px-6 py-7 flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary/10 border border-secondary/30 flex items-center justify-center text-secondary">
                      {icon}
                    </div>
                    <h3 className="font-primary text-primary text-base lg:text-lg font-semibold">
                      {translate(`home.opensource.cards.${key}.title`)}
                    </h3>
                    <p className="font-secondary text-sm text-primary leading-relaxed">
                      {translate(`home.opensource.cards.${key}.description`)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Tech stack + CTA */}
              <div className="mt-10 lg:mt-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-[1px] border-primary rounded-3xl bg-tertiary px-8 py-6">
                <div className="flex flex-col gap-3">
                  <p className="font-primary text-primary text-sm font-semibold uppercase tracking-wide">
                    {translate('home.opensource.stack.title')}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {TECH_STACK.map(({ label, color }) => (
                      <span key={label} className={`px-3 py-1 rounded-full border text-xs font-medium font-secondary ${color}`}>
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href="https://github.com/billariz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-tertiary font-primary font-semibold text-base hover:opacity-90 transition shrink-0"
                >
                  <Github className="w-5 h-5" />
                  {translate('home.opensource.cta')}
                </a>
              </div>
            </section>
          </div>
        </Container>

        {/* ── TÉMOIGNAGES ── */}
        <div className={'mt-10 lg:mt-48'}>
          <TestimonialsSection />
        </div>

        {/* ── TROUVER SON PLAN ── */}
        <Container>
          <div className="relative mt-30 lg:mt-52">
            <section>
              <div className="grid grid-cols-1 xl:grid-cols-2 lg:gap-10">
                <div className="mx-auto lg:py-10 py-0 space-y-[40px] w-full">
                  <div>
                    <p className="text-sm lg:text-lg text-secondary font-secondary font-medium">
                      {translate('home.section4.note')}
                    </p>
                    <h2 className="font-primary text-primary text-3xl lg:text-[52px] mt-3 font-medium leading-10 lg:leading-14">
                      {translate('home.section4.h2')}
                    </h2>
                    <p className="font-secondary text-sm lg:text-xl text-primary mt-3.5 lg:mt-5">
                      {translate('home.section4.description')}
                    </p>
                    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 mt-6 lg:mt-10">
                      <a
                        href="mailto:contact@billariz.com?cc=contact@uppli.fr&subject=Contacter%20un%20expert%20—%20Billariz"
                        className="font-primary shadow-style rounded-[100px] text-center px-8 py-3.5 lg:py-5 border-primary lg:text-xl font-medium leading-6 text-primary border-[1px]"
                      >
                        {translate('home.hero.contactExpert')}
                      </a>{' '}
                      <Link
                        to="pricing"
                        className="font-primary shadow-style rounded-[100px] text-center px-8 py-3.5 lg:py-5 bg-primary lg:text-xl font-semibold leading-6 text-tertiary"
                      >
                        {translate('home.section4.note')}
                      </Link>
                    </div>
                  </div>
                  <div className="mx-auto mt-10 w-full lg:hidden">
                    <ScreenshotCarousel />
                  </div>
                </div>
                <div className="hidden lg:flex items-center">
                  <ScreenshotCarousel />
                </div>
              </div>
            </section>
          </div>
        </Container>

      </div>
    </Layout>
  );
}

export default Home;
