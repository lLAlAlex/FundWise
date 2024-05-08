import classNames from "classnames"

export const BackgroundContainer = ({ children, className }: { children: React.ReactNode, className?: string;}) => {
    return (
        <div className={classNames("w-full", className)}>{children}</div>
    )
}