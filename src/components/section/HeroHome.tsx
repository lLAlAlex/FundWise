import { Features } from "../ui/Features";
import { Hero, HeroSubtitle, HeroTitle } from "../ui/Hero";
import { Button } from "../ui/Button";
import { ChevronIcon } from "../ui/chevron";

const HeroHome = () => {
  return (
    <div>
        <div className="w-full h-20"></div>

        <Features.Cards
              features={[
                { total: 258301, front: "", back: "", text: "Projects", },
                { total: 1993700, front: "$", back: "", text: "Fund", },
                { total: 24, front: "", back: "+", text: "Partner", },
              ]}
            />

        <hr className="my-[5rem] h-[1px] border-none bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.1)_50%,transparent)]" />

        <Hero>
          <HeroTitle className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">FundWise: To Provide <br/> Financial Solutions</HeroTitle>
          <HeroSubtitle className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">Invest in Dreams, Build Futures: Empowering <br/> Innovation with FundWise.</HeroSubtitle>
          <Button href="#" variant="primary" className="mb-12 text-sm pl-4 pr-3 h-8 md:text-md md:pl-6 md:pr-5 md:h-12 gap-2 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
            Get Started <ChevronIcon />
          </Button>
        </Hero>

    </div>
  );
};

export default HeroHome;
