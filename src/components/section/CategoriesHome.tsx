import React from "react";
import { StarsIllustration } from "../Stars";
import { Container } from "../ui/Container";
import classNames from "classnames";
import { Features } from "../ui/Features";

const CategoriesHome = () => {
  return (
    <div>
        <Features.Grid
            features={[
            {
                // icon: ParentSubIcon,
                title: "Development & IT",
                text: "Collaborate across teams and departments.",
            },
            {
                // icon: AutomatedBacklogIcon,
                title: "AI Service",
                text: "Write project briefs and specs directly in Linear.",
            },
            {
                // icon: WorkflowsIcon,
                title: "Design & Creative",
                text: "Organize projects across multiple roadmaps.",
            },
            {
                // icon: CustomViewsIcon,
                title: "Sales & Marketing",
                text: "Visualize the product journey ahead.",
            },
            {
                // icon: DiscussionIcon,
                title: "Finance & Accounting",
                text: "Track scope, velocity, and progress over time.",
            },
            {
                // icon: IssuesIcon,
                title: "Food & Beverages",
                text: "Stay in the loop on project activity and updates.",
            },
            ]}
        />
    </div>
  );
};

export default CategoriesHome;
