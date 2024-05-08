
import { VariantProps, cva } from "class-variance-authority";
import classNames from "classnames";
import React from "react"
import { Link } from "react-router-dom";

interface ButtonProps extends VariantProps<typeof buttonClasses> {
    children: React.ReactNode;
    href: string;
    className?: string;
}

const buttonClasses =cva("rounded-full inline-flex items-center", {
    variants: {
        variant: {
            primary: "bg-primary-gradient hover:text-shadow hover:shadow-primary",
            secondary: [
                "text-off-white bg-white bg-opacity-10 border border-transparent-white backdrop-filter-[12px] hover:bg-opacity-20 transition-colors ease-in",
                "[&_.highlight]:bg-transparent-white [&_.highlight]:rounded-full [&_.highlight]:px-2 [&_.highlight:last-child]:ml-2 [&_.highlight:last-child]:-mr-2 [&_.highlight:first-child]:-ml-2 [&_.highlight:first-child]:mr-2",
            ],
        }, 
        size: {
            small: "text-sm px-3 h-7",
            medium: "text-sm px-4 h-8",
            large: "text-md px-8 h-12",
        },
    },
    defaultVariants: {
        variant: "primary",
        size: "large"
    }
})

export const Button = ({ children, href, variant, size, className }: ButtonProps) => {
    return <Link to={href} className={classNames(buttonClasses({ variant, size }), className)}>{children}</Link>;
};