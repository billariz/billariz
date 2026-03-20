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

import Carousel from "react-multi-carousel";

import "react-multi-carousel/lib/styles.css";

import TESTIMONIALS from "@/constants/testimonials";
import { ArrowLeft, ArrowRight } from "lucide-react";

//Hooks
import useLocales from "@/hooks/useLocales";

const ButtonGroup = ({ next, previous }) => {
  return (
    <div className="flex justify-center gap-3.5 lg:gap-3">
      <div className="flex cursor-pointer justify-center items-center w-10 lg:w-12 lg:h-12 h-10 rounded-full ring-1 ring-primary">
        <ArrowLeft color="#d5ecf8" size={24} onClick={() => previous()} />
      </div>
      <div className="flex cursor-pointer justify-center items-center w-10 lg:w-12 lg:h-12 h-10 rounded-full ring-1 ring-primary">
        <ArrowRight color="#d5ecf8" size={24} onClick={() => next()} />
      </div>
    </div>
  );
};

export default function Testimonials() {
  const { translate } = useLocales();

  return (
    <Carousel
      customButtonGroup={<ButtonGroup />}
      renderButtonGroupOutside={true}
      additionalTransfrom={0}
      arrows={false}
      centerMode={window.innerWidth > 1024}
      autoPlaySpeed={3000}
      draggable
      focusOnSelect={false}
      infinite={TESTIMONIALS.length > 1}
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      className="pad"

      responsive={{
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024,
          },
          items: 1,
          partialVisibilityGutter: 40,
          paritialVisibilityGutter: 40,
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0,
          },
          items: 1,
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464,
          },
          items: 1,
          partialVisibilityGutter: 60,
        },
      }}
      shouldResetAutoplay
      swipeable
    >
      {TESTIMONIALS.map((testimonial) => {
        return (
          <div
            key={testimonial.name}
            className="relative w-80 lg:w-2xl mx-auto border-[1px] lg:opacity-20 border-primary rounded-4xl px-6 lg:px-12 py-7 lg:py-10"
          >
            <img
              src="/images/icons/testimonials.svg"
              className="w-7 h-7 lg:w-11 lg:h-8 absolute top-4 lg:top-6 right-4 lg:right-8"
            />
            <div className="flex gap-3 lg:gap-4 items-center">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="h-12 w-12 lg:h-16 lg:w-16 rounded-full border-primary border-[1px]"
              />
              <div>
                <p className="text-lg lg:text-[32px] font-primary font-medium text-[#F8FAFC]">
                  {testimonial.name}
                </p>
                <p className="font-secondary text-sm lg:text-base text-[#F8FAFC] mt-1">
                  {translate(testimonial.title)}
                </p>
              </div>
            </div>
            <div className="h-[1px] w-full bg-[#8394A6] mt-4 lg:mt-8" />
            <p className="text-[#F8FAFC] font-secondary text-sm lg:text-xl mt-4 lg:mt-8">
              {translate(testimonial.content)}
            </p>
          </div>
        );
      })}
    </Carousel>
  );
}
