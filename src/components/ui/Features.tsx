"use client";

import classNames from "classnames";
import { useInView } from "react-intersection-observer";
import { Container } from "./Container";
import CountUp from "react-countup";
import { Button } from "./Button";
import { LogoLightIllustration } from "./LogoLight";
import { ZapIllustration } from "./Zap";

type FeaturesProps = {
  children: React.ReactNode;
  color: string;
  colorDark: string;
};

export const Features = ({ children, color, colorDark }: FeaturesProps) => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: false });

  return (
    <section
      ref={ref}
      className={classNames(
        "relative flex flex-col items-center overflow-x-clip before:pointer-events-none before:absolute before:h-[21rem] before:w-full before:bg-purple-50 before:bg-no-repeat before:transition-[transform,opacity] before:duration-1000 before:ease-in before:[mask:radial-gradient(100%_50%_at_center_center,_black,_transparent)] before:[background-size:50%_100%,50%_100%] before:[background-position:1%_0%,99%_0%] after:pointer-events-none after:absolute after:inset-1",
        inView &&
          "is-visible before:opacity-100 before:[transform:rotate(180deg)_scale(3.5)]",
        !inView && "before:rotate-180 before:opacity-40"
      )}
      style={
        {
          "--feature-color": color,
          "--feature-color-dark": colorDark,
        } as React.CSSProperties
      }
    >
      <div className="md:mt-[3rem] mt-[4rem] mb-16 w-full ">
        {children}
      </div>
    </section>
  );
};

type MainFeatureProps = {
  image: string;
  text: string;
  title: React.ReactNode;
  imageSize?: "small" | "large";
};

const MainFeature = ({
  title,
}: MainFeatureProps) => {
  return (
    <>
      <div className="relative before:absolute before:inset-0">
        <Container>
          <h2 className="text-gradient mb-32 translate-y-[40%] pt-[12rem] text-center text-6xl [transition:transform_1000ms_cubic-bezier(0.3,_1.17,_0.55,_0.99)_0s] md:pt-0 md:text-8xl [.is-visible_&]:translate-y-0">
            {title}
          </h2>
          <div className="text-black">
            <div className="h-[48rem] overflow-hidden h-auto md:overflow-auto">
              <div className="flex snap-x snap-mandatory gap-6 flex-wrap px-8 pb-12 md:flex-wrap md:overflow-hidden">
                <div className="shadow-lg relative flex min-h-[30rem] w-full shrink-0 snap-center flex-col items-center justify-end overflow-hidden rounded-[4.8rem] border border-transparent-white bg-glass-gradient p-8 text-center md:max-w-[calc(66.66%-12px)] md:basis-[calc(66.66%-12px)] md:p-14">
                  <div className="pointer-events-none absolute top-[-8rem] w-[130%]">
                    <ZapIllustration />
                  </div>
                  <p className="mb-4 text-3xl">Our Community</p>
                  <p className="text-md text-primary-text">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
                <div className="shadow-lg relative flex min-h-[30rem] w-full shrink-0 snap-center flex-col items-center justify-end overflow-hidden rounded-[4.8rem] border border-transparent-white bg-glass-gradient p-8 text-center md:basis-[calc(33.33%-12px)] md:p-14">
                  <div className="mask-linear-faded absolute top-[-9.2rem]">
                  </div>
                  <div className="pointer-events-none absolute top-[-8rem] w-[130%]">
                    <LogoLightIllustration />
                  </div>
                  <p className="mb-4 text-3xl">Our Mission</p>
                  <p className="text-md text-primary-text">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

type FeatureCardsProps = {
  features: {
    front: string;
    back: string;
    text: string;
    total: number;
    color: string;
    colorText: string;
  }[];
};

const FeatureCards = ({ features }: FeatureCardsProps) => {
  return (
    <Container>
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3 ">
        {features.map(({ front, back, text, total, color, colorText }, index) => (
          <div
            key={index}
            style={{ backgroundColor: `${color}`, color: `${colorText}` }}
            className="relative overflow-hidden rounded-[2.4rem] py-4 px-8 md:px-9 md:py-5"
          >
            <h3 className="mb-2 lg:text-5xl text-end md:text-3xl text-5xl">{front}<CountUp duration={5} start={0} end={total} delay={index * 0.5}/>{back}</h3>
            <p className="max-w-[31rem] lg:text-lg md:text-sm text-lg text-[#807F88] text-start">{text}</p>
          </div>
        ))}
      </div>
    </Container>
  );
};

type FeatureGridProps = {
  features: {
    icon?: React.FC;
    title: string;
    text: string;
  }[];
};

const FeatureGrid = ({ features }: FeatureGridProps) => {
  return (
    <Container>
      <div className="mb-16 grid w-full grid-cols-2 place-items-center gap-y-9 text-sm text-primary-text md:mb-[14rem] md:grid-cols-3 md:text-md">
        {features.map(({ title, text, icon: Icon }) => (
          <div
            className="flex flex-col hover:scale-105 duration-500 cursor-pointer max-w-[25.6rem] [&_svg]:mb-[4px] [&_svg]:fill-white md:[&_svg]:mr-[6px] md:[&_svg]:mb-[2px] md:[&_svg]:inline"
            key={title}
          >
            <span className="block text-black md:inline">{title}</span> 
            <span>
              <div className="flex items-center">
                <svg className="w-4 h-4 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path fill="yellow" d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <p className="ms-2 text-sm font-bold text-gray-400">4.95</p>
                <span className="w-1 h-1 mx-2 bg-gray-400 rounded-full"></span>
                <a href="#" className="text-xs text-gray-400">1250 Projects</a>
            </div>
            </span>
          </div>
        ))}
      </div>
    </Container>
  );
};

Features.Cards = FeatureCards;
Features.Main = MainFeature;
Features.Grid = FeatureGrid;