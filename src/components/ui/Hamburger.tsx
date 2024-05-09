interface HamburgerProps {
    isHamburgerOpen: boolean;
  }
  
  export const Hamburger = ({ isHamburgerOpen }: HamburgerProps) => {
    return (
      <div className="cursor-pointer group flex h-full items-center justify-center rounded-3xl">
        <div className="space-y-2">
          <span className={`block h-1 w-7 origin-center rounded-full bg-black transition-transform ease-in-out duration-500 ${isHamburgerOpen ? 'translate-y-[0.55rem] rotate-45' : ' '}`}></span>
          <span className={`block h-1 w-5 origin-center rounded-full bg-purple-500 transition-transform ease-in-out duration-500 ${isHamburgerOpen ? 'w-7 -translate-y-[0.55rem] -rotate-45' : ' '}`}></span>
        </div>
      </div>
    );
  };