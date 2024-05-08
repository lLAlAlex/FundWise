import React from "react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Features } from "../ui/Features";

const AboutHome = () => {
  return (
    <div id="about">
        <hr className="mb-[3.2rem] h-[1px] border-none bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.1)_50%,transparent)]" />
        <Features color="40,87,255" colorDark="48,58,117">
            <Features.Main
                title={ <> Explore FundWise </> }
                image="/cycles.webp"
                imageSize="large"
                text="Cycles focus your team on what work should happen next. A healthy routine to maintain velocity and make meaningful progress."
            />
        </Features>
        <hr className="mb-[3.2rem] h-[1px] border-none bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.1)_50%,transparent)]" />
    </div>
  );
};

export default AboutHome;
