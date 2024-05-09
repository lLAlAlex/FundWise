import React from "react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Features } from "../ui/Features";

const AboutHome = () => {
  return (
    <div id="about">
        <Features.Main
            title={ <> Explore FundWise </> }
            image="/cycles.webp"
            imageSize="large"
            text="Cycles focus your team on what work should happen next. A healthy routine to maintain velocity and make meaningful progress."
        />
        <hr className="my-[3.2rem] h-[1px] border-none bg-[linear-gradient(to_right,transparent,rgba(0,0,0,0.1)_50%,transparent)]" />
    </div>
  );
};

export default AboutHome;
