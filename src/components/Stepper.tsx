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

import React, { useState, Fragment, Suspense } from 'react';
import { Popover, Transition } from '@headlessui/react';

//Hooks
import useLocales from '../hooks/useLocales';

import { ChevronDown } from 'lucide-react';

const stepsData = [
  {
    title: 'home.workflow.1.title',
    display: {
      h3: 'home.workflow.1.h3',
      description: 'home.workflow.1.description',
      image: '/images/screen11.png', // Contrat signé — services installés
    },
  },
  {
    title: 'home.workflow.2.title',
    display: {
      h3: 'home.workflow.2.h3',
      description: 'home.workflow.2.description',
      image: '/images/screen12.png', // Installation — éléments de service en cours
    },
  },
  {
    title: 'home.workflow.3.title',
    display: {
      h3: 'home.workflow.3.h3',
      description: 'home.workflow.3.description',
      image: '/images/screen8.png', // Collecte des données — relevé initialisé
    },
  },
  {
    title: 'home.workflow.4.title',
    display: {
      h3: 'home.workflow.4.h3',
      description: 'home.workflow.4.description',
      image: '/images/screen3.png', // Valorisation — relevé valorisé
    },
  },
  {
    title: 'home.workflow.5.title',
    display: {
      h3: 'home.workflow.5.h3',
      description: 'home.workflow.5.description',
      image: '/images/screen10.png', // Calcul de facturation — sections calculées
    },
  },
  {
    title: 'home.workflow.6.title',
    display: {
      h3: 'home.workflow.6.h3',
      description: 'home.workflow.6.description',
      image: '/images/screen5.png', // Édition des factures — onglet facturation
    },
  },
  {
    title: 'home.workflow.7.title',
    display: {
      h3: 'home.workflow.7.h3',
      description: 'home.workflow.7.description',
      image: '/images/screen1.png', // Validation — configuration validée
    },
  },
];

function Stepper() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const { translate } = useLocales();

  return (
    <div className="grid lg:grid-cols-5 mt-44">
      <div className="hidden lg:block col-span-2">
        <h2 className="text-[56px] text-secondary font-primary">
          {translate('home.workflow.workflow')}
        </h2>
        <div className="flex flex-col mt-10">
          {stepsData.map((step, index) => {
            const isLast = index === stepsData.length - 1;
            const isCompleted = index < currentStep;
            const isActive = index === currentStep;

            const renderCircle = () => {
              if (isCompleted) {
                return (
                  <div className="w-5 h-5 shrink-0 mx-[-1px] border-2 bg-primary border-primary flex items-center justify-center rounded-full cursor-pointer"></div>
                );
              }

              return (
                <div className="w-5 h-5 shrink-0 mx-[-1px] border-2 border-[#8394A6] bg-[#8394A6] flex items-center justify-center rounded-full cursor-pointer"></div>
              );
            };

            const getLineColor = () => {
              if (isCompleted) return 'bg-primary';
              if (isActive) return 'bg-[#8394A6]';
              return 'bg-primary';
            };

            return (
              <div
                key={index}
                className="flex items-start group cursor-pointer"
                onClick={() => setCurrentStep(index + 1)}
              >
                {/* Step circle and line */}
                <div className="flex flex-col items-center">
                  {renderCircle()}
                  {!isLast && (
                    <div
                      className={`w-0.5 h-20 rounded-md transition-all duration-300 ${getLineColor()}`}
                    />
                  )}
                </div>

                {/* Text block on the right */}
                <div className="ml-7">
                  <h6
                    className={`text-xl font-primary font-medium ${
                      isCompleted ? 'text-primary' : 'text-[#8394A6]'
                    }`}
                  >
                    {translate(step.title)}
                  </h6>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="col-span-3 w-full">
        <h2 className="text-[40px] text-secondary font-primary lg:hidden">
          {translate('home.workflow.workflow')}
        </h2>
        <Popover className="relative isolate z-50 lg:hidden">
          <Popover.Button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-primary w-full mt-6 rounded-[100px] px-6 py-3 flex justify-between items-center"
          >
            <p className="text-tertiary font-primary font-medium">
              {' '}
              {translate(stepsData[currentStep - 1].title)}
            </p>
            <ChevronDown
              className={`transform transition-transform duration-300 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 -translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-1"
            afterLeave={() => {
              setIsOpen(false);
            }}
          >
            <Popover.Panel className="absolute inset-x-0 -left-4 top-14 z-30 bg-primary rounded-3xl shadow-lg sm:top-16 ml-4 px-6 py-4">
              <div className="text-tertiary font-primary font-medium flex flex-col space-y-4">
                {stepsData.map((step, i) => (
                  <Popover.Button
                    key={i}
                    onClick={() => {
                      setCurrentStep(i + 1);
                    }}
                    className="text-left w-full"
                  >
                    {translate(step.title)}
                  </Popover.Button>
                ))}
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
        <h3 className="text-[32px] mt-10 lg:mt-0 lg:text-[64px] text-center font-semibold text-[#F8FAFC]">
          {translate(stepsData[currentStep - 1].display?.h3)}
        </h3>
        <p className="text-primary font-secondary mt-3 lg:text-2xl lg:mt-8 text-center">
          {translate(stepsData[currentStep - 1].display?.description)}
        </p>
        <img
          src={stepsData[currentStep - 1].display?.image}
          className="mx-auto mt-8 lg:mt-14 shadow-style-bottom w-full rounded-2xl border border-primary/20 object-cover"
          alt={translate(stepsData[currentStep - 1].title)}
        />
      </div>
    </div>
  );
}

export default Stepper;
